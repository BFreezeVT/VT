"""
Tests for POST /api/reports/email - emails a client-generated PDF report (Assessment or
Cyber Risk Scorecard) as an attachment via SMTP. Covers: EmailStr validation (422 on bad
email), successful send with a real minimal PDF, rate-limiting (per-IP + a tamper-proof
site-wide cap via check_report_email_rate_limit - see security audit fix in server.py), and
recipient-binding (recipient_email must match a lead genuinely captured via POST /api/leads
in the last 3 hours - closes the open-mail-relay-to-arbitrary-recipient risk found in the
2026-08-05 security audit, see _recipient_has_recent_lead in server.py).
/api/leads and /api/reports/email now have INDEPENDENT per-IP buckets (each keyed by its own
"action" tag) precisely so that exhausting one does not block the other, while a header-spoof-
proof global cap on /api/reports/email closes the mail-relay-abuse risk that a per-IP-only
limiter (bypassable via a forged X-Forwarded-For) could not.
"""
import base64
import os
import time
from datetime import datetime, timedelta, timezone
from pathlib import Path

import pymongo
import pytest
import requests
from dotenv import load_dotenv

load_dotenv(str(Path(__file__).resolve().parent.parent / ".env"))

BASE_URL = os.environ.get('REACT_APP_BACKEND_URL').rstrip('/')
_mongo_client = pymongo.MongoClient(os.environ['MONGO_URL'])
_db = _mongo_client[os.environ['DB_NAME']]

# Minimal valid (tiny) PDF byte content, base64-encoded, so decode + MIMEApplication succeeds.
MINI_PDF_BYTES = b"%PDF-1.4\n1 0 obj<</Type/Catalog/Pages 2 0 R>>endobj\n2 0 obj<</Type/Pages/Kids[3 0 R]/Count 1>>endobj\n3 0 obj<</Type/Page/Parent 2 0 R>>endobj\ntrailer<</Root 1 0 R>>"
MINI_PDF_B64 = base64.b64encode(MINI_PDF_BYTES).decode()
NOT_A_PDF_B64 = base64.b64encode(b"hello world, not a pdf").decode()

# CI environments without SMTP secrets configured can't actually send email - skip the one
# test that requires a real send rather than failing the whole suite over missing credentials.
SMTP_CONFIGURED = bool(os.environ.get("SMTP_HOST") and os.environ.get("SMTP_USER") and os.environ.get("SMTP_PASS"))


@pytest.fixture
def api_client():
    session = requests.Session()
    session.headers.update({"Content-Type": "application/json"})
    return session


def _create_matching_lead(api_client, email):
    """Mirrors the real UI flow (Assessment/Scorecard results screen) where a lead is always
    submitted via POST /api/leads immediately before the "Email Report" button becomes
    reachable - required for /api/reports/email's recipient-binding check to allow the send."""
    r = api_client.post(f"{BASE_URL}/api/leads", json={
        "company": "TEST_QA Co",
        "name": "QA Tester",
        "phone": "555-000-0000",
        "email": email,
        "source_page": "ai-business-assessment",
    })
    assert r.status_code in (200, 429), f"Unexpected status creating prerequisite lead: {r.status_code}: {r.text}"


class TestEmailReportValidation:
    def test_invalid_email_format_rejected(self, api_client):
        payload = {
            "recipient_email": "not-an-email",
            "recipient_name": "QA Tester",
            "company_name": "TEST_QA Co",
            "report_title": "Executive ROI & Readiness Report",
            "pdf_base64": MINI_PDF_B64,
        }
        r = api_client.post(f"{BASE_URL}/api/reports/email", json=payload)
        assert r.status_code == 422, f"Expected 422 for invalid email, got {r.status_code}: {r.text}"

    def test_missing_pdf_base64_rejected(self, api_client):
        payload = {"recipient_email": "test_reports_qa@example.com"}
        r = api_client.post(f"{BASE_URL}/api/reports/email", json=payload)
        assert r.status_code == 422

    def test_non_pdf_attachment_rejected(self, api_client):
        """Security fix: attachment bytes must start with the %PDF magic header, closing off
        this endpoint as a generic arbitrary-file-to-arbitrary-recipient relay."""
        email = "test_nonpdf_qa@example.com"
        _create_matching_lead(api_client, email)
        payload = {"recipient_email": email, "pdf_base64": NOT_A_PDF_B64}
        r = api_client.post(f"{BASE_URL}/api/reports/email", json=payload)
        assert r.status_code == 400, f"Expected 400 for a non-PDF attachment, got {r.status_code}: {r.text}"


class TestEmailReportRecipientBinding:
    """Security fix (2026-08-05 audit, SEC-001): recipient_email must match a lead genuinely
    captured via POST /api/leads in the last 3 hours, so this endpoint can't be called directly
    to relay an attacker-chosen PDF from our trusted mailbox to an arbitrary third party."""

    @pytest.fixture(autouse=True)
    def _fresh_rate_limit_quota(self):
        """This class makes several reports/email calls in a row - give each test a clean
        per-IP quota slate so an earlier test's call doesn't push a later one into a 429
        instead of its expected 403/non-403 result."""
        _db.lead_submission_log.delete_many({})
        _db.rate_limit_global_log.delete_many({})
        yield

    def test_recipient_with_no_prior_lead_rejected_403(self, api_client):
        never_registered_email = f"test_no_lead_{int(time.time())}@example.com"
        payload = {"recipient_email": never_registered_email, "pdf_base64": MINI_PDF_B64}
        r = api_client.post(f"{BASE_URL}/api/reports/email", json=payload)
        assert r.status_code == 403, f"Expected 403 for a recipient with no matching lead, got {r.status_code}: {r.text}"

    def test_recipient_with_lead_2_hours_old_still_passes_binding_check(self, api_client):
        """Code-review fix (2026-08-05): a visitor who leaves the Assessment/Scorecard results
        screen open for a while before clicking "Email Report" must not get an incorrect 403.
        The window was widened from 30 min to 3 hours - a lead from 2 hours ago must still pass."""
        email = f"test_2h_old_lead_{int(time.time())}@example.com"
        backdated_time = (datetime.now(timezone.utc) - timedelta(hours=2)).isoformat()
        _db.leads.insert_one({
            "id": f"test-{int(time.time())}", "company": "TEST_QA Co", "name": "QA Tester",
            "phone": "555-000-0000", "email": email, "source_page": "ai-business-assessment",
            "created_at": backdated_time, "status": "new",
        })
        payload = {"recipient_email": email, "pdf_base64": MINI_PDF_B64}
        r = api_client.post(f"{BASE_URL}/api/reports/email", json=payload)
        assert r.status_code != 403, f"A 2-hour-old lead should still pass the 3-hour binding window, got {r.status_code}: {r.text}"

    def test_recipient_with_lead_4_hours_old_rejected_403(self, api_client):
        """A lead older than the 3-hour window must still be rejected - the window is generous,
        not unbounded."""
        email = f"test_4h_old_lead_{int(time.time())}@example.com"
        backdated_time = (datetime.now(timezone.utc) - timedelta(hours=4)).isoformat()
        _db.leads.insert_one({
            "id": f"test-{int(time.time())}", "company": "TEST_QA Co", "name": "QA Tester",
            "phone": "555-000-0000", "email": email, "source_page": "ai-business-assessment",
            "created_at": backdated_time, "status": "new",
        })
        payload = {"recipient_email": email, "pdf_base64": MINI_PDF_B64}
        r = api_client.post(f"{BASE_URL}/api/reports/email", json=payload)
        assert r.status_code == 403, f"A 4-hour-old lead is outside the 3-hour window and should be rejected, got {r.status_code}: {r.text}"

    def test_recipient_with_recent_lead_passes_binding_check(self, api_client):
        """After creating a matching lead, the recipient-binding check itself should pass -
        the request should get past the 403 (it may still 200/502/503 depending on SMTP
        config in this environment, but must NOT be blocked as an unverified recipient)."""
        email = f"test_recipient_bound_{int(time.time())}@example.com"
        _create_matching_lead(api_client, email)
        payload = {"recipient_email": email, "pdf_base64": MINI_PDF_B64}
        r = api_client.post(f"{BASE_URL}/api/reports/email", json=payload)
        assert r.status_code != 403, f"A recipient with a genuine recent lead should pass the binding check, got {r.status_code}: {r.text}"


class TestEmailReportSendAndRateLimit:
    @pytest.fixture(autouse=True)
    def _fresh_rate_limit_quota(self):
        """This class deliberately manages the reports_email 5/hour per-IP budget down to the
        wire (the last test intentionally exhausts it to prove 429 behavior) - give it a clean
        slate regardless of what earlier classes in this file already consumed."""
        _db.lead_submission_log.delete_many({})
        _db.rate_limit_global_log.delete_many({})
        yield

    @pytest.mark.skipif(not SMTP_CONFIGURED, reason="SMTP credentials not configured in this environment")
    def test_valid_email_report_send_success(self, api_client):
        email = "test_reports_qa@example.com"
        _create_matching_lead(api_client, email)
        payload = {
            "recipient_email": email,
            "recipient_name": "QA Tester",
            "company_name": "TEST_QA Co",
            "report_title": "Executive ROI & Readiness Report",
            "pdf_base64": MINI_PDF_B64,
        }
        r = api_client.post(f"{BASE_URL}/api/reports/email", json=payload)
        assert r.status_code == 200, f"Expected 200, got {r.status_code}: {r.text}"
        data = r.json()
        assert data.get("success") is True

    def test_leads_rate_limit_does_not_block_reports_email(self, api_client):
        """Security fix regression guard: /api/leads and /api/reports/email must have
        INDEPENDENT per-IP rate-limit buckets. Exhausting /api/leads's own budget must NOT
        also block /api/reports/email (that shared-bucket design was replaced - see
        check_lead_rate_limit vs check_report_email_rate_limit in server.py)."""
        last_status = None
        for i in range(6):
            r = api_client.post(f"{BASE_URL}/api/leads", json={
                "company": f"TEST_RateLimit_{i}",
                "phone": "555-000-0000",
                "email": "test_reports_qa@example.com",
            })
            last_status = r.status_code
            if r.status_code == 429:
                break
        assert last_status == 429, "Expected /api/leads to eventually 429 once its own per-IP budget is exhausted"

        email_resp = api_client.post(f"{BASE_URL}/api/reports/email", json={
            "recipient_email": "test_reports_qa@example.com",
            "pdf_base64": MINI_PDF_B64,
        })
        # The real assertion is "not rate-limited" (proves independent buckets) - whether the
        # actual send then succeeds (200) or is rejected as SMTP-not-configured (503) depends
        # on whether this environment has SMTP secrets, which is orthogonal to this test.
        assert email_resp.status_code != 429, (
            f"/api/reports/email has its own independent rate-limit bucket and should NOT be "
            f"blocked just because /api/leads' budget is exhausted, got {email_resp.status_code}: {email_resp.text}"
        )

    def test_reports_email_has_its_own_independent_rate_limit(self, api_client):
        """/api/reports/email must still enforce its own per-IP limit once ITS OWN budget
        (not /leads') is exhausted."""
        last_status = None
        for i in range(6):
            r = api_client.post(f"{BASE_URL}/api/reports/email", json={
                "recipient_email": "test_reports_qa@example.com",
                "pdf_base64": MINI_PDF_B64,
            })
            last_status = r.status_code
            if r.status_code == 429:
                break
        assert last_status == 429, f"Expected /api/reports/email to eventually 429 once its own per-IP budget is exhausted, last got {last_status}"


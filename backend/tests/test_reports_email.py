"""
Tests for POST /api/reports/email - emails a client-generated PDF report (Assessment or
Cyber Risk Scorecard) as an attachment via SMTP. Covers: EmailStr validation (422 on bad
email), successful send with a real minimal PDF, rate-limiting (per-IP + a tamper-proof
site-wide cap via check_report_email_rate_limit), and per-lead single-use token binding
(lead_id + report_token must match a genuine lead from POST /api/leads, and recipient_email
must match that lead's stored email - closes the open-mail-relay-to-arbitrary-recipient risk
found in the 2026-09-01 security audit; see _validate_and_consume_report_token in server.py).
/api/leads and /api/reports/email have INDEPENDENT per-IP rate-limit buckets (each keyed by its
own "action" tag) precisely so that exhausting one does not block the other, while a header-
spoof-proof global cap on /api/reports/email closes the mail-relay-abuse risk that a per-IP-only
limiter (bypassable via a forged X-Forwarded-For) could not.
"""
import base64
import os
import secrets
import time
from datetime import datetime, timedelta, timezone
from pathlib import Path

import pymongo
import pytest
import requests
from dotenv import load_dotenv

load_dotenv(str(Path(__file__).resolve().parent.parent / ".env"))
load_dotenv(str(Path(__file__).resolve().parent.parent.parent / "frontend" / ".env"))

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
    reachable. Returns (lead_id, report_token) needed by /api/reports/email's token-binding
    check."""
    r = api_client.post(f"{BASE_URL}/api/leads", json={
        "company": "TEST_QA Co",
        "name": "QA Tester",
        "phone": "555-000-0000",
        "email": email,
        "source_page": "ai-business-assessment",
    })
    assert r.status_code in (200, 429), f"Unexpected status creating prerequisite lead: {r.status_code}: {r.text}"
    if r.status_code == 429:
        return None, None
    data = r.json()
    return data["id"], data["report_token"]


class TestEmailReportValidation:
    def test_invalid_email_format_rejected(self, api_client):
        payload = {
            "lead_id": "irrelevant-for-this-check",
            "report_token": "irrelevant-for-this-check",
            "recipient_email": "not-an-email",
            "recipient_name": "QA Tester",
            "company_name": "TEST_QA Co",
            "report_title": "Executive ROI & Readiness Report",
            "pdf_base64": MINI_PDF_B64,
        }
        r = api_client.post(f"{BASE_URL}/api/reports/email", json=payload)
        assert r.status_code == 422, f"Expected 422 for invalid email, got {r.status_code}: {r.text}"

    def test_missing_pdf_base64_rejected(self, api_client):
        payload = {"lead_id": "x", "report_token": "y", "recipient_email": "test_reports_qa@example.com"}
        r = api_client.post(f"{BASE_URL}/api/reports/email", json=payload)
        assert r.status_code == 422

    def test_missing_lead_id_rejected_422(self, api_client):
        """Pydantic required-field check: lead_id/report_token are mandatory since the
        2026-09-01 security fix - a payload without them must never reach the token check."""
        payload = {"recipient_email": "test_reports_qa@example.com", "pdf_base64": MINI_PDF_B64}
        r = api_client.post(f"{BASE_URL}/api/reports/email", json=payload)
        assert r.status_code == 422

    def test_non_pdf_attachment_rejected(self, api_client):
        """Security fix: attachment bytes must start with the %PDF magic header, closing off
        this endpoint as a generic arbitrary-file-to-arbitrary-recipient relay."""
        email = "test_nonpdf_qa@example.com"
        lead_id, token = _create_matching_lead(api_client, email)
        if lead_id is None:
            pytest.skip("lead creation rate-limited in this run")
        payload = {"lead_id": lead_id, "report_token": token, "recipient_email": email, "pdf_base64": NOT_A_PDF_B64}
        r = api_client.post(f"{BASE_URL}/api/reports/email", json=payload)
        assert r.status_code == 400, f"Expected 400 for a non-PDF attachment, got {r.status_code}: {r.text}"


class TestEmailReportTokenBinding:
    """Security fix (2026-09-01 audit, SEC-001): lead_id + report_token must match a genuine
    lead from POST /api/leads (exact hmac.compare_digest match, within a 3-hour window,
    single-use), and recipient_email must match that lead's own stored email - so this endpoint
    can't be called directly to relay an attacker-chosen PDF from our trusted mailbox to an
    arbitrary third party just by knowing/guessing their email."""

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
        payload = {"lead_id": "nonexistent-lead-id", "report_token": "made-up-token", "recipient_email": never_registered_email, "pdf_base64": MINI_PDF_B64}
        r = api_client.post(f"{BASE_URL}/api/reports/email", json=payload)
        assert r.status_code == 403, f"Expected 403 for an unknown lead_id, got {r.status_code}: {r.text}"

    def test_wrong_token_for_real_lead_rejected_403(self, api_client):
        email = f"test_wrong_token_{int(time.time())}@example.com"
        lead_id, _real_token = _create_matching_lead(api_client, email)
        if lead_id is None:
            pytest.skip("lead creation rate-limited in this run")
        payload = {"lead_id": lead_id, "report_token": "definitely-not-the-real-token", "recipient_email": email, "pdf_base64": MINI_PDF_B64}
        r = api_client.post(f"{BASE_URL}/api/reports/email", json=payload)
        assert r.status_code == 403, f"Expected 403 for a real lead_id with a wrong token, got {r.status_code}: {r.text}"

    def test_valid_token_but_mismatched_recipient_rejected_403(self, api_client):
        """The actual attack this fix closes: creating a lead with the VICTIM's email, then
        trying to relay to a DIFFERENT third-party address must not be possible - recipient_email
        must equal the lead's own stored email."""
        victim_email = f"test_victim_{int(time.time())}@example.com"
        lead_id, token = _create_matching_lead(api_client, victim_email)
        if lead_id is None:
            pytest.skip("lead creation rate-limited in this run")
        other_email = f"test_someone_else_{int(time.time())}@example.com"
        payload = {"lead_id": lead_id, "report_token": token, "recipient_email": other_email, "pdf_base64": MINI_PDF_B64}
        r = api_client.post(f"{BASE_URL}/api/reports/email", json=payload)
        assert r.status_code == 403, f"Expected 403 when recipient_email doesn't match the lead's own email, got {r.status_code}: {r.text}"

    def test_lead_4_hours_old_rejected_403(self, api_client):
        """A lead older than the 3-hour window must still be rejected - the window is generous,
        not unbounded."""
        email = f"test_4h_old_lead_{int(time.time())}@example.com"
        backdated_time = (datetime.now(timezone.utc) - timedelta(hours=4)).isoformat()
        token = secrets.token_urlsafe(16)
        lead_id = f"test-4h-{int(time.time())}"
        _db.leads.insert_one({
            "id": lead_id, "company": "TEST_QA Co", "name": "QA Tester",
            "phone": "555-000-0000", "email": email, "source_page": "ai-business-assessment",
            "created_at": backdated_time, "status": "new",
            "report_token": token, "report_email_sent_at": None,
        })
        payload = {"lead_id": lead_id, "report_token": token, "recipient_email": email, "pdf_base64": MINI_PDF_B64}
        r = api_client.post(f"{BASE_URL}/api/reports/email", json=payload)
        assert r.status_code == 403, f"A 4-hour-old lead is outside the 3-hour window and should be rejected, got {r.status_code}: {r.text}"

    def test_valid_token_passes_binding_check(self, api_client):
        """After creating a matching lead and using its real id+token, the token-binding check
        itself should pass - the request should get past the 403 (it may still 200/502/503
        depending on SMTP config in this environment, but must NOT be blocked as unverified)."""
        email = f"test_recipient_bound_{int(time.time())}@example.com"
        lead_id, token = _create_matching_lead(api_client, email)
        if lead_id is None:
            pytest.skip("lead creation rate-limited in this run")
        payload = {"lead_id": lead_id, "report_token": token, "recipient_email": email, "pdf_base64": MINI_PDF_B64}
        r = api_client.post(f"{BASE_URL}/api/reports/email", json=payload)
        assert r.status_code != 403, f"A recipient with a genuine recent lead + correct token should pass the binding check, got {r.status_code}: {r.text}"

    def test_replay_of_consumed_token_rejected_403(self, api_client):
        """Single-use enforcement: once a token has been successfully used to send a report,
        reusing it again (even with all fields correct) must be rejected."""
        email = f"test_replay_{int(time.time())}@example.com"
        lead_id, token = _create_matching_lead(api_client, email)
        if lead_id is None:
            pytest.skip("lead creation rate-limited in this run")
        payload = {"lead_id": lead_id, "report_token": token, "recipient_email": email, "pdf_base64": MINI_PDF_B64}
        first = api_client.post(f"{BASE_URL}/api/reports/email", json=payload)
        assert first.status_code != 403, f"First use of a fresh token should pass binding, got {first.status_code}: {first.text}"
        second = api_client.post(f"{BASE_URL}/api/reports/email", json=payload)
        assert second.status_code == 403, f"Replaying an already-consumed token must be rejected, got {second.status_code}: {second.text}"


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
        lead_id, token = _create_matching_lead(api_client, email)
        if lead_id is None:
            pytest.skip("lead creation rate-limited in this run")
        payload = {
            "lead_id": lead_id,
            "report_token": token,
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
        lead_id, token = None, None
        for i in range(6):
            r = api_client.post(f"{BASE_URL}/api/leads", json={
                "company": f"TEST_RateLimit_{i}",
                "phone": "555-000-0000",
                "email": "test_reports_qa@example.com",
            })
            last_status = r.status_code
            if r.status_code == 200 and lead_id is None:
                lead_id, token = r.json()["id"], r.json()["report_token"]
            if r.status_code == 429:
                break
        assert last_status == 429, "Expected /api/leads to eventually 429 once its own per-IP budget is exhausted"
        assert lead_id is not None, "At least one lead creation should have succeeded before the 429"

        email_resp = api_client.post(f"{BASE_URL}/api/reports/email", json={
            "lead_id": lead_id,
            "report_token": token,
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
        (not /leads') is exhausted. Each call needs a fresh, never-before-used token (since
        tokens are single-use) - leads are inserted directly into Mongo here (bypassing
        POST /api/leads' own separate 5/hour bucket) purely so this test can supply 6 valid
        tokens without that unrelated bucket becoming the bottleneck instead of the one under
        test."""
        last_status = None
        for i in range(6):
            email = f"test_ratelimit_email_{i}_{int(time.time())}@example.com"
            lead_id = f"test-ratelimit-{i}-{int(time.time())}"
            token = f"test-fixed-token-ratelimit-{i}-{int(time.time())}"
            _db.leads.insert_one({
                "id": lead_id, "company": "TEST_QA Co", "name": "QA Tester",
                "phone": "555-000-0000", "email": email, "source_page": "ai-business-assessment",
                "created_at": datetime.now(timezone.utc).isoformat(), "status": "new",
                "report_token": token, "report_email_sent_at": None,
            })
            r = api_client.post(f"{BASE_URL}/api/reports/email", json={
                "lead_id": lead_id,
                "report_token": token,
                "recipient_email": email,
                "pdf_base64": MINI_PDF_B64,
            })
            last_status = r.status_code
            if r.status_code == 429:
                break
        assert last_status == 429, f"Expected /api/reports/email to eventually 429 once its own per-IP budget is exhausted, last got {last_status}"

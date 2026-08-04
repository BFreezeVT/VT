"""
Tests for POST /api/reports/email - emails a client-generated PDF report (Assessment or
Cyber Risk Scorecard) as an attachment via SMTP. Covers: EmailStr validation (422 on bad
email), successful send with a real minimal PDF, and rate-limiting (per-IP + a tamper-proof
site-wide cap via check_report_email_rate_limit - see security audit fix in server.py).
/api/leads and /api/reports/email now have INDEPENDENT per-IP buckets (each keyed by its own
"action" tag) precisely so that exhausting one does not block the other, while a header-spoof-
proof global cap on /api/reports/email closes the mail-relay-abuse risk that a per-IP-only
limiter (bypassable via a forged X-Forwarded-For) could not.
"""
import base64
import os

import pytest
import requests

BASE_URL = os.environ.get('REACT_APP_BACKEND_URL').rstrip('/')

# Minimal valid (tiny) PDF byte content, base64-encoded, so decode + MIMEApplication succeeds.
MINI_PDF_BYTES = b"%PDF-1.4\n1 0 obj<</Type/Catalog/Pages 2 0 R>>endobj\n2 0 obj<</Type/Pages/Kids[3 0 R]/Count 1>>endobj\n3 0 obj<</Type/Page/Parent 2 0 R>>endobj\ntrailer<</Root 1 0 R>>"
MINI_PDF_B64 = base64.b64encode(MINI_PDF_BYTES).decode()
NOT_A_PDF_B64 = base64.b64encode(b"hello world, not a pdf").decode()


@pytest.fixture
def api_client():
    session = requests.Session()
    session.headers.update({"Content-Type": "application/json"})
    return session


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
        payload = {"recipient_email": "test_reports_qa@example.com", "pdf_base64": NOT_A_PDF_B64}
        r = api_client.post(f"{BASE_URL}/api/reports/email", json=payload)
        assert r.status_code == 400, f"Expected 400 for a non-PDF attachment, got {r.status_code}: {r.text}"


class TestEmailReportSendAndRateLimit:
    def test_valid_email_report_send_success(self, api_client):
        payload = {
            "recipient_email": "test_reports_qa@example.com",
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
        assert email_resp.status_code == 200, (
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


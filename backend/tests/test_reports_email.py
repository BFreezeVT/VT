"""
Tests for POST /api/reports/email - emails a client-generated PDF report (Assessment or
Cyber Risk Scorecard) as an attachment via SMTP. Covers: EmailStr validation (422 on bad
email), successful send with a real minimal PDF, and shared rate-limiting with /api/leads
(same check_lead_rate_limit dependency, max 5/IP/hour).
"""
import base64
import os

import pytest
import requests

BASE_URL = os.environ.get('REACT_APP_BACKEND_URL').rstrip('/')

# Minimal valid (tiny) PDF byte content, base64-encoded, so decode + MIMEApplication succeeds.
MINI_PDF_BYTES = b"%PDF-1.4\n1 0 obj<</Type/Catalog/Pages 2 0 R>>endobj\n2 0 obj<</Type/Pages/Kids[3 0 R]/Count 1>>endobj\n3 0 obj<</Type/Page/Parent 2 0 R>>endobj\ntrailer<</Root 1 0 R>>"
MINI_PDF_B64 = base64.b64encode(MINI_PDF_BYTES).decode()


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


class TestEmailReportSendAndRateLimit:
    """NOTE: shares check_lead_rate_limit with /api/leads (5 req/IP/hour). This class
    intentionally exhausts that shared budget to prove the two endpoints share the same
    limiter, then relies on the test-runner's post-suite cleanup of lead_submission_log."""

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

    def test_shared_rate_limit_exhausts_and_blocks_both_endpoints(self, api_client):
        # This test's own IP bucket already has 1 hit from test_valid_email_report_send_success
        # above (same class/session, same IP). Send more requests (mix of /leads and
        # /reports/email) until the shared limiter kicks in at the 6th total hit.
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

        # Whether it tripped on this loop or was already tripped, the endpoint under test
        # (reports/email) should now also be blocked since they share the same IP counter.
        email_resp = api_client.post(f"{BASE_URL}/api/reports/email", json={
            "recipient_email": "test_reports_qa@example.com",
            "pdf_base64": MINI_PDF_B64,
        })
        assert email_resp.status_code == 429, (
            f"Expected /api/reports/email to be rate-limited (429) after exhausting shared "
            f"budget via /api/leads, got {email_resp.status_code}: {email_resp.text}"
        )
        data = email_resp.json()
        assert "detail" in data

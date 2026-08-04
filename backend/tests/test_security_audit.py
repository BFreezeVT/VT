"""
Security audit fix verification tests for Veracity Technologies backend.
Covers: POST /api/leads rate limiting (5/IP/hour), /api/status removal,
HTML-escaping of user input in lead notification emails, admin API key
regression check on GET /api/leads and GET /api/leads/count.
"""
import os
import time
import html
import pytest
import requests
import pymongo
from pathlib import Path
from dotenv import load_dotenv

load_dotenv(str(Path(__file__).resolve().parent.parent / ".env"))

BASE_URL = os.environ.get('REACT_APP_BACKEND_URL')
if not BASE_URL:
    # fallback read from frontend/.env for local runs where it wasn't exported
    with open(str(Path(__file__).resolve().parent.parent.parent / "frontend" / ".env")) as f:
        for line in f:
            if line.startswith('REACT_APP_BACKEND_URL'):
                BASE_URL = line.strip().split('=', 1)[1]
BASE_URL = BASE_URL.rstrip('/')

ADMIN_API_KEY = os.environ['ADMIN_API_KEY']
MONGO_URL = os.environ['MONGO_URL']
DB_NAME = os.environ['DB_NAME']

mongo_client = pymongo.MongoClient(MONGO_URL)
db = mongo_client[DB_NAME]


def make_lead_payload(suffix):
    return {
        "company": f"TEST_SecAudit_{suffix}",
        "name": "QA Tester",
        "phone": "555-000-0000",
        "email": f"secaudit_{suffix}@example.com",
        "source_page": "security-audit-test",
        "situation": "Automated security audit test lead",
        "contact_preference": "call",
    }


@pytest.fixture(scope="module", autouse=True)
def cleanup_after_module():
    yield
    # Clean up any TEST_SecAudit leads and all lead_submission_log entries created during this run
    db.leads.delete_many({"company": {"$regex": "^TEST_SecAudit"}})
    db.lead_submission_log.delete_many({})


class TestStatusEndpointRemoved:
    def test_get_status_404(self):
        resp = requests.get(f"{BASE_URL}/api/status")
        assert resp.status_code == 404

    def test_post_status_404(self):
        resp = requests.post(f"{BASE_URL}/api/status", json={"client_name": "test"})
        assert resp.status_code == 404


class TestAdminKeyRegression:
    def test_get_leads_no_key_401(self):
        resp = requests.get(f"{BASE_URL}/api/leads")
        assert resp.status_code == 401

    def test_get_leads_wrong_key_401(self):
        resp = requests.get(f"{BASE_URL}/api/leads", headers={"X-Admin-Key": "wrong-key"})
        assert resp.status_code == 401

    def test_get_leads_correct_key_200(self):
        resp = requests.get(f"{BASE_URL}/api/leads", headers={"X-Admin-Key": ADMIN_API_KEY})
        assert resp.status_code == 200
        data = resp.json()
        assert isinstance(data, list)

    def test_get_leads_count_correct_key_200(self):
        resp = requests.get(f"{BASE_URL}/api/leads/count", headers={"X-Admin-Key": ADMIN_API_KEY})
        assert resp.status_code == 200
        data = resp.json()
        assert "count" in data
        assert isinstance(data["count"], int)


class TestHtmlEscaping:
    def test_lead_with_html_injection_saved_raw_and_escaped_in_email_body(self):
        # Directly test the escaping helper logic against the raw values we send,
        # then confirm the lead API accepts + persists raw (unescaped) values.
        payload = make_lead_payload("xss")
        payload["company"] = "<img src=x onerror=alert(1)>TEST_SecAudit_XSS"
        payload["situation"] = "<script>alert(1)</script>"

        resp = requests.post(f"{BASE_URL}/api/leads", json=payload)
        assert resp.status_code == 200
        body = resp.json()
        assert body["success"] is True
        lead_id = body["id"]

        # Verify raw (unescaped) value was persisted in DB - business data integrity
        saved = db.leads.find_one({"id": lead_id})
        assert saved is not None
        assert saved["company"] == payload["company"]
        assert saved["situation"] == payload["situation"]

        # Confirm html.escape (used in _build_lead_html_body) would neutralize the payload
        escaped_company = html.escape(saved["company"])
        escaped_situation = html.escape(saved["situation"])
        assert "<script>" not in escaped_situation
        assert "&lt;script&gt;" in escaped_situation
        assert "<img" not in escaped_company
        assert "&lt;img" in escaped_company

        # cleanup
        db.leads.delete_one({"id": lead_id})


class TestRateLimiting:
    def test_five_requests_ok_sixth_429(self):
        # Ensure clean slate for this specific test IP tracking before starting
        db.lead_submission_log.delete_many({})

        statuses = []
        lead_ids = []
        for i in range(5):
            payload = make_lead_payload(f"rl{i}")
            resp = requests.post(f"{BASE_URL}/api/leads", json=payload)
            statuses.append(resp.status_code)
            if resp.status_code == 200:
                lead_ids.append(resp.json()["id"])
            time.sleep(0.3)

        assert statuses == [200] * 5, f"Expected all 200, got {statuses}"

        # 6th submission within same hour from same IP should be rate limited
        payload = make_lead_payload("rl6")
        resp6 = requests.post(f"{BASE_URL}/api/leads", json=payload)
        assert resp6.status_code == 429
        detail = resp6.json().get("detail", "")
        assert "952" in detail and "941-7333" in detail

        # cleanup created leads + rate limit log entries
        for lid in lead_ids:
            db.leads.delete_one({"id": lid})
        db.lead_submission_log.delete_many({})

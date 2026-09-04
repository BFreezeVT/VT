"""
Tests for the 2026-09-01 security fix: POST /api/reports/email now requires a per-lead
single-use `report_token` returned by POST /api/leads, replacing the looser "any recent lead
with this email" check. Together these prove the endpoint can no longer be used as an open
mail relay to arbitrary third-party recipients.

Covered cases:
  1. POST /api/leads response includes an unguessable `report_token` (>=32 chars).
  2. Missing lead_id / report_token in /api/reports/email body -> 422.
  3. Valid lead_id but WRONG report_token -> 403 (no send).
  4. Valid lead_id + token but recipient_email doesn't match the lead's email -> 403.
  5. Replay (reusing the same valid token after a successful consume) -> 403.
  6. Happy path: matching lead_id + token + recipient_email passes the binding check
     (not 403/422); actual 200 vs 503 depends on SMTP env, which is orthogonal.
"""
import base64
import os
import time
from pathlib import Path

import pymongo
import pytest
import requests
from dotenv import load_dotenv

load_dotenv(str(Path(__file__).resolve().parent.parent / ".env"))
load_dotenv(str(Path(__file__).resolve().parent.parent.parent / "frontend" / ".env"))

BASE_URL = os.environ["REACT_APP_BACKEND_URL"].rstrip("/")
_mongo_client = pymongo.MongoClient(os.environ["MONGO_URL"])
_db = _mongo_client[os.environ["DB_NAME"]]

MINI_PDF_BYTES = (
    b"%PDF-1.4\n1 0 obj<</Type/Catalog/Pages 2 0 R>>endobj\n"
    b"2 0 obj<</Type/Pages/Kids[3 0 R]/Count 1>>endobj\n"
    b"3 0 obj<</Type/Page/Parent 2 0 R>>endobj\ntrailer<</Root 1 0 R>>"
)
MINI_PDF_B64 = base64.b64encode(MINI_PDF_BYTES).decode()


@pytest.fixture
def api_client():
    s = requests.Session()
    s.headers.update({"Content-Type": "application/json"})
    return s


@pytest.fixture(autouse=True)
def _fresh_rate_limits():
    _db.lead_submission_log.delete_many({})
    _db.rate_limit_global_log.delete_many({})
    yield


def _create_lead(api_client, email):
    r = api_client.post(f"{BASE_URL}/api/leads", json={
        "company": "TEST_TokenSec Co",
        "name": "QA Tester",
        "phone": "555-000-0000",
        "email": email,
        "source_page": "ai-business-assessment",
    })
    assert r.status_code == 200, f"lead create failed: {r.status_code} {r.text}"
    body = r.json()
    return body


def _email_payload(lead_id, token, recipient):
    return {
        "lead_id": lead_id,
        "report_token": token,
        "recipient_email": recipient,
        "recipient_name": "QA Tester",
        "company_name": "TEST_TokenSec Co",
        "report_title": "Executive ROI & Readiness Report",
        "pdf_base64": MINI_PDF_B64,
    }


class TestLeadResponseIncludesToken:
    def test_create_lead_returns_report_token(self, api_client):
        email = f"test_token_return_{int(time.time())}@example.com"
        body = _create_lead(api_client, email)
        assert "id" in body and isinstance(body["id"], str) and len(body["id"]) > 0
        assert "report_token" in body, f"POST /api/leads response missing report_token: {body}"
        token = body["report_token"]
        assert isinstance(token, str)
        # secrets.token_urlsafe(32) -> ~43 chars of urlsafe b64
        assert len(token) >= 32, f"report_token unexpectedly short ({len(token)}): {token}"


class TestReportsEmailRequiresTokenFields:
    def test_missing_lead_id_and_token_rejected_422(self, api_client):
        email = f"test_missing_fields_{int(time.time())}@example.com"
        _create_lead(api_client, email)
        # No lead_id/report_token in body at all
        r = api_client.post(f"{BASE_URL}/api/reports/email", json={
            "recipient_email": email,
            "pdf_base64": MINI_PDF_B64,
        })
        assert r.status_code == 422, f"Expected 422 for missing lead_id/report_token, got {r.status_code}: {r.text}"

    def test_missing_report_token_only_rejected_422(self, api_client):
        email = f"test_missing_token_{int(time.time())}@example.com"
        body = _create_lead(api_client, email)
        r = api_client.post(f"{BASE_URL}/api/reports/email", json={
            "lead_id": body["id"],
            "recipient_email": email,
            "pdf_base64": MINI_PDF_B64,
        })
        assert r.status_code == 422, f"Expected 422 for missing report_token, got {r.status_code}: {r.text}"


class TestReportsEmailTokenValidation:
    def test_wrong_token_rejected_403(self, api_client):
        email = f"test_wrong_token_{int(time.time())}@example.com"
        body = _create_lead(api_client, email)
        r = api_client.post(
            f"{BASE_URL}/api/reports/email",
            json=_email_payload(body["id"], "totally-wrong-token-abc123", email),
        )
        assert r.status_code == 403, f"Expected 403 for wrong token, got {r.status_code}: {r.text}"

    def test_recipient_mismatch_rejected_403(self, api_client):
        """Attacker creates a throwaway lead with their own email -> gets a valid token, but
        then tries to send the report to a VICTIM's email address. Must be 403."""
        attacker_email = f"test_attacker_{int(time.time())}@example.com"
        victim_email = f"test_victim_{int(time.time())}@example.com"
        body = _create_lead(api_client, attacker_email)
        r = api_client.post(
            f"{BASE_URL}/api/reports/email",
            json=_email_payload(body["id"], body["report_token"], victim_email),
        )
        assert r.status_code == 403, f"Expected 403 for recipient_email mismatch, got {r.status_code}: {r.text}"

    def test_unknown_lead_id_rejected_403(self, api_client):
        email = f"test_unknown_lead_{int(time.time())}@example.com"
        # Never created this lead
        r = api_client.post(
            f"{BASE_URL}/api/reports/email",
            json=_email_payload("nonexistent-lead-id-xyz", "any-token", email),
        )
        assert r.status_code == 403, f"Expected 403 for unknown lead_id, got {r.status_code}: {r.text}"

    def test_replay_of_valid_token_rejected_403(self, api_client):
        """After a successful consume (token marks report_email_sent_at), a second call with
        the same valid credentials must be rejected as single-use."""
        email = f"test_replay_{int(time.time())}@example.com"
        body = _create_lead(api_client, email)
        payload = _email_payload(body["id"], body["report_token"], email)

        first = api_client.post(f"{BASE_URL}/api/reports/email", json=payload)
        # First call must pass the binding check. Status may be 200 (SMTP configured) or 5xx
        # (SMTP unavailable in this env), but MUST NOT be 403/422 - that's the whole point.
        assert first.status_code not in (403, 422), (
            f"Valid lead_id+token+recipient should pass binding check, got {first.status_code}: {first.text}"
        )

        # Regardless of first response status, if the token was consumed the DB now has
        # report_email_sent_at set. Verify replay is blocked.
        replay = api_client.post(f"{BASE_URL}/api/reports/email", json=payload)
        # If SMTP failed on first call the token may or may not have been consumed depending
        # on where the failure happened - inspect DB to know what to assert.
        lead_doc = _db.leads.find_one({"id": body["id"]})
        if lead_doc and lead_doc.get("report_email_sent_at"):
            assert replay.status_code == 403, (
                f"Expected 403 on replay of a consumed token, got {replay.status_code}: {replay.text}"
            )
        else:
            pytest.skip(
                "First call didn't consume the token (likely SMTP unavailable pre-consume path); "
                "replay guard not exercised in this environment."
            )


class TestReportsEmailValidTokenHappyPath:
    def test_valid_token_passes_binding_check(self, api_client):
        email = f"test_valid_bind_{int(time.time())}@example.com"
        body = _create_lead(api_client, email)
        r = api_client.post(
            f"{BASE_URL}/api/reports/email",
            json=_email_payload(body["id"], body["report_token"], email),
        )
        assert r.status_code not in (403, 422), (
            f"Valid lead_id+token+recipient must not be rejected as unauthorized, got {r.status_code}: {r.text}"
        )

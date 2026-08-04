"""
Tests for lead capture (public) and admin-secured lead viewing endpoints.
Covers: POST /api/leads (public, no auth), GET /api/leads and GET /api/leads/count
(secured via X-Admin-Key header).
"""
import os
import time
import uuid
from pathlib import Path

import pytest
import requests
from dotenv import load_dotenv

load_dotenv(str(Path(__file__).resolve().parent.parent / ".env"))

BASE_URL = os.environ.get('REACT_APP_BACKEND_URL').rstrip('/')
ADMIN_KEY = os.environ['ADMIN_API_KEY']


@pytest.fixture
def api_client():
    session = requests.Session()
    session.headers.update({"Content-Type": "application/json"})
    return session


class TestLeadsAdminAuth:
    def test_get_leads_no_header_401(self, api_client):
        r = api_client.get(f"{BASE_URL}/api/leads")
        assert r.status_code == 401

    def test_get_leads_wrong_key_401(self, api_client):
        r = api_client.get(f"{BASE_URL}/api/leads", headers={"X-Admin-Key": "wrong-key-123"})
        assert r.status_code == 401

    def test_get_leads_correct_key_200(self, api_client):
        r = api_client.get(f"{BASE_URL}/api/leads", headers={"X-Admin-Key": ADMIN_KEY})
        assert r.status_code == 200
        data = r.json()
        assert isinstance(data, list)

    def test_get_leads_count_no_header_401(self, api_client):
        r = api_client.get(f"{BASE_URL}/api/leads/count")
        assert r.status_code == 401

    def test_get_leads_count_wrong_key_401(self, api_client):
        r = api_client.get(f"{BASE_URL}/api/leads/count", headers={"X-Admin-Key": "nope"})
        assert r.status_code == 401

    def test_get_leads_count_correct_key_200(self, api_client):
        r = api_client.get(f"{BASE_URL}/api/leads/count", headers={"X-Admin-Key": ADMIN_KEY})
        assert r.status_code == 200
        data = r.json()
        assert "count" in data
        assert isinstance(data["count"], int)


class TestLeadCapturePublic:
    def test_post_leads_no_auth_required_200(self, api_client):
        payload = {
            "company": "TEST_Acme Corp",
            "name": "Test User",
            "phone": "555-123-4567",
            "email": "test_lead_qa@example.com",
            "source_page": "homepage",
            "situation": "Testing lead capture"
        }
        r = api_client.post(f"{BASE_URL}/api/leads", json=payload)
        assert r.status_code == 200
        data = r.json()
        assert data["success"] is True
        assert "id" in data
        return data["id"]

    def test_post_leads_response_time_fast(self, api_client):
        payload = {
            "company": "TEST_Speed Corp",
            "phone": "555-999-8888",
            "email": "test_speed_qa@example.com",
        }
        start = time.time()
        r = api_client.post(f"{BASE_URL}/api/leads", json=payload)
        elapsed = time.time() - start
        assert r.status_code == 200
        assert elapsed < 1.0, f"Response took {elapsed}s, expected under 1s (email should be background task)"

    def test_lead_persisted_and_retrievable_with_admin_key(self, api_client):
        unique_company = f"TEST_Persist_{uuid.uuid4().hex[:8]}"
        payload = {
            "company": unique_company,
            "phone": "555-000-1111",
            "email": "test_persist_qa@example.com",
        }
        create_resp = api_client.post(f"{BASE_URL}/api/leads", json=payload)
        assert create_resp.status_code == 200

        # verify persisted via admin-secured GET
        get_resp = api_client.get(f"{BASE_URL}/api/leads", headers={"X-Admin-Key": ADMIN_KEY})
        assert get_resp.status_code == 200
        leads = get_resp.json()
        matching = [l for l in leads if l.get("company") == unique_company]
        assert len(matching) == 1
        assert matching[0]["email"] == payload["email"]
        assert "_id" not in matching[0]

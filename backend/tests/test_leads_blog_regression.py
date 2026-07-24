"""
Regression test suite for the code-quality/security hardening pass:
- /api/leads (POST/GET) - verifies added Python return type hints (-> dict, -> bool, -> List[dict])
  did not change behavior of create_lead / send_lead_notification
- /api/blog and /api/blog/{slug} - verifies blog endpoints still return correct data
  (used to render BlogPost.jsx with new DOMPurify-sanitized formatInline())
"""
import os
import requests
import pytest

BASE_URL = os.environ.get('REACT_APP_BACKEND_URL').rstrip('/')


@pytest.fixture
def api_client():
    session = requests.Session()
    session.headers.update({"Content-Type": "application/json"})
    return session


class TestHealth:
    def test_health_check(self, api_client):
        resp = api_client.get(f"{BASE_URL}/api/health")
        assert resp.status_code == 200
        data = resp.json()
        assert data["status"] == "healthy"


class TestLeads:
    """Lead capture - regression for return type hints added to create_lead/send_lead_notification"""

    def test_create_lead_audit_offer_success(self, api_client):
        payload = {
            "company": "TEST_Regression Co",
            "name": "TEST QA Runner",
            "phone": "9525551234",
            "email": "test_regression@example.com",
            "source_page": "homepage",
            "situation": "Regression test for type-hint refactor",
            "contact_preference": "call",
        }
        resp = api_client.post(f"{BASE_URL}/api/leads", json=payload)
        assert resp.status_code == 200
        data = resp.json()
        assert data["success"] is True
        assert "id" in data and isinstance(data["id"], str)
        assert "message" in data

    def test_create_lead_persists_and_appears_in_list(self, api_client):
        payload = {
            "company": "TEST_Persistence Check",
            "name": "TEST Persist",
            "phone": "9525559999",
            "email": "test_persist@example.com",
            "source_page": "human-risk-simulation",
            "situation": "Human Risk Score: 80/100 (Awareness level).",
            "contact_preference": "email",
        }
        create_resp = api_client.post(f"{BASE_URL}/api/leads", json=payload)
        assert create_resp.status_code == 200
        lead_id = create_resp.json()["id"]

        get_resp = api_client.get(f"{BASE_URL}/api/leads")
        assert get_resp.status_code == 200
        leads = get_resp.json()
        assert isinstance(leads, list)
        matching = [l for l in leads if l.get("id") == lead_id]
        assert len(matching) == 1
        assert matching[0]["company"] == "TEST_Persistence Check"
        assert matching[0]["email"] == "test_persist@example.com"
        assert "_id" not in matching[0]

    def test_leads_count_endpoint(self, api_client):
        resp = api_client.get(f"{BASE_URL}/api/leads/count")
        assert resp.status_code == 200
        data = resp.json()
        assert "count" in data
        assert isinstance(data["count"], int)
        assert data["count"] > 0

    def test_create_lead_missing_required_field_returns_422(self, api_client):
        # email is required by AuditLeadCreate
        payload = {"company": "TEST_Missing Email", "phone": "9525551111"}
        resp = api_client.post(f"{BASE_URL}/api/leads", json=payload)
        assert resp.status_code == 422

    def test_create_lead_scorecard_source(self, api_client):
        payload = {
            "company": "",
            "name": "Discovery Call Request",
            "phone": "",
            "email": "",
            "source_page": "cyber-risk-scorecard-booking",
            "situation": "Booked discovery call: Monday at 9:00 AM. Risk score: HIGH (90/120).",
            "contact_preference": "call",
        }
        resp = api_client.post(f"{BASE_URL}/api/leads", json=payload)
        assert resp.status_code == 200
        assert resp.json()["success"] is True


class TestBlog:
    """Blog endpoints - regression for BlogPost.jsx DOMPurify sanitization pipeline"""

    def test_get_all_blog_posts(self, api_client):
        resp = api_client.get(f"{BASE_URL}/api/blog")
        assert resp.status_code == 200
        posts = resp.json()
        assert isinstance(posts, list)
        assert len(posts) > 0
        # content field should be excluded from list view
        for post in posts:
            assert "content" not in post
            assert "slug" in post
            assert "title" in post

    def test_get_specific_blog_post_content_has_markdown(self, api_client):
        slug = "ai-cybersecurity-threats-2025"
        resp = api_client.get(f"{BASE_URL}/api/blog/{slug}")
        assert resp.status_code == 200
        post = resp.json()
        assert post["slug"] == slug
        assert "content" in post
        # Verify markdown-like content present for frontend formatInline() to process
        assert "**" in post["content"]  # bold markers
        assert "## " in post["content"]  # heading markers
        assert isinstance(post["content"], str)
        assert len(post["content"]) > 100

    def test_get_nonexistent_blog_post_returns_404(self, api_client):
        resp = api_client.get(f"{BASE_URL}/api/blog/this-slug-does-not-exist")
        assert resp.status_code == 404
        data = resp.json()
        assert "detail" in data

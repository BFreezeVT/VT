"""
Backend tests for blog content migration (131 posts with full content field).
Covers: GET /api/blog, GET /api/blog/{slug}, smoke tests for /api/leads,
and no-regression checks after content-only change to backend/blog_data.py.
"""
import os
import pytest
import requests

BASE_URL = os.environ.get('REACT_APP_BACKEND_URL')
if not BASE_URL:
    # fall back to reading frontend/.env directly if not exported in this shell
    with open('/app/frontend/.env') as f:
        for line in f:
            if line.startswith('REACT_APP_BACKEND_URL'):
                BASE_URL = line.strip().split('=', 1)[1]
BASE_URL = BASE_URL.rstrip('/')

SAMPLE_MIGRATED_SLUGS = [
    "outdated-technology-is-costing-your-organization-money",
    "is-your-business-training-ai-how-to-hack-you",
    "shadow-it-how-employees-using-unauthorized-apps-could-be-putting-your-business-at-risk",
    "2025-cybersecurity-predictions-what-to-expect-and-how-to-prepare",
]

REGRESSION_SLUG = "is-your-business-ready-for-ai-a-10-point-readiness-checklist-for-minneapolis-smbs"


@pytest.fixture(scope="module")
def api_client():
    session = requests.Session()
    session.headers.update({"Content-Type": "application/json"})
    return session


class TestBlogListing:
    def test_get_blog_list_status_and_shape(self, api_client):
        resp = api_client.get(f"{BASE_URL}/api/blog")
        assert resp.status_code == 200
        data = resp.json()
        assert isinstance(data, list)
        assert len(data) >= 131  # 131 migrated + original hardcoded posts
        first = data[0]
        for field in ["slug", "title", "excerpt", "category", "published_date", "read_time"]:
            assert field in first

    def test_list_excludes_content_field(self, api_client):
        """Listing endpoint should NOT include full content (keeps payload light)."""
        resp = api_client.get(f"{BASE_URL}/api/blog")
        data = resp.json()
        for post in data:
            assert "content" not in post

    def test_all_slugs_unique(self, api_client):
        resp = api_client.get(f"{BASE_URL}/api/blog")
        data = resp.json()
        slugs = [p["slug"] for p in data]
        assert len(slugs) == len(set(slugs)), "Duplicate slugs found in blog list"

    def test_no_mongo_objectid_leak(self, api_client):
        resp = api_client.get(f"{BASE_URL}/api/blog")
        data = resp.json()
        for post in data:
            assert "_id" not in post


class TestBlogDetailMigratedPosts:
    @pytest.mark.parametrize("slug", SAMPLE_MIGRATED_SLUGS)
    def test_migrated_post_has_full_content(self, api_client, slug):
        resp = api_client.get(f"{BASE_URL}/api/blog/{slug}")
        assert resp.status_code == 200, f"Failed to fetch {slug}"
        data = resp.json()
        assert data["slug"] == slug
        assert "content" in data
        assert isinstance(data["content"], str)
        assert len(data["content"]) >= 1500, f"{slug} content too short ({len(data['content'])} chars)"
        # excerpt should not equal full content (i.e. real migration happened, not excerpt fallback)
        assert data["content"] != data["excerpt"]

    def test_migrated_post_content_not_excerpt_fallback(self, api_client):
        """Regression guard: ensure content field isn't just falling back to excerpt."""
        resp = api_client.get(f"{BASE_URL}/api/blog/{SAMPLE_MIGRATED_SLUGS[0]}")
        data = resp.json()
        assert len(data["content"]) > len(data["excerpt"]) * 3


class TestBlogDetailRegression:
    def test_previously_completed_post_still_renders(self, api_client):
        resp = api_client.get(f"{BASE_URL}/api/blog/{REGRESSION_SLUG}")
        assert resp.status_code == 200
        data = resp.json()
        assert data["slug"] == REGRESSION_SLUG
        assert len(data["content"]) >= 1500

    def test_original_hardcoded_post_still_works(self, api_client):
        """ai-cybersecurity-threats-2025 was in the original hardcoded BLOG_POSTS list."""
        resp = api_client.get(f"{BASE_URL}/api/blog/ai-cybersecurity-threats-2025")
        assert resp.status_code == 200
        data = resp.json()
        assert data["title"] == "How AI Is Changing the Cybersecurity Threat Landscape in 2025"
        assert "content" in data
        assert len(data["content"]) > 500

    def test_nonexistent_slug_returns_404(self, api_client):
        resp = api_client.get(f"{BASE_URL}/api/blog/this-slug-does-not-exist-xyz123")
        assert resp.status_code == 404


class TestSmokeRegression:
    """Light smoke test to confirm no regression from content-only blog_data.py change."""

    def test_health_check(self, api_client):
        resp = api_client.get(f"{BASE_URL}/api/health")
        assert resp.status_code == 200
        assert resp.json()["status"] == "healthy"

    def test_root_endpoint(self, api_client):
        resp = api_client.get(f"{BASE_URL}/api/")
        assert resp.status_code == 200

    def test_lead_capture_post(self, api_client):
        payload = {
            "company": "TEST_Migration QA Co",
            "name": "QA Tester",
            "phone": "555-123-4567",
            "email": "TEST_qa@example.com",
            "source_page": "homepage",
        }
        resp = api_client.post(f"{BASE_URL}/api/leads", json=payload)
        assert resp.status_code == 200
        data = resp.json()
        assert data["success"] is True
        assert "id" in data

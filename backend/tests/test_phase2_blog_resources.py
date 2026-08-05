"""
Phase 2 backend tests: 5 new Resource Center blog articles
Covers: GET /api/blog (list), GET /api/blog/{slug} (detail), duplicate slug check,
category presence for new posts.
"""
import os
import pytest
import requests

BASE_URL = os.environ.get('REACT_APP_BACKEND_URL').rstrip('/')

NEW_SLUGS = [
    "managed-it-pricing-guide-minnesota-businesses",
    "msp-vs-break-fix-it-support",
    "internal-it-vs-managed-service-provider",
    "co-managed-it-vs-fully-managed-it",
    "microsoft-copilot-vs-chatgpt-for-business",
]


@pytest.fixture(scope="module")
def api_client():
    session = requests.Session()
    session.headers.update({"Content-Type": "application/json"})
    return session


@pytest.fixture(scope="module")
def blog_list(api_client):
    resp = api_client.get(f"{BASE_URL}/api/blog")
    assert resp.status_code == 200
    return resp.json()


class TestBlogList:
    def test_status_ok(self, blog_list):
        assert isinstance(blog_list, list)
        assert len(blog_list) > 0

    def test_no_duplicate_slugs(self, blog_list):
        slugs = [p["slug"] for p in blog_list]
        assert len(slugs) == len(set(slugs)), "Duplicate slugs found in /api/blog"

    def test_all_5_new_slugs_present(self, blog_list):
        slugs = {p["slug"] for p in blog_list}
        for s in NEW_SLUGS:
            assert s in slugs, f"New slug {s} missing from /api/blog list"

    def test_content_field_excluded_from_list(self, blog_list):
        for p in blog_list:
            assert "content" not in p


class TestBlogDetail:
    def test_managed_it_pricing_guide(self, api_client):
        resp = api_client.get(f"{BASE_URL}/api/blog/managed-it-pricing-guide-minnesota-businesses")
        assert resp.status_code == 200
        data = resp.json()
        assert data["title"] == "How Much Do Managed IT Services Cost? A Minnesota Pricing Guide"
        assert data["category"] == "Managed IT"
        assert "content" in data and len(data["content"]) > 200
        assert "Frequently Asked Questions" in data["content"]

    def test_copilot_vs_chatgpt(self, api_client):
        resp = api_client.get(f"{BASE_URL}/api/blog/microsoft-copilot-vs-chatgpt-for-business")
        assert resp.status_code == 200
        data = resp.json()
        assert "Copilot" in data["title"]
        assert data["category"] == "AI & Automation"
        assert "content" in data and len(data["content"]) > 200

    @pytest.mark.parametrize("slug", NEW_SLUGS)
    def test_all_new_posts_return_200_with_required_fields(self, api_client, slug):
        resp = api_client.get(f"{BASE_URL}/api/blog/{slug}")
        assert resp.status_code == 200
        data = resp.json()
        for field in ["slug", "title", "category", "published_date", "read_time", "excerpt", "content"]:
            assert field in data, f"Missing field {field} in {slug}"
        assert data["slug"] == slug

    def test_nonexistent_slug_404(self, api_client):
        resp = api_client.get(f"{BASE_URL}/api/blog/this-slug-does-not-exist-xyz")
        assert resp.status_code == 404

"""
Tests for:
- New public GET /api/stats/assessments-completed endpoint (no auth required)
- New blog posts: what-is-cmmc-compliance, what-is-soc-2-compliance (In plain terms opener)
- Regression: /api/leads still requires auth
"""
import os
import requests

BASE_URL = os.environ.get('REACT_APP_BACKEND_URL').rstrip('/')


class TestAssessmentsCompletedStat:
    def test_endpoint_returns_200_no_auth(self):
        resp = requests.get(f"{BASE_URL}/api/stats/assessments-completed")
        assert resp.status_code == 200
        data = resp.json()
        assert "count" in data
        assert isinstance(data["count"], int)

    def test_count_is_non_negative(self):
        resp = requests.get(f"{BASE_URL}/api/stats/assessments-completed")
        data = resp.json()
        assert data["count"] >= 0


class TestLeadsAuthRegression:
    def test_leads_requires_admin_key(self):
        resp = requests.get(f"{BASE_URL}/api/leads")
        assert resp.status_code in (401, 403)

    def test_leads_count_requires_admin_key(self):
        resp = requests.get(f"{BASE_URL}/api/leads/count")
        assert resp.status_code in (401, 403)


class TestBlogPosts:
    def test_soc2_post_exists_with_plain_terms(self):
        resp = requests.get(f"{BASE_URL}/api/blog/what-is-soc-2-compliance")
        assert resp.status_code == 200
        data = resp.json()
        assert data["slug"] == "what-is-soc-2-compliance"
        assert data["content"].strip().startswith("In plain terms:")

    def test_cmmc_post_exists_with_plain_terms(self):
        resp = requests.get(f"{BASE_URL}/api/blog/what-is-cmmc-compliance")
        assert resp.status_code == 200
        data = resp.json()
        assert data["title"] == "What Is CMMC Compliance?"
        assert data["content"].strip().startswith("In plain terms:")
        assert "CMMC" in data["content"]

    def test_ai_automation_post_exists(self):
        resp = requests.get(
            f"{BASE_URL}/api/blog/how-ai-automation-are-transforming-small-businesses-in-minneapolis"
        )
        assert resp.status_code == 200
        data = resp.json()
        assert "AI" in data["title"]

"""
Tests for:
- New public GET /api/stats/assessments-completed endpoint (no auth required)
- Blog posts: soc-2-compliance-guide-small-business, cmmc-compliance-guide-defense-contractors
  (comprehensive posts with an "In plain terms:" opener merged in during Session 12 - the
  "what-is-soc-2-compliance"/"what-is-cmmc-compliance" duplicate posts these tests originally
  targeted were intentionally deleted that same session; these slugs are the real ones)
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
        resp = requests.get(f"{BASE_URL}/api/blog/soc-2-compliance-guide-small-business")
        assert resp.status_code == 200
        data = resp.json()
        assert data["slug"] == "soc-2-compliance-guide-small-business"
        assert data["content"].strip().startswith("In plain terms:")

    def test_cmmc_post_exists_with_plain_terms(self):
        resp = requests.get(f"{BASE_URL}/api/blog/cmmc-compliance-guide-defense-contractors")
        assert resp.status_code == 200
        data = resp.json()
        assert "CMMC" in data["title"]
        assert data["content"].strip().startswith("In plain terms:")
        assert "CMMC" in data["content"]

    def test_ai_automation_post_exists(self):
        resp = requests.get(
            f"{BASE_URL}/api/blog/how-ai-automation-are-transforming-small-businesses-in-minneapolis"
        )
        assert resp.status_code == 200
        data = resp.json()
        assert "AI" in data["title"]

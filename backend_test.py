import requests
import sys
import json
from datetime import datetime

class APITester:
    def __init__(self, base_url="https://jobsite-it-secure.preview.emergentagent.com/api"):
        self.base_url = base_url
        self.tests_run = 0
        self.tests_passed = 0
        self.test_results = []

    def run_test(self, name, method, endpoint, expected_status, data=None, headers=None):
        """Run a single API test"""
        url = f"{self.base_url}/{endpoint}"
        if headers is None:
            headers = {'Content-Type': 'application/json'}

        self.tests_run += 1
        print(f"\n🔍 Testing {name}...")
        print(f"   URL: {url}")
        
        try:
            if method == 'GET':
                response = requests.get(url, headers=headers, timeout=10)
            elif method == 'POST':
                response = requests.post(url, json=data, headers=headers, timeout=10)
            else:
                raise ValueError(f"Unsupported method: {method}")

            success = response.status_code == expected_status
            
            result = {
                "test_name": name,
                "endpoint": endpoint,
                "method": method,
                "expected_status": expected_status,
                "actual_status": response.status_code,
                "success": success,
                "response_data": None,
                "error": None
            }

            if success:
                self.tests_passed += 1
                print(f"✅ Passed - Status: {response.status_code}")
                try:
                    result["response_data"] = response.json()
                    print(f"   Response: {json.dumps(result['response_data'], indent=2)[:200]}...")
                except:
                    result["response_data"] = response.text[:200]
                    print(f"   Response: {result['response_data']}")
            else:
                print(f"❌ Failed - Expected {expected_status}, got {response.status_code}")
                try:
                    error_data = response.json()
                    result["error"] = error_data
                    print(f"   Error: {error_data}")
                except:
                    result["error"] = response.text
                    print(f"   Error: {response.text}")

            self.test_results.append(result)
            return success, result["response_data"]

        except Exception as e:
            print(f"❌ Failed - Error: {str(e)}")
            result = {
                "test_name": name,
                "endpoint": endpoint,
                "method": method,
                "expected_status": expected_status,
                "actual_status": None,
                "success": False,
                "response_data": None,
                "error": str(e)
            }
            self.test_results.append(result)
            return False, {}

    def test_health_check(self):
        """Test basic health endpoint"""
        return self.run_test("Health Check", "GET", "health", 200)

    def test_root_endpoint(self):
        """Test root API endpoint"""
        return self.run_test("Root Endpoint", "GET", "", 200)

    def test_create_lead(self, lead_data):
        """Test creating a new lead"""
        return self.run_test("Create Lead", "POST", "leads", 200, data=lead_data)

    def test_get_leads(self):
        """Test retrieving all leads"""
        return self.run_test("Get All Leads", "GET", "leads", 200)

    def test_get_lead_count(self):
        """Test getting lead count"""
        return self.run_test("Get Lead Count", "GET", "leads/count", 200)

    def test_get_blog_posts(self):
        """Test retrieving blog posts list"""
        return self.run_test("Get Blog Posts", "GET", "blog", 200)

    def test_get_blog_post(self, slug):
        """Test retrieving a specific blog post"""
        return self.run_test(f"Get Blog Post ({slug})", "GET", f"blog/{slug}", 200)

    def test_get_nonexistent_blog_post(self):
        """Test retrieving a non-existent blog post"""
        return self.run_test("Get Non-existent Blog Post", "GET", "blog/nonexistent-post", 404)

def main():
    print("🚀 Starting Backend API Tests")
    print("=" * 50)
    
    tester = APITester()
    
    # Test basic endpoints
    print("\n📋 Testing Basic Endpoints")
    tester.test_health_check()
    tester.test_root_endpoint()
    
    # Test lead endpoints
    print("\n📝 Testing Lead Management")
    
    # Test creating leads with different source types
    test_leads = [
        {
            "company": "Test Company Homepage",
            "name": "John Doe",
            "role": "IT Director", 
            "phone": "555-123-4567",
            "email": "john@testcompany.com",
            "source_page": "homepage"
        },
        {
            "company": "Test Company City",
            "name": "Jane Smith",
            "phone": "555-987-6543", 
            "email": "jane@testcompany.com",
            "source_page": "city",
            "source_city": "Minneapolis"
        },
        {
            "company": "Test Company Industry",
            "name": "Bob Johnson",
            "phone": "555-456-7890",
            "email": "bob@testcompany.com", 
            "source_page": "industry",
            "source_industry": "Construction"
        }
    ]
    
    created_leads = []
    for i, lead_data in enumerate(test_leads):
        success, response = tester.test_create_lead(lead_data)
        if success and response:
            created_leads.append(response)
    
    # Test retrieving leads
    tester.test_get_leads()
    tester.test_get_lead_count()
    
    # Test blog endpoints
    print("\n📚 Testing Blog Endpoints")
    success, blog_posts = tester.test_get_blog_posts()
    
    if success and blog_posts:
        print(f"   Found {len(blog_posts)} blog posts")
        
        # Test retrieving specific blog posts
        for post in blog_posts[:3]:  # Test first 3 posts
            tester.test_get_blog_post(post.get('slug', ''))
    
    # Test error handling
    print("\n🚨 Testing Error Handling")
    tester.test_get_nonexistent_blog_post()
    
    # Test invalid lead data
    invalid_lead = {
        "company": "Test Company",
        # Missing required fields
    }
    tester.run_test("Create Invalid Lead", "POST", "leads", 422, data=invalid_lead)
    
    # Print summary
    print("\n" + "=" * 50)
    print(f"📊 Test Summary")
    print(f"   Tests run: {tester.tests_run}")
    print(f"   Tests passed: {tester.tests_passed}")
    print(f"   Tests failed: {tester.tests_run - tester.tests_passed}")
    print(f"   Success rate: {(tester.tests_passed/tester.tests_run)*100:.1f}%")
    
    # Save detailed results
    with open('/app/test_reports/backend_api_results.json', 'w') as f:
        json.dump({
            "timestamp": datetime.now().isoformat(),
            "summary": {
                "tests_run": tester.tests_run,
                "tests_passed": tester.tests_passed,
                "success_rate": (tester.tests_passed/tester.tests_run)*100
            },
            "test_results": tester.test_results
        }, f, indent=2)
    
    print(f"\n💾 Detailed results saved to /app/test_reports/backend_api_results.json")
    
    return 0 if tester.tests_passed == tester.tests_run else 1

if __name__ == "__main__":
    sys.exit(main())
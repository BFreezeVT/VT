"""
Shared pytest fixtures for the backend test suite.

Several test files intentionally exhaust the /api/leads and /api/reports/email per-IP rate
limit budgets (5/hour) to prove the 429 behavior works. Since all test files run from the same
test-runner IP within the same hour, that exhaustion would otherwise leak across files and cause
unrelated tests in later-running files to fail with 429 instead of their expected status code.

This autouse, module-scoped fixture gives every test FILE its own fresh rate-limit quota,
regardless of what ran before it or what order pytest collects files in.
"""
import os
from pathlib import Path

import pymongo
import pytest
from dotenv import load_dotenv

load_dotenv(str(Path(__file__).resolve().parent.parent / ".env"))
MONGO_URL = os.environ['MONGO_URL']
DB_NAME = os.environ['DB_NAME']
_mongo_client = pymongo.MongoClient(MONGO_URL)
_db = _mongo_client[DB_NAME]


@pytest.fixture(autouse=True, scope="module")
def reset_rate_limit_quota_between_modules():
    _db.lead_submission_log.delete_many({})
    _db.rate_limit_global_log.delete_many({})
    yield

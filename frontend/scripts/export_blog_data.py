#!/usr/bin/env python3
"""Export the blog posts served by the backend API as JSON for prerendering.

The backend API (backend/server.py) serves blog data from two in-code lists:
BLOG_POSTS (backend/server.py, 10 posts) and BLOG_POSTS_EXTENDED
(backend/blog_data.py, 141 posts). This script reproduces the exact
ALL_BLOG_POSTS construction from server.py without importing it (importing
server.py reads env vars and constructs the FastAPI app), so the prerender
step can serve the blog API from repo data instead of a live backend.

Usage: python3 export_blog_data.py <output.json>
Writes a JSON array of all posts, sorted by published_date descending,
each with its full content. Exits non-zero on any error.
"""
import ast
import json
import sys
from pathlib import Path

BACKEND_DIR = Path(__file__).resolve().parent.parent.parent / "backend"


def load_assignment(path, name):
    tree = ast.parse(Path(path).read_text(encoding="utf-8"))
    for node in ast.walk(tree):
        if isinstance(node, ast.Assign):
            for target in node.targets:
                if isinstance(target, ast.Name) and target.id == name:
                    return ast.literal_eval(node.value)
    raise ValueError(f"{name} assignment not found in {path}")


def main():
    out_path = Path(sys.argv[1])
    original = load_assignment(BACKEND_DIR / "server.py", "BLOG_POSTS")
    extended = load_assignment(BACKEND_DIR / "blog_data.py", "BLOG_POSTS_EXTENDED")
    original_slugs = {post["slug"] for post in original}
    # Mirror backend/server.py ALL_BLOG_POSTS exactly: extended posts get a
    # content fallback to their excerpt and the author field, and any extended
    # post whose slug already exists in BLOG_POSTS is dropped.
    all_posts = original + [
        {**post, "content": post.get("content", post["excerpt"]), "author": "Veracity Technologies"}
        for post in extended
        if post["slug"] not in original_slugs
    ]
    all_posts.sort(key=lambda post: post.get("published_date", ""), reverse=True)
    out_path.write_text(json.dumps(all_posts), encoding="utf-8")
    print(f"Exported {len(all_posts)} blog posts to {out_path}")


if __name__ == "__main__":
    main()

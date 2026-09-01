import json, asyncio, os, sys
from dotenv import load_dotenv
load_dotenv("/app/backend/.env")
from emergentintegrations.llm.chat import LlmChat, UserMessage

API_KEY = os.environ["EMERGENT_LLM_KEY"]

SYSTEM_MSG = """You are a senior content writer for Veracity Technologies, a managed IT services and cybersecurity provider serving small and mid-sized businesses (10-250 employees) in the Minneapolis-St. Paul, Minnesota metro area and Central Minnesota. Primary industries served: financial services/wealth management, construction, manufacturing, and other high-compliance organizations.

Write in a confident, practical, no-fluff B2B tone speaking directly to SMB decision-makers (owners, CFOs, office managers, operations leads). Be specific and concrete - avoid generic AI-sounding filler, vague platitudes, or restating the obvious. Reference Minneapolis-St. Paul/Minnesota business context naturally where relevant. Where relevant, weave in specific, realistic examples touching construction, financial services, or manufacturing.

You must expand a short existing blog post draft into a comprehensive, publication-ready article of 900-1300 words, while preserving its core topic, angle, and any specific claims already in the draft.

Output STRICT JSON only (no markdown code fences, no commentary) with exactly these keys:
{
  "content": "the full article body as a single string",
  "excerpt": "a 120-160 character teaser summary",
  "read_time": "e.g. '6 min read'"
}

Formatting rules for the "content" string (this is parsed by a custom renderer, follow EXACTLY):
- Do NOT repeat the article title anywhere in the content.
- Separate every block (paragraph, heading, list) with a blank line, i.e. two consecutive newline characters (\\n\\n).
- Use "## Heading Text" for H2 section headings (use 3-5 of these to structure the article). Optionally one "### Subheading" for a nested point.
- Bullet lists: each line starts with "- " (a single dash and space), lines within the same list block should NOT have a blank line between them (blank line only before/after the whole list).
- Numbered lists: each line starts with "1. ", "2. " etc, same blank-line rule as bullets.
- Use **bold** for key terms/lead-ins (e.g. "**AI-Generated Phishing**: description...").
- Use *italic* sparingly for emphasis within a sentence.
- End the article with a short closing section named "## The Bottom Line" (or a similarly natural closing heading), followed by one final short paragraph wrapped entirely in single asterisks as a call-to-action, e.g.: "*If your business hasn't done X, now is the time. Contact us for a free evaluation.*"
- The opening paragraph (before the first heading) should NOT have a heading - it should hook the reader and set up the topic directly.
"""

def build_prompt(post):
    return f"""Article title: {post['title']}
Category: {post['category']}
Current short draft (expand on this, keep the same angle/claims, add depth/examples/structure):
---
{post['content']}
---

Expand this into a complete 900-1300 word article following the system instructions exactly. Return ONLY the JSON object."""

async def expand_post(post):
    chat = LlmChat(
        api_key=API_KEY,
        session_id=f"blog-expand-{post['slug']}",
        system_message=SYSTEM_MSG,
    ).with_model("openai", "gpt-5.4-mini")
    msg = UserMessage(text=build_prompt(post))
    result = await chat.send_message(msg)
    return result

async def main():
    with open("/tmp/batch1_posts.json") as f:
        posts = json.load(f)

    results = {}
    for i, post in enumerate(posts):
        print(f"[{i+1}/{len(posts)}] Expanding: {post['slug']}", flush=True)
        try:
            raw = await expand_post(post)
            raw = raw.strip()
            if raw.startswith("```"):
                raw = raw.split("```")[1]
                if raw.startswith("json"):
                    raw = raw[4:]
            data = json.loads(raw)
            word_count = len(data["content"].split())
            print(f"    -> {word_count} words, excerpt: {data['excerpt'][:60]}...", flush=True)
            results[post["slug"]] = data
        except Exception as e:
            print(f"    FAILED: {e}", flush=True)
            results[post["slug"]] = {"error": str(e)}

    with open("/tmp/batch1_results.json", "w") as f:
        json.dump(results, f, indent=2)
    print("Done. Saved to /tmp/batch1_results.json")

asyncio.run(main())

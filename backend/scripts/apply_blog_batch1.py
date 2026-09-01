import json, re

with open("/app/backend/blog_data.py") as f:
    text = f.read()

with open("/tmp/batch1_results.json") as f:
    results = json.load(f)

HEADER = "BLOG_POSTS_EXTENDED = [\n"
FOOTER = "\n]\n"
assert text.startswith(HEADER)
assert text.rstrip("\n").endswith("]")

body = text[len(HEADER):text.rfind("]")]

# Split into entries on the boundary "    {\"slug\": \""
marker = '    {"slug": "'
positions = [m.start() for m in re.finditer(re.escape(marker), body)]
entries = []
for i, pos in enumerate(positions):
    end = positions[i + 1] if i + 1 < len(positions) else len(body)
    entries.append(body[pos:end])

def esc(s):
    return s.replace("\\", "\\\\").replace('"', '\\"')

updated = 0
new_entries = []
for entry in entries:
    m = re.match(r'    \{"slug": "([^"]+)"', entry)
    slug = m.group(1)
    if slug in results and "error" not in results[slug]:
        r = results[slug]
        old_meta = re.match(
            r'    \{"slug": "([^"]+)", "title": "((?:[^"\\]|\\.)*)", "excerpt": "((?:[^"\\]|\\.)*)", "category": "([^"]+)", "published_date": "([^"]+)", "read_time": "([^"]+)", "content": """',
            entry,
        )
        if not old_meta:
            print(f"WARNING: could not parse header for {slug}, skipping")
            new_entries.append(entry)
            continue
        title, category, pub_date = old_meta.group(2), old_meta.group(4), old_meta.group(5)
        trailing = entry.rstrip()
        assert trailing.endswith('"""},'), f"unexpected trailing for {slug}: {trailing[-20:]}"
        new_content = r["content"]
        new_excerpt = esc(r["excerpt"])
        new_read_time = r["read_time"]
        new_entry = (
            f'    {{"slug": "{slug}", "title": "{title}", "excerpt": "{new_excerpt}", '
            f'"category": "{category}", "published_date": "{pub_date}", "read_time": "{new_read_time}", '
            f'"content": """{new_content}"""}},\n'
        )
        new_entries.append(new_entry)
        updated += 1
    else:
        new_entries.append(entry)

new_body = "".join(new_entries)
new_text = HEADER + new_body.rstrip("\n,") + FOOTER

with open("/app/backend/blog_data.py", "w") as f:
    f.write(new_text)

print(f"Updated {updated} entries")

# sanity check: reload module
import importlib.util
spec = importlib.util.spec_from_file_location("blog_data_check", "/app/backend/blog_data.py")
mod = importlib.util.module_from_spec(spec)
spec.loader.exec_module(mod)
print(f"Total entries after update: {len(mod.BLOG_POSTS_EXTENDED)}")
for p in mod.BLOG_POSTS_EXTENDED:
    if p["slug"] in results and "error" not in results[p["slug"]]:
        print(p["slug"], "->", len(p["content"]), "chars, excerpt len", len(p["excerpt"]))

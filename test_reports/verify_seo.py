"""Static HTML verification for FAQ SSR fix + head integrity + regression spot checks."""
import re, json, sys, os

RESULTS = {"pass": [], "fail": [], "info": []}

def check(name, cond, detail=""):
    (RESULTS["pass"] if cond else RESULTS["fail"]).append(f"{name}: {detail}")

def read(p):
    with open(p, encoding="utf-8") as f:
        return f.read()

# ---------- 1. FAQ contents in public/index.html ----------
home = read("/app/frontend/public/index.html")
print(f"public/index.html size: {len(home)} bytes")

faq_lengths = {}
suspicious = []
for i in range(23):
    # Match the element with data-testid="faq-content-N" and capture inner content (approx)
    m = re.search(
        rf'data-testid="faq-content-{i}"[^>]*>(.*?)</div>\s*</div>',
        home, re.DOTALL,
    )
    if not m:
        # fallback: capture till next data-testid or closing structure
        m = re.search(rf'data-testid="faq-content-{i}"[^>]*>(.*?)(?=data-testid="faq-|</section)',
                      home, re.DOTALL)
    if not m:
        suspicious.append((i, "NOT FOUND"))
        faq_lengths[i] = 0
        continue
    inner = m.group(1)
    text = re.sub(r"<[^>]+>", " ", inner)
    text = re.sub(r"\s+", " ", text).strip()
    faq_lengths[i] = len(text)
    if len(text) < 50:
        suspicious.append((i, f"len={len(text)} text={text[:80]!r}"))

print("FAQ text lengths:", faq_lengths)
check("All 23 FAQ contents >=50 chars", len(suspicious) == 0,
      f"suspicious={suspicious}")

# ---------- 2. Head integrity ----------
head_match = re.search(r"<head[^>]*>(.*?)</head>", home, re.DOTALL)
head = head_match.group(1) if head_match else ""

titles = re.findall(r"<title[^>]*>.*?</title>", head, re.DOTALL)
canonicals = re.findall(r'<link[^>]*rel="canonical"[^>]*>', head)
ld_blocks = re.findall(
    r'<script[^>]*type="application/ld\+json"[^>]*>(.*?)</script>',
    head, re.DOTALL,
)

print(f"titles={len(titles)} canonicals={len(canonicals)} ld_blocks={len(ld_blocks)}")
check("Exactly 1 <title>", len(titles) == 1, f"count={len(titles)} first={titles[0] if titles else None}")
check("Exactly 1 canonical", len(canonicals) == 1, f"count={len(canonicals)} tags={canonicals}")
check("Canonical points to https://www.veracitytechmn.com/",
      any('href="https://www.veracitytechmn.com/"' in c for c in canonicals),
      f"tags={canonicals}")
check("Exactly 10 ld+json blocks", len(ld_blocks) == 10, f"count={len(ld_blocks)}")

parse_errors = []
faqpage_qas = None
for idx, block in enumerate(ld_blocks):
    try:
        data = json.loads(block.strip())
        if isinstance(data, dict) and data.get("@type") == "FAQPage":
            faqpage_qas = len(data.get("mainEntity", []))
    except Exception as e:
        parse_errors.append((idx, str(e)))
check("All ld+json blocks parse", not parse_errors, f"errors={parse_errors}")
check("FAQPage schema has 23 Q&A pairs", faqpage_qas == 23, f"got={faqpage_qas}")

# ---------- 3. Hero CTA is <a> ----------
cta_a = re.search(r'<a[^>]*data-testid="hero-cta-button"', home)
cta_btn = re.search(r'<button[^>]*data-testid="hero-cta-button"', home)
check("Hero CTA is <a> tag (not <button>)", bool(cta_a) and not bool(cta_btn),
      f"a={bool(cta_a)} button={bool(cta_btn)}")

# ---------- 4. Root #root div not empty ----------
root_match = re.search(r'<div id="root">(.*?)</div>\s*(<script|</body)', home, re.DOTALL)
root_body_len = len(root_match.group(1).strip()) if root_match else 0
print(f"root div content length: {root_body_len}")
check("#root div has real content (>10000 chars)", root_body_len > 10000, f"len={root_body_len}")

# ---------- 5. Regression spot checks ----------
for path in [
    "/app/frontend/public/service-areas/index.html",
    "/app/frontend/public/resources/schools-out-cybercriminals-are-in/index.html",
]:
    html = read(path)
    rm = re.search(r'<div id="root">(.*?)</div>\s*(<script|</body)', html, re.DOTALL)
    rlen = len(rm.group(1).strip()) if rm else 0
    can = re.findall(r'<link[^>]*rel="canonical"[^>]*>', html)
    check(f"{os.path.basename(os.path.dirname(path))} root non-empty", rlen > 5000, f"len={rlen}")
    check(f"{os.path.basename(os.path.dirname(path))} has canonical", len(can) >= 1, f"tags={can[:1]}")

# ---------- Summary ----------
print("\n=== PASS ===")
for p in RESULTS["pass"]: print("  ✓", p)
print("\n=== FAIL ===")
for f in RESULTS["fail"]: print("  ✗", f)
print(f"\nTotals: pass={len(RESULTS['pass'])} fail={len(RESULTS['fail'])}")
sys.exit(0 if not RESULTS["fail"] else 1)

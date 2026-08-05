import DOMPurify from "dompurify";

// Convert markdown-like blog content to JSX. Handles the common case where a "## "/"### "
// heading is immediately followed by list items with only a single newline (no blank line) -
// without this, the heading line + all following list lines get merged into one block and
// rendered as raw unformatted heading text (markdown left un-rendered).

function formatInline(text) {
  const html = text
    .replace(/\*\*(.+?)\*\*/g, '<strong class="text-white font-semibold">$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>');
  return DOMPurify.sanitize(html, { ALLOWED_TAGS: ["strong", "em"], ALLOWED_ATTR: ["class"] });
}

function renderBlock(block, key) {
  const lines = block.split("\n");
  const firstLine = lines[0];

  if (firstLine.startsWith("## ") || firstLine.startsWith("### ")) {
    const isH3 = firstLine.startsWith("### ");
    const heading = isH3 ? (
      <h3 key={`${key}-h`} className="text-lg font-semibold text-white mt-8 mb-3" style={{ fontFamily: "Outfit" }}>
        {firstLine.replace("### ", "")}
      </h3>
    ) : (
      <h2 key={`${key}-h`} className="text-xl sm:text-2xl font-bold text-white mt-10 mb-4" style={{ fontFamily: "Outfit" }}>
        {firstLine.replace("## ", "")}
      </h2>
    );
    const rest = lines.slice(1).join("\n").trim();
    return rest ? [heading, ...renderBlock(rest, `${key}-r`)] : [heading];
  }

  if (firstLine.startsWith("- ")) {
    const items = lines.filter(l => l.startsWith("- "));
    return [(
      <ul key={key} className="space-y-2 my-4 ml-4">
        {items.map((item) => (
          <li key={item} className="text-[#94a8be] text-base leading-relaxed flex items-start gap-2">
            <span className="text-[#0077B3] mt-1.5 flex-shrink-0">&#8226;</span>
            <span dangerouslySetInnerHTML={{ __html: formatInline(item.replace("- ", "")) }} />
          </li>
        ))}
      </ul>
    )];
  }

  if (firstLine.match(/^\d+\./)) {
    const items = lines.filter(l => l.match(/^\d+\./));
    return [(
      <ol key={key} className="space-y-2 my-4 ml-4 list-decimal list-inside">
        {items.map((item) => (
          <li key={item} className="text-[#94a8be] text-base leading-relaxed" dangerouslySetInnerHTML={{ __html: formatInline(item.replace(/^\d+\.\s*/, "")) }} />
        ))}
      </ol>
    )];
  }

  if (block.startsWith("*") && block.endsWith("*") && !block.startsWith("**")) {
    return [(
      <p key={key} className="text-[#0077B3] text-base italic my-6 border-l-2 border-[#0077B3] pl-4">
        {block.replace(/^\*|\*$/g, "")}
      </p>
    )];
  }

  return [(
    <p key={key} className="text-[#94a8be] text-base leading-relaxed my-4" dangerouslySetInnerHTML={{ __html: formatInline(block) }} />
  )];
}

export function renderContent(text) {
  return text.split("\n\n").flatMap((block, i) => renderBlock(block, i));
}

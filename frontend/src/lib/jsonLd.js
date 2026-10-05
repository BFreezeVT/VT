// Safely serialize a JSON-LD object for injection into a <script type="application/ld+json">
// tag via dangerouslySetInnerHTML. Escaping "<" as "\u003c" prevents a "</script>" sequence in
// any (potentially backend-sourced) string field from breaking out of the script tag - the one
// real XSS vector for JSON-LD. The escaped output is still valid JSON and parses identically,
// so Google/Bing structured-data parsing is unaffected. (DOMPurify is the WRONG tool here: this
// is JSON data in a non-rendered script tag, not HTML, and sanitizing it would corrupt the schema.)
export function stringifyJsonLd(data) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

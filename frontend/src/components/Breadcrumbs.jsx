import { Link } from "react-router-dom";
import { ChevronRight, Home } from "lucide-react";

// Shared visible breadcrumb trail - mirrors the JSON-LD BreadcrumbList schema already
// present on each page type, so search engines and users see the same hierarchy.
// `items` is an array of { label, to } - the last item should omit `to` (current page).
export default function Breadcrumbs({ items }) {
  return (
    <nav aria-label="Breadcrumb" data-testid="breadcrumbs" className="mb-6">
      <ol className="flex items-center flex-wrap gap-1.5 text-xs">
        <li className="flex items-center gap-1.5">
          <Link to="/" data-testid="breadcrumb-home" className="flex items-center gap-1 text-[#94a8be] hover:text-white transition-colors">
            <Home className="w-3 h-3" /> Home
          </Link>
        </li>
        {items.map((item, i) => (
          <li key={item.label} className="flex items-center gap-1.5 min-w-0">
            <ChevronRight className="w-3 h-3 text-[#94a8be]/40 flex-shrink-0" />
            {item.to ? (
              <Link to={item.to} data-testid={`breadcrumb-link-${i}`} className="text-[#94a8be] hover:text-white transition-colors truncate max-w-[200px] sm:max-w-none">
                {item.label}
              </Link>
            ) : (
              <span data-testid="breadcrumb-current" aria-current="page" className="text-white font-medium truncate max-w-[220px] sm:max-w-none">
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

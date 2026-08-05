import { Link } from "react-router-dom";

export default function BlogPostFooter() {
  return (
    <footer className="bg-[#003B71] border-t border-[#00325f] py-8">
      <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-[#94a8be]/60 text-xs">&copy; {new Date().getFullYear()} Veracity Technologies.</p>
        <div className="flex items-center gap-6 text-sm text-[#94a8be]">
          <Link to="/resources" className="hover:text-white">Resources</Link>
          <Link to="/" className="hover:text-white">Home</Link>
        </div>
      </div>
    </footer>
  );
}

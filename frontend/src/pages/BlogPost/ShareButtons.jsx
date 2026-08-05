import { Linkedin, Mail } from "lucide-react";

export default function ShareButtons({ post }) {
  const canonicalUrl = `https://www.veracitytechmn.com/resources/${post.slug}`;
  const linkedinShareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(canonicalUrl)}`;
  const emailSubject = encodeURIComponent(post.title);
  const emailBody = encodeURIComponent(`Thought you'd find this useful: ${post.title}\n\n${canonicalUrl}`);
  const mailtoUrl = `mailto:?subject=${emailSubject}&body=${emailBody}`;

  return (
    <div className="flex items-center gap-3 mb-10" data-testid="blog-post-share-buttons">
      <span className="text-[#94a8be]/60 text-xs uppercase tracking-wider">Share</span>
      <a
        href={linkedinShareUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Share on LinkedIn"
        data-testid="share-linkedin-button"
        className="w-9 h-9 flex items-center justify-center border border-white/10 rounded-sm text-[#94a8be] hover:text-white hover:border-[#0077B3] hover:bg-[#0077B3]/10 transition-colors"
      >
        <Linkedin className="w-4 h-4" />
      </a>
      <a
        href={mailtoUrl}
        aria-label="Share via Email"
        data-testid="share-email-button"
        className="w-9 h-9 flex items-center justify-center border border-white/10 rounded-sm text-[#94a8be] hover:text-white hover:border-[#0077B3] hover:bg-[#0077B3]/10 transition-colors"
      >
        <Mail className="w-4 h-4" />
      </a>
    </div>
  );
}

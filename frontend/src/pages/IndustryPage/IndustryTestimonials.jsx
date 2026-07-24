import { Quote } from "lucide-react";

export default function IndustryTestimonials({ industry, testimonials }) {
  return (
    <section data-testid="industry-testimonials" className="py-20 bg-[#0f1d32]">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-2xl font-bold text-white mb-10 text-center" style={{ fontFamily: "Outfit" }}>
          Trusted by {industry.name.toLowerCase()} professionals
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <div key={t.company} data-testid={`industry-testimonial-${i}`} className="grid-border-card p-6 flex flex-col">
              <Quote className="w-6 h-6 text-[#0077B3]/20 mb-3" />
              <p className="text-[#94a8be] text-sm leading-relaxed mb-4 flex-1 italic">&ldquo;{t.quote}&rdquo;</p>
              <div className="border-t border-white/10 pt-3 mt-auto">
                <p className="text-white font-semibold text-sm">{t.name}</p>
                <p className="text-[#94a8be] text-xs">{t.title}, {t.company}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

import { Star } from "lucide-react";
import { ABOUT_TESTIMONIALS } from "./aboutUsData";

export default function AboutUsTestimonials() {
  return (
    <section data-testid="about-us-testimonials" className="py-20 bg-[#0a1628]">
      <div className="max-w-6xl mx-auto px-6">
        <p className="overline text-[#0077B3] mb-4 text-center">What Clients Are Saying</p>
        <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4 text-center" style={{ fontFamily: "Outfit" }}>
          Trusted by Minnesota Businesses
        </h2>
        <p className="text-base text-[#94a8be] leading-relaxed mb-12 max-w-2xl mx-auto text-center">
          Veracity Technologies holds a 5.0 star rating on Clutch across verified client reviews. Here is what clients say in their own words.
        </p>
        <div className="grid md:grid-cols-2 gap-6">
          {ABOUT_TESTIMONIALS.map((t) => (
            <figure key={t.name} data-testid="about-us-testimonial" className="bg-[#0f1d32] border border-white/10 rounded-sm p-6 flex flex-col">
              <div className="flex items-center gap-1 mb-3" aria-label="5 out of 5 stars">
                <Star className="w-4 h-4 fill-[#f59e0b] text-[#f59e0b]" />
                <Star className="w-4 h-4 fill-[#f59e0b] text-[#f59e0b]" />
                <Star className="w-4 h-4 fill-[#f59e0b] text-[#f59e0b]" />
                <Star className="w-4 h-4 fill-[#f59e0b] text-[#f59e0b]" />
                <Star className="w-4 h-4 fill-[#f59e0b] text-[#f59e0b]" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2" style={{ fontFamily: "Outfit" }}>{t.headline}</h3>
              <blockquote className="text-sm text-[#94a8be] leading-relaxed flex-1">
                &ldquo;{t.quote}&rdquo;
              </blockquote>
              <figcaption className="mt-4 pt-4 border-t border-white/10">
                <p className="text-sm font-semibold text-white">{t.name}</p>
                <p className="text-xs text-[#94a8be]">{t.title}, {t.company}</p>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

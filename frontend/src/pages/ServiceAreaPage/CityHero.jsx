import { Link } from "react-router-dom";
import { Phone, MapPin, ChevronLeft } from "lucide-react";
import { Button } from "../../components/ui/button";

export default function CityHero({ city }) {
  return (
    <section
      data-testid="city-hero"
      aria-label={`IT support services in ${city.name}, Minnesota`}
      className="py-24 lg:py-32"
    >
      <div className="max-w-7xl mx-auto px-6">
        <Link to="/" className="inline-flex items-center gap-1 text-[#0077B3] text-sm mb-6 hover:text-white transition-colors">
          <ChevronLeft className="w-3 h-3" /> All Service Areas
        </Link>
        <div className="flex items-center gap-2 mb-4">
          <MapPin className="w-4 h-4 text-[#0077B3]" />
          <p className="overline text-[#0077B3]">{city.name}, {city.state} {city.zip}</p>
        </div>
        <h1
          data-testid="city-headline"
          className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-none text-white mb-6"
          style={{ fontFamily: "Outfit, sans-serif" }}
        >
          {city.headline}
        </h1>
        <p data-testid="city-subhead" className="text-base md:text-lg text-[#c0cfe0] leading-relaxed max-w-3xl mb-10">
          {city.subhead}
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <Button
            data-testid="city-hero-cta"
            onClick={() => document.getElementById("city-form")?.scrollIntoView({ behavior: "smooth" })}
            className="bg-white text-[#1e6bb8] hover:bg-white/90 rounded-sm font-bold text-base px-8 h-12"
          >
            {city.ctaText}
          </Button>
          <a href="tel:9529417333" className="flex items-center gap-2 text-[#94a8be] hover:text-white transition-colors text-sm h-12 px-4">
            <Phone className="w-4 h-4" /> Or call (952) 941-7333
          </a>
        </div>
      </div>
    </section>
  );
}

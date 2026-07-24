import { Building2 } from "lucide-react";

export default function CityAbout({ city }) {
  return (
    <section data-testid="city-about" aria-label={`About IT services in ${city.name}`} className="py-20 bg-[#0f1d32]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div>
            <p className="overline text-[#0077B3] mb-4">IT Support in {city.name}</p>
            <h2
              data-testid="city-about-heading"
              className="text-2xl sm:text-3xl font-bold tracking-tight text-white mb-6"
              style={{ fontFamily: "Outfit, sans-serif" }}
            >
              Why {city.name} businesses choose Veracity
            </h2>
            <p data-testid="city-description" className="text-[#c0cfe0] text-base leading-relaxed mb-8">
              {city.description}
            </p>
            <div className="grid-border-card p-5 mb-6">
              <p className="text-white text-sm font-semibold mb-1" style={{ fontFamily: "Outfit, sans-serif" }}>
                The Local Challenge
              </p>
              <p data-testid="city-challenge" className="text-[#c0cfe0] text-sm leading-relaxed">{city.localChallenge}</p>
            </div>
            <div className="grid-border-card p-5">
              <p className="text-[#0077B3] text-sm font-semibold mb-1" style={{ fontFamily: "Outfit, sans-serif" }}>
                Did You Know?
              </p>
              <p data-testid="city-fact" className="text-[#c0cfe0] text-sm leading-relaxed">{city.localFact}</p>
            </div>
          </div>

          <div>
            <div className="grid-border-card p-6 mb-6">
              <p className="overline text-[#0077B3] mb-4">Key Industries in {city.name}</p>
              <div className="space-y-3">
                {city.localIndustries.map((ind, i) => (
                  <div key={ind} data-testid={`city-industry-${i}`} className="flex items-center gap-3">
                    <Building2 className="w-4 h-4 text-[#0077B3] flex-shrink-0" />
                    <span className="text-white text-sm font-medium">{ind}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="grid-border-card p-6">
              <p className="overline text-[#0077B3] mb-4">Areas We Cover in {city.name}</p>
              <div className="flex flex-wrap gap-2">
                {city.neighborhoods.map((n, i) => (
                  <span
                    key={n}
                    data-testid={`city-neighborhood-${i}`}
                    className="text-xs font-medium text-[#0077B3] border border-[#0077B3]/30 bg-[#0077B3]/10 px-3 py-1.5 rounded"
                  >
                    {n}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

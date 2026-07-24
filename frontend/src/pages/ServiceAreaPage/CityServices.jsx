import { Shield, Wifi, Clock, Building2 } from "lucide-react";
import TechMaturityTable from "../../components/TechMaturityTable";

export default function CityServices({ city }) {
  const services = [
    { icon: Shield, title: "Cybersecurity", desc: `Ransomware protection, phishing prevention, and 24/7 threat monitoring for ${city.name} businesses.` },
    { icon: Wifi, title: "Managed IT", desc: `Proactive network management, help desk, and on-site support throughout ${city.name}.` },
    { icon: Clock, title: "24/7 Support", desc: "Round-the-clock expert support with 15-minute critical response SLAs." },
    { icon: Building2, title: "Compliance", desc: `CMMC, SOC 2, HIPAA, and industry-specific compliance management for ${city.name} firms.` },
  ];

  return (
    <>
      <section data-testid="city-services" aria-label={`IT services offered in ${city.name}`} className="py-20 bg-[#0f1d32]">
        <div className="max-w-7xl mx-auto px-6">
          <h2
            className="text-2xl sm:text-3xl font-bold tracking-tight text-white mb-12 text-center"
            style={{ fontFamily: "Outfit, sans-serif" }}
          >
            What we deliver in {city.name}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((svc, i) => (
              <div key={svc.title} data-testid={`city-service-${i}`} className="grid-border-card p-6 group">
                <div className="w-10 h-10 flex items-center justify-center border border-white/10 bg-[#0f1d32] mb-4 group-hover:border-[#0077B3] transition-colors">
                  <svc.icon className="w-5 h-5 text-[#0077B3]" />
                </div>
                <h3 className="text-white font-semibold text-sm mb-2" style={{ fontFamily: "Outfit, sans-serif" }}>{svc.title}</h3>
                <p className="text-[#94a8be] text-sm leading-relaxed">{svc.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Technology Maturity comparison table (GEO) */}
      <section data-testid="city-maturity-table" aria-label={`Technology maturity levels for ${city.name} businesses`} className="py-20 bg-[#0f1d32]">
        <div className="max-w-4xl mx-auto px-6">
          <TechMaturityTable title={`Where Does Your ${city.name} Business Stand?`} />
        </div>
      </section>
    </>
  );
}

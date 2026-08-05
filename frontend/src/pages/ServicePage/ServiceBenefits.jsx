import { CheckCircle2 } from "lucide-react";

export default function ServiceBenefits({ svc }) {
  return (
    <section data-testid="service-page-benefits" className="py-20 bg-[#0f1d32]">
      <div className="max-w-7xl mx-auto px-6">
        <p className="overline text-[#0077B3] mb-4">Benefits</p>
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white mb-12" style={{ fontFamily: "Outfit" }}>
          What {svc.name} delivers for your business
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {svc.benefits.map((b, i) => (
            <div key={b.title} data-testid={`service-benefit-${i}`} className="grid-border-card p-6">
              <CheckCircle2 className="w-5 h-5 text-[#0077B3] mb-3" />
              <h3 className="text-white font-semibold text-sm mb-2" style={{ fontFamily: "Outfit" }}>{b.title}</h3>
              <p className="text-[#94a8be] text-xs leading-relaxed">{b.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

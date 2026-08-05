import { HelpCircle } from "lucide-react";

export default function HRSFAQ({ data }) {
  return (
    <section data-testid="hrs-faq" className="py-20 bg-[#0f1d32]">
      <div className="max-w-3xl mx-auto px-6">
        <p className="overline text-[#0077B3] mb-4 text-center">FAQ</p>
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white mb-10 text-center" style={{ fontFamily: "Outfit" }}>
          Common questions about Human Risk Simulation
        </h2>
        <div className="space-y-6">
          {data.faqs.map((f, i) => (
            <div key={f.q} data-testid={`hrs-faq-${i}`} className="border-b border-white/10 pb-6">
              <p className="text-white font-semibold text-base mb-2 flex items-start gap-2">
                <HelpCircle className="w-4 h-4 text-[#0077B3] mt-0.5 flex-shrink-0" /> {f.q}
              </p>
              <p className="text-[#94a8be] text-sm leading-relaxed pl-6">{f.a}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

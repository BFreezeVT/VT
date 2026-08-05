import { HelpCircle } from "lucide-react";

export default function ServiceFAQ({ svc }) {
  return (
    <section data-testid="service-page-faq" className="py-20 bg-white">
      <div className="max-w-3xl mx-auto px-6">
        <p className="overline text-[#0077B3] mb-4 text-center">FAQ</p>
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#0f1d32] mb-10 text-center" style={{ fontFamily: "Outfit" }}>
          Common questions about {svc.name}
        </h2>
        <div className="space-y-6">
          {svc.faqs.map((f, i) => (
            <div key={f.q} data-testid={`service-page-faq-${i}`} className="border-b border-[#d0dcea] pb-6">
              <p className="text-[#0f1d32] font-semibold text-base mb-2 flex items-start gap-2">
                <HelpCircle className="w-4 h-4 text-[#0077B3] mt-0.5 flex-shrink-0" /> {f.q}
              </p>
              <p className="text-[#3a5068] text-sm leading-relaxed pl-6">{f.a}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

import { CheckCircle } from "lucide-react";

export default function IndustryComplianceSoftware({ industry }) {
  return (
    <section data-testid="industry-compliance" className="py-20 bg-[#0f1d32]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <p className="overline text-[#0077B3] mb-4">Compliance Frameworks</p>
            <h2 className="text-2xl font-bold text-white mb-6" style={{ fontFamily: "Outfit" }}>
              Regulations we manage for {industry.name.toLowerCase()}
            </h2>
            <div className="space-y-3">
              {industry.compliance.map((c, i) => (
                <div key={c} data-testid={`industry-compliance-${i}`} className="flex items-center gap-3">
                  <CheckCircle className="w-4 h-4 text-[#0077B3] flex-shrink-0" />
                  <span className="text-white text-sm">{c}</span>
                </div>
              ))}
            </div>
          </div>
          <div>
            <p className="overline text-[#0077B3] mb-4">Software We Support</p>
            <h2 className="text-2xl font-bold text-white mb-6" style={{ fontFamily: "Outfit" }}>
              Tools your teams rely on daily
            </h2>
            <div className="flex flex-wrap gap-2">
              {industry.software.map((s, i) => (
                <span key={s} data-testid={`industry-software-${i}`} className="text-xs font-medium text-[#0077B3] border border-white/10 bg-[#0077B3]/5 px-3 py-1.5">
                  {s}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

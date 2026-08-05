import { XCircle } from "lucide-react";

export default function HRSCommonMistakes({ data }) {
  return (
    <section data-testid="hrs-common-mistakes" className="py-20 bg-[#0f1d32]">
      <div className="max-w-7xl mx-auto px-6">
        <p className="overline text-[#0077B3] mb-4">Common Mistakes</p>
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white mb-12" style={{ fontFamily: "Outfit" }}>
          Common mistakes users make with AI-driven threats
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {data.commonMistakes.map((m, i) => (
            <div key={m.title} data-testid={`hrs-mistake-${i}`} className="grid-border-card p-6 flex gap-4">
              <XCircle className="w-5 h-5 text-[#FF5722] mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="text-white font-semibold text-sm mb-1.5" style={{ fontFamily: "Outfit" }}>{m.title}</h3>
                <p className="text-[#94a8be] text-xs leading-relaxed">{m.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

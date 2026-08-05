import { AlertTriangle, Sparkles } from "lucide-react";

export default function HRSWhyItMatters({ data }) {
  return (
    <section data-testid="hrs-why-it-matters" className="py-20 bg-[#0f1d32]">
      <div className="max-w-4xl mx-auto px-6">
        <div className="flex items-center gap-3 mb-4">
          <AlertTriangle className="w-5 h-5 text-[#0077B3]" />
          <p className="overline text-[#0077B3]">Why It Matters</p>
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white mb-6" style={{ fontFamily: "Outfit" }}>
          {data.whyItMatters.title}
        </h2>
        <p className="text-[#94a8be] text-base leading-relaxed mb-14">{data.whyItMatters.body}</p>

        <div className="flex items-center gap-3 mb-4">
          <Sparkles className="w-5 h-5 text-[#0077B3]" />
          <p className="overline text-[#0077B3]">AI-Driven Threats</p>
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white mb-6" style={{ fontFamily: "Outfit" }}>
          {data.aiThreats.title}
        </h2>
        <p className="text-[#94a8be] text-base leading-relaxed">{data.aiThreats.body}</p>
      </div>
    </section>
  );
}

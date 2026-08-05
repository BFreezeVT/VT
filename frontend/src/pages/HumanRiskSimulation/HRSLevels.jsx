import { Target, Zap, Crown } from "lucide-react";

const iconMap = { easy: Target, medium: Zap, hard: Crown };
const colorMap = { easy: "text-[#0077B3]", medium: "text-[#FF5722]", hard: "text-[#FF5722]" };

export default function HRSLevels({ data }) {
  return (
    <section data-testid="hrs-levels" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <p className="overline text-[#0077B3] mb-4">Simulation Levels</p>
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#0f1d32] mb-12" style={{ fontFamily: "Outfit" }}>
          Three levels of realistic threat scenarios
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {data.levels.map((lvl, i) => {
            const Icon = iconMap[lvl.key];
            return (
              <div key={lvl.key} data-testid={`hrs-level-${lvl.key}`} className="border border-[#d0dcea] rounded-md p-6">
                <Icon className={`w-6 h-6 ${colorMap[lvl.key]} mb-3`} />
                <p className="text-[#0077B3] text-xs uppercase tracking-wider font-semibold mb-2">Level {i + 1}</p>
                <h3 className="text-[#0f1d32] font-bold text-lg mb-3" style={{ fontFamily: "Outfit" }}>{lvl.title}</h3>
                <p className="text-[#3a5068] text-sm leading-relaxed">{lvl.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

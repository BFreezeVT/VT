import { ShieldCheck } from "lucide-react";
import { DIFFICULTIES, BADGES } from "../../data/cyberGameData";

export default function GameIntro({ stored, difficulty, startGame }) {
  return (
    <div data-testid="game-intro">
      <div className="text-center mb-8">
        <div className="w-16 h-16 mx-auto flex items-center justify-center bg-[#0077B3]/10 border border-[#0077B3]/30 rounded-full mb-4">
          <ShieldCheck className="w-8 h-8 text-[#0077B3]" />
        </div>
        <h3 className="text-white font-bold text-xl mb-2" style={{ fontFamily: "Outfit" }}>Choose Simulation Level</h3>
        <p className="text-[#b0c4d8] text-sm max-w-md mx-auto">
          Each level presents increasingly sophisticated AI-driven threat scenarios. For every message, decide: Trust, Verify, Report, or Ignore.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        {Object.entries(DIFFICULTIES).map(([key, cfg]) => {
          const Icon = cfg.icon;
          const hs = stored.highScores[key];
          return (
            <button key={key} data-testid={`game-difficulty-${key}`} onClick={() => startGame(key)}
              className={`p-5 border text-left transition-all hover:border-[#0077B3] hover:bg-[#0077B3]/5 rounded-md ${difficulty === key ? "border-[#0077B3] bg-[#0077B3]/5" : "border-[#0d4a8a] bg-[#002a52]"}`}>
              <Icon className={`w-5 h-5 ${cfg.color} mb-3`} />
              <p className="text-white font-semibold text-sm mb-1" style={{ fontFamily: "Outfit" }}>{cfg.label}</p>
              <p className="text-[#b0c4d8] text-xs mb-2">{cfg.count} scenarios{cfg.timer > 0 ? ` / ${cfg.timer}s limit` : ""}</p>
              {hs !== undefined && <p className="text-[#0077B3] text-xs font-medium">Best: {hs}/100</p>}
            </button>
          );
        })}
      </div>

      {stored.badges.length > 0 && (
        <div className="border-t border-[#0d4a8a] pt-6">
          <p className="text-xs text-[#b0c4d8] mb-3 uppercase tracking-wider">Your Badges</p>
          <div className="flex flex-wrap gap-2">
            {BADGES.filter((b) => stored.badges.includes(b.id)).map((b) => {
              const Icon = b.icon;
              return (
                <div key={b.id} data-testid={`badge-${b.id}`} className="flex items-center gap-2 bg-[#0077B3]/10 border border-[#0077B3]/30 px-3 py-1.5 rounded" title={b.desc}>
                  <Icon className="w-3 h-3 text-[#0077B3]" /> <span className="text-xs text-[#0077B3] font-medium">{b.label}</span>
                </div>
              );
            })}
          </div>
          <p className="text-[10px] text-[#b0c4d8]/50 mt-2">{stored.gamesPlayed} simulations completed</p>
        </div>
      )}
    </div>
  );
}

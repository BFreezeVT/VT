import { Button } from "../../components/ui/button";
import { CheckCircle, XCircle, ChevronRight, Clock, Flame, Eye, AlertTriangle, ThumbsUp } from "lucide-react";
import { DIFFICULTIES } from "../../data/cyberGameData";

const ACTIONS = [
  { id: "trust", label: "Trust", icon: ThumbsUp, desc: "Act on the message" },
  { id: "verify", label: "Verify", icon: Eye, desc: "Confirm through another channel" },
  { id: "report", label: "Report", icon: AlertTriangle, desc: "Flag to security team" },
  { id: "ignore", label: "Ignore", icon: XCircle, desc: "Delete and move on" },
];

export default function GamePlaying({
  current, currentIndex, shuffledScenarios, difficulty, streak, score,
  timeLeft, answered, lastCorrect, lastAction, handleAction, nextScenario,
}) {
  const config = DIFFICULTIES[difficulty];

  return (
    <div data-testid="game-playing">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <span className="text-xs text-[#b0c4d8]">Scenario {currentIndex + 1}/{shuffledScenarios.length}</span>
          <span className={`text-xs font-medium ${config.color}`}>{config.label}</span>
        </div>
        <div className="flex items-center gap-4">
          {streak >= 2 && <span className="flex items-center gap-1 text-xs text-[#FF5722] font-semibold animate-fade-in"><Flame className="w-3 h-3" /> {streak} streak</span>}
          <span data-testid="game-score" className="text-xs text-[#0077B3] font-semibold">{Math.round(score)}/{shuffledScenarios.length}</span>
        </div>
      </div>

      <div className="relative w-full bg-[#0d4a8a]/30 h-1.5 mb-6 rounded-full">
        <div className="bg-[#0077B3] h-1.5 rounded-full transition-all duration-500" style={{ width: `${((currentIndex + 1) / shuffledScenarios.length) * 100}%` }} />
      </div>

      {config.timer > 0 && !answered && (
        <div className="flex items-center gap-2 mb-4">
          <Clock className={`w-3 h-3 ${timeLeft <= 5 ? "text-[#FF5722] animate-pulse" : "text-[#b0c4d8]"}`} />
          <div className="flex-1 bg-[#0d4a8a]/30 h-1 rounded-full">
            <div className={`h-1 rounded-full transition-all duration-1000 ${timeLeft <= 5 ? "bg-[#FF5722]" : "bg-[#0077B3]"}`} style={{ width: `${(timeLeft / config.timer) * 100}%` }} />
          </div>
          <span className={`text-xs font-mono ${timeLeft <= 5 ? "text-[#FF5722]" : "text-[#b0c4d8]"}`}>{timeLeft}s</span>
        </div>
      )}

      {/* Scenario card */}
      <div className="bg-[#0c1a2e] border border-[#0d4a8a] rounded-md p-5 sm:p-6 mb-6">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-[10px] uppercase tracking-wider text-[#0077B3] border border-[#0077B3]/30 px-2 py-0.5 rounded">{current.category}</span>
        </div>
        <div className="flex items-start gap-3 mb-3">
          <div className="w-8 h-8 flex-shrink-0 rounded-full bg-[#0d4a8a] flex items-center justify-center text-white text-xs font-bold">{current.from[0].toUpperCase()}</div>
          <div className="min-w-0">
            <p data-testid="email-from" className="text-white text-sm font-medium truncate">{current.from}</p>
            <p data-testid="email-subject" className="text-white text-base font-semibold mt-1" style={{ fontFamily: "Outfit" }}>{current.subject}</p>
          </div>
        </div>
        <div className="border-t border-[#0d4a8a] pt-4 mt-3">
          <p data-testid="email-preview" className="text-[#b0c4d8] text-sm leading-relaxed">{current.preview}</p>
        </div>
      </div>

      {/* 4 Action buttons */}
      {!answered ? (
        <div>
          <p className="text-[#b0c4d8] text-xs mb-3 text-center">How would you respond to this message?</p>
          <div className="grid grid-cols-2 gap-3">
            {ACTIONS.map((action) => (
              <button key={action.id} data-testid={`game-btn-${action.id}`} onClick={() => handleAction(action.id)}
                className="flex items-center gap-3 p-4 border border-[#0d4a8a] bg-[#002a52] rounded-md hover:border-[#0077B3] hover:bg-[#0077B3]/5 transition-all text-left">
                <action.icon className="w-5 h-5 text-[#0077B3] flex-shrink-0" />
                <div>
                  <p className="text-white text-sm font-medium">{action.label}</p>
                  <p className="text-[#b0c4d8] text-[10px]">{action.desc}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div data-testid="game-feedback">
          <div className={`flex items-start gap-3 p-4 border rounded-md mb-4 ${lastCorrect ? "border-[#0077B3]/50 bg-[#0077B3]/5" : "border-[#FF5722]/50 bg-[#FF5722]/5"}`}>
            {lastCorrect ? <CheckCircle className="w-5 h-5 text-[#0077B3] flex-shrink-0 mt-0.5" /> : <XCircle className="w-5 h-5 text-[#FF5722] flex-shrink-0 mt-0.5" />}
            <div>
              <p className={`font-semibold text-sm mb-1 ${lastCorrect ? "text-[#0077B3]" : "text-[#FF5722]"}`}>
                {lastAction === "timeout" ? "Time expired." : lastCorrect ? "Good judgment." : "Risky response."}
                {" "}This was a <span className="text-white font-bold">{current.threat ? "THREAT" : "LEGITIMATE MESSAGE"}</span>.
              </p>
              <p className="text-[#b0c4d8] text-sm leading-relaxed">{current.explanation}</p>
            </div>
          </div>
          <Button data-testid="game-next-button" onClick={nextScenario} className="w-full bg-[#0077B3] hover:bg-[#005f8f] text-white rounded-md h-11 font-semibold">
            {currentIndex + 1 >= shuffledScenarios.length ? "See Your Score" : "Next Scenario"} <ChevronRight className="w-4 h-4 ml-1" />
          </Button>
        </div>
      )}
    </div>
  );
}

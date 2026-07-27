import { useState } from "react";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Trophy, RotateCcw, CheckCircle, Flame, Share2, Send } from "lucide-react";
import axios from "axios";
import { DIFFICULTIES, BADGES } from "../../data/cyberGameData";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

export default function GameResults({
  difficulty, humanRiskScore, bestStreak, highScore, newBadges, shareResults, setGameState,
}) {
  const [gameEmailSent, setGameEmailSent] = useState(false);
  const [gameEmailError, setGameEmailError] = useState(false);
  const config = DIFFICULTIES[difficulty];

  const submitEmail = async (e) => {
    e.preventDefault();
    const fd = new FormData(e.target);
    setGameEmailError(false);
    try {
      await axios.post(`${API}/leads`, {
        company: fd.get("company") || "",
        name: fd.get("name") || "",
        email: fd.get("email"),
        phone: "",
        source_page: "human-risk-simulation",
        situation: `Human Risk Score: ${humanRiskScore}/100 (${config.label} level). Best streak: ${bestStreak}.`,
        contact_preference: fd.get("contact_preference") || "call",
      });
      setGameEmailSent(true);
    } catch (err) {
      console.error("Failed to submit Human Risk Simulation lead:", err);
      setGameEmailError(true);
    }
  };

  return (
    <div data-testid="game-results" className="text-center py-4">
      <div className="w-16 h-16 mx-auto flex items-center justify-center bg-[#0077B3]/10 border border-[#0077B3]/30 rounded-full mb-4">
        <Trophy className="w-8 h-8 text-[#0077B3]" />
      </div>
      <p className="text-xs text-[#b0c4d8] mb-1">{config.label} Level</p>
      <h3 className="text-white font-bold text-xl mb-1" style={{ fontFamily: "Outfit" }}>Your Human Risk Score</h3>
      <p data-testid="game-final-score" className="stat-number text-5xl text-white my-3">
        {humanRiskScore}<span className="text-[#0077B3]">/100</span>
      </p>

      <p className="text-[#b0c4d8] text-sm mb-2 max-w-md mx-auto">
        Your Human Risk Score reflects how your organization may respond to real-world AI-driven threats.
      </p>

      <div className="grid grid-cols-3 gap-3 my-6">
        <div className="bg-[#0c1a2e] border border-[#0d4a8a] p-3 rounded-md">
          <p className="stat-number text-xl text-white">{humanRiskScore}%</p>
          <p className="text-[10px] text-[#b0c4d8]">Accuracy</p>
        </div>
        <div className="bg-[#0c1a2e] border border-[#0d4a8a] p-3 rounded-md">
          <p className="stat-number text-xl text-white flex items-center justify-center gap-1">{bestStreak} <Flame className="w-3 h-3 text-[#FF5722]" /></p>
          <p className="text-[10px] text-[#b0c4d8]">Best Streak</p>
        </div>
        <div className="bg-[#0c1a2e] border border-[#0d4a8a] p-3 rounded-md">
          <p className="stat-number text-xl text-[#0077B3]">{highScore}/100</p>
          <p className="text-[10px] text-[#b0c4d8]">Personal Best</p>
        </div>
      </div>

      {newBadges.length > 0 && (
        <div className="mb-6 p-4 border border-[#0077B3]/30 bg-[#0077B3]/5 rounded-md">
          <p className="text-xs text-[#0077B3] font-semibold mb-2 uppercase tracking-wider">Badges Earned</p>
          <div className="flex justify-center gap-3">
            {newBadges.map((bid) => {
              const badge = BADGES.find((b) => b.id === bid);
              if (!badge) return null;
              const Icon = badge.icon;
              return (
                <div key={bid} className="flex items-center gap-1.5 bg-[#0077B3]/10 border border-[#0077B3]/30 px-3 py-1.5 rounded">
                  <Icon className="w-3 h-3 text-[#0077B3]" /> <span className="text-xs text-[#0077B3] font-medium">{badge.label}</span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      <p className="text-[#b0c4d8] text-sm mb-6">
        {humanRiskScore >= 80 ? "Strong awareness. Your team shows solid decision-making under pressure."
          : humanRiskScore >= 50 ? "Moderate exposure. Some decisions would put your organization at risk in a real scenario."
          : "High exposure. These response patterns leave your organization vulnerable to AI-driven threats."}
      </p>

      {/* Lead capture */}
      {!gameEmailSent ? (
        <form onSubmit={submitEmail} className="mb-6 p-4 border border-[#0d4a8a] rounded-md bg-[#0c1a2e]">
          <p className="text-white text-sm font-semibold mb-3 text-center">Get your results and a personalized action plan:</p>
          {gameEmailError && (
            <p data-testid="game-email-error" className="text-[#FF5722] text-xs font-medium mb-3 text-center">
              Something went wrong sending your results. Please try again, or call us at (952) 941-7333.
            </p>
          )}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mb-3">
            <Input name="name" placeholder="Your name" className="bg-[#002a52] border-[#0d4a8a] text-white placeholder:text-[#b0c4d8]/40 rounded-md h-9 text-sm" />
            <Input name="email" type="email" placeholder="Email" required className="bg-[#002a52] border-[#0d4a8a] text-white placeholder:text-[#b0c4d8]/40 rounded-md h-9 text-sm" />
            <Input name="company" placeholder="Company" className="bg-[#002a52] border-[#0d4a8a] text-white placeholder:text-[#b0c4d8]/40 rounded-md h-9 text-sm" />
          </div>
          <div className="flex items-center justify-between">
            <div className="flex gap-3">
              <label className="flex items-center gap-1.5 cursor-pointer"><input type="radio" name="contact_preference" value="call" defaultChecked className="accent-[#0077B3]" /><span className="text-[#b0c4d8] text-xs">Call me</span></label>
              <label className="flex items-center gap-1.5 cursor-pointer"><input type="radio" name="contact_preference" value="email" className="accent-[#0077B3]" /><span className="text-[#b0c4d8] text-xs">Email me</span></label>
            </div>
            <Button type="submit" className="bg-[#0077B3] hover:bg-[#005f8f] text-white rounded-md font-semibold px-4 h-9 text-sm">
              <Send className="w-3 h-3 mr-1" /> Send Results
            </Button>
          </div>
        </form>
      ) : (
        <div className="mb-6 p-4 border border-[#0077B3]/30 bg-[#0077B3]/5 rounded-md text-center">
          <CheckCircle className="w-5 h-5 text-[#0077B3] mx-auto mb-1" />
          <p className="text-[#0077B3] text-sm font-medium">Sent! We will be in touch.</p>
        </div>
      )}

      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <Button data-testid="game-restart-button" onClick={() => setGameState("intro")} className="bg-[#002a52] border border-[#0d4a8a] hover:border-[#0077B3] text-white rounded-md font-semibold px-5 h-10">
          <RotateCcw className="w-4 h-4 mr-2" /> Run Again
        </Button>
        <Button data-testid="game-share-button" onClick={shareResults} className="bg-[#002a52] border border-[#0d4a8a] hover:border-[#0077B3] text-white rounded-md font-semibold px-5 h-10">
          <Share2 className="w-4 h-4 mr-2" /> Share Score
        </Button>
        <Button data-testid="game-cta-button" onClick={() => document.getElementById("audit")?.scrollIntoView({ behavior: "smooth" })} className="bg-[#0077B3] hover:bg-[#005f8f] text-white rounded-md font-semibold px-5 h-10">
          Get Your Full Assessment
        </Button>
      </div>
    </div>
  );
}

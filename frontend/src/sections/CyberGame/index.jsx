import { useState, useCallback, useEffect, useRef } from "react";
import { scenarios, DIFFICULTIES, getStoredData, storeData, getCorrectAction } from "../../data/cyberGameData";
import GameIntro from "./GameIntro";
import GamePlaying from "./GamePlaying";
import GameResults from "./GameResults";

export default function CyberGame() {
  const [gameState, setGameState] = useState("intro");
  const [difficulty, setDifficulty] = useState("easy");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [lastCorrect, setLastCorrect] = useState(null);
  const [lastAction, setLastAction] = useState(null);
  const [shuffledScenarios, setShuffledScenarios] = useState([]);
  const [timeLeft, setTimeLeft] = useState(0);
  const [answerTime, setAnswerTime] = useState(0);
  const [stored, setStored] = useState(getStoredData());
  const [newBadges, setNewBadges] = useState([]);
  const timerRef = useRef(null);
  const questionStartRef = useRef(null);

  const config = DIFFICULTIES[difficulty];

  useEffect(() => {
    if (gameState === "playing" && config.timer > 0 && !answered) {
      setTimeLeft(config.timer);
      questionStartRef.current = Date.now();
      timerRef.current = setInterval(() => {
        setTimeLeft((t) => Math.max(0, t - 1));
      }, 1000);
      return () => clearInterval(timerRef.current);
    } else if (config.timer === 0 && gameState === "playing" && !answered) {
      questionStartRef.current = Date.now();
    }
  }, [currentIndex, gameState, answered, config.timer]);

  // Handles the moment the countdown reaches zero (kept separate from the
  // setTimeLeft updater above so side effects never run inside a state updater)
  useEffect(() => {
    if (gameState === "playing" && config.timer > 0 && !answered && timeLeft === 0) {
      clearInterval(timerRef.current);
      setLastCorrect(false);
      setLastAction("timeout");
      setStreak(0);
      setAnswered(true);
    }
  }, [timeLeft, gameState, answered, config.timer]);

  const startGame = useCallback((diff) => {
    const d = diff || difficulty;
    const cfg = DIFFICULTIES[d];
    let pool;
    if (cfg.pool === "easy") pool = scenarios.filter((s) => s.difficulty === "easy" || s.difficulty === "medium");
    else if (cfg.pool === "hard") pool = scenarios.filter((s) => s.difficulty === "medium" || s.difficulty === "hard");
    else pool = [...scenarios];
    // Fisher-Yates shuffle for unbiased randomization
    const shuffled = [...pool];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    const selected = shuffled.slice(0, cfg.count);
    setShuffledScenarios(selected);
    setDifficulty(d);
    setCurrentIndex(0);
    setScore(0);
    setStreak(0);
    setBestStreak(0);
    setAnswered(false);
    setLastCorrect(null);
    setLastAction(null);
    setNewBadges([]);
    setGameState("playing");
    if (window.gtag) window.gtag("event", "hri_start", { event_category: "human_risk_simulation", difficulty: d });
  }, [difficulty]);

  const handleAction = (actionId) => {
    if (answered) return;
    clearInterval(timerRef.current);
    const current = shuffledScenarios[currentIndex];
    const correctAction = getCorrectAction(current);
    const elapsed = questionStartRef.current ? Math.round((Date.now() - questionStartRef.current) / 1000) : 0;
    setAnswerTime(elapsed);
    setLastAction(actionId);

    // Scoring: report threat = correct, trust legit = correct, verify = partial correct for both
    let correct = false;
    if (actionId === correctAction) correct = true;
    if (actionId === "verify") correct = true; // verify is always acceptable
    if (actionId === "trust" && current.threat) correct = false;
    if (actionId === "ignore" && current.threat) correct = false; // ignoring a threat is wrong
    if (actionId === "ignore" && !current.threat) correct = false; // ignoring legit is suboptimal

    if (correct) {
      const points = actionId === "verify" ? 0.5 : 1; // verify gets partial credit
      setScore((s) => s + points);
      setStreak((s) => { const ns = s + 1; setBestStreak((b) => Math.max(b, ns)); return ns; });
    } else {
      setStreak(0);
    }
    setLastCorrect(correct);
    setAnswered(true);
  };

  const nextScenario = () => {
    if (currentIndex + 1 >= shuffledScenarios.length) {
      const data = { ...stored };
      const earned = [];
      data.gamesPlayed += 1;
      if (!data.badges.includes("first_game")) { data.badges.push("first_game"); earned.push("first_game"); }
      const finalScore = Math.round((score / shuffledScenarios.length) * 100);
      if (finalScore === 100 && !data.badges.includes("perfect")) { data.badges.push("perfect"); earned.push("perfect"); }
      if (bestStreak >= 3 && !data.badges.includes("streak_3")) { data.badges.push("streak_3"); earned.push("streak_3"); }
      if (answerTime < 5 && lastCorrect && !data.badges.includes("speed_demon")) { data.badges.push("speed_demon"); earned.push("speed_demon"); }
      if (!data.modesCompleted.includes(difficulty)) data.modesCompleted.push(difficulty);
      if (data.modesCompleted.length >= 3 && !data.badges.includes("all_modes")) { data.badges.push("all_modes"); earned.push("all_modes"); }
      if (!data.highScores[difficulty] || finalScore > data.highScores[difficulty]) data.highScores[difficulty] = finalScore;
      storeData(data);
      setStored(data);
      setNewBadges(earned);
      setGameState("result");
      if (window.gtag) window.gtag("event", "hri_complete", { event_category: "human_risk_simulation", score: finalScore, difficulty, best_streak: bestStreak });
    } else {
      setCurrentIndex((i) => i + 1);
      setAnswered(false);
      setLastCorrect(null);
      setLastAction(null);
    }
  };

  const shareResults = () => {
    const finalScore = Math.round((score / shuffledScenarios.length) * 100);
    const text = `I scored ${finalScore}/100 on the Veracity Human Risk Simulation (${config.label} mode). How would your team respond?`;
    if (navigator.share) {
      navigator.share({ title: "Human Risk Simulation", text, url: window.location.origin });
    } else {
      window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.origin)}`, "_blank");
    }
    if (window.gtag) window.gtag("event", "hri_share", { event_category: "human_risk_simulation" });
  };

  const current = shuffledScenarios[currentIndex];
  const highScore = stored.highScores[difficulty] || 0;
  const humanRiskScore = shuffledScenarios.length > 0 ? Math.round((score / shuffledScenarios.length) * 100) : 0;

  return (
    <section id="cyber-game" data-testid="cyber-game-section" className="py-12 lg:py-18 bg-transparent relative overflow-hidden">
      <img src="https://customer-assets.emergentagent.com/job_jobsite-it-secure/artifacts/yo1g9lv0_2.png" alt="" aria-hidden="true" className="absolute -left-20 top-1/2 -translate-y-1/2 w-[500px] h-[500px] object-contain opacity-[0.03] brightness-200 pointer-events-none" />
      <div className="max-w-3xl mx-auto px-6">
        <div className="text-center mb-8">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#0077B3] mb-4 animate-fade-in-up">Human Risk Simulation</p>
          <h2 data-testid="cyber-game-heading" className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-white mb-4 animate-fade-in-up stagger-1" style={{ fontFamily: "Outfit, sans-serif" }}>
            How would your team respond to real-world AI-driven threats?
          </h2>
          <p className="text-[#b0c4d8] text-base max-w-xl mx-auto animate-fade-in-up stagger-2">
            Test behavioral decision-making across realistic scenarios. Choose how to respond - your Human Risk Score reveals your organizational exposure.
          </p>
        </div>

        <div className="bg-[#001f3d] border border-[#0d4a8a] rounded-md p-6 sm:p-8 lg:p-10 animate-fade-in-up stagger-3">
          {gameState === "intro" && (
            <GameIntro stored={stored} difficulty={difficulty} startGame={startGame} />
          )}

          {gameState === "playing" && current && (
            <GamePlaying
              current={current} currentIndex={currentIndex} shuffledScenarios={shuffledScenarios}
              difficulty={difficulty} streak={streak} score={score} timeLeft={timeLeft}
              answered={answered} lastCorrect={lastCorrect} lastAction={lastAction}
              handleAction={handleAction} nextScenario={nextScenario}
            />
          )}

          {gameState === "result" && (
            <GameResults
              difficulty={difficulty} humanRiskScore={humanRiskScore} bestStreak={bestStreak}
              highScore={highScore} newBadges={newBadges} shareResults={shareResults} setGameState={setGameState}
            />
          )}
        </div>
      </div>
    </section>
  );
}

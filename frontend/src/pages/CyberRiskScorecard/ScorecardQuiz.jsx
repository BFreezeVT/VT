import { ChevronLeft as ChevronLeftIcon } from "lucide-react";
import { questions } from "../../data/cyberRiskScorecardData";

export default function ScorecardQuiz({ current, animating, answers, selectAnswer, goBack }) {
  const question = questions[current];

  return (
    <div className="py-12 lg:py-20" data-testid="scorecard-quiz">
      <div className="max-w-2xl mx-auto px-6">
        {/* Progress */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[#94a8be] text-xs">Question {current + 1} of {questions.length}</span>
            <span className="text-[#0077B3] text-xs font-semibold">{Math.round(((current + 1) / questions.length) * 100)}%</span>
          </div>
          <div className="w-full bg-white/5 h-2 rounded-full">
            <div className="bg-[#0077B3] h-2 rounded-full transition-all duration-500 ease-out" style={{ width: `${((current + 1) / questions.length) * 100}%` }} />
          </div>
        </div>

        {/* Question */}
        <div className={`transition-all duration-300 ${animating ? "opacity-0 translate-y-4" : "opacity-100 translate-y-0"}`}>
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-8" style={{ fontFamily: "Outfit" }}>
            {question.text}
          </h2>

          <div className="space-y-4">
            {question.options.map((opt, i) => (
              <button
                key={i}
                data-testid={`answer-${i}`}
                onClick={() => selectAnswer(opt.points)}
                className={`w-full text-left p-5 rounded-md border transition-all duration-200 hover:border-[#0077B3] hover:bg-[#0077B3]/5 ${
                  answers[question.id] === opt.points
                    ? "border-[#0077B3] bg-[#0077B3]/10"
                    : "border-white/10 bg-white/[0.02]"
                }`}
              >
                <span className="text-white font-medium">{opt.text}</span>
              </button>
            ))}
          </div>

          {current > 0 && (
            <button onClick={goBack} className="flex items-center gap-1 text-[#94a8be] hover:text-white text-sm mt-6 transition-colors">
              <ChevronLeftIcon className="w-4 h-4" /> Previous question
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

import { Link } from "react-router-dom";
import { HelpCircle, ArrowRight } from "lucide-react";
import { answerBoxes } from "./businessTechAssessmentData";

export default function BTAAnswerBoxes() {
  return (
    <section data-testid="bta-answer-boxes" className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-6">
        <p className="overline text-[#0077B3] mb-4 text-center">Direct Answers</p>
        <h2 className="text-2xl sm:text-3xl font-bold text-[#0f1d32] mb-12 text-center" style={{ fontFamily: "Outfit" }}>
          Questions AI search engines ask about technology assessments
        </h2>
        <div className="space-y-8">
          {answerBoxes.map((a, i) => (
            <div key={a.q} data-testid={`bta-answer-${i}`} className="border-l-4 border-[#0077B3] pl-6">
              <p className="text-[#0f1d32] font-bold text-lg mb-2 flex items-start gap-2" style={{ fontFamily: "Outfit" }}>
                <HelpCircle className="w-4 h-4 text-[#0077B3] mt-1.5 flex-shrink-0" /> {a.q}
              </p>
              <p className="text-[#3a5068] text-base leading-relaxed pl-6">{a.a}</p>
              {a.link && (
                <Link to={a.link} className="inline-flex items-center gap-1 text-[#0077B3] text-sm font-medium mt-2 pl-6 hover:text-[#0f1d32] transition-colors">
                  {a.linkText} <ArrowRight className="w-3 h-3" />
                </Link>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

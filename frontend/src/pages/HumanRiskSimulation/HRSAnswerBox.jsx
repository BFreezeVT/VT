export default function HRSAnswerBox({ data }) {
  return (
    <section data-testid="hrs-answer-box" className="py-16 bg-white">
      <div className="max-w-4xl mx-auto px-6">
        <div className="border-l-4 border-[#0077B3] pl-6">
          <p className="overline text-[#0077B3] mb-3">{data.answerBoxQ}</p>
          <p data-testid="hrs-answer-text" className="text-[#1a3050] text-lg leading-relaxed font-medium">{data.answerBoxA}</p>
        </div>
      </div>
    </section>
  );
}

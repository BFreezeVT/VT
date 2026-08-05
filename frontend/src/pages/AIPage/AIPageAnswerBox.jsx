export default function AIPageAnswerBox({ page }) {
  return (
    <section data-testid="ai-page-answer-box" className="py-16 bg-white">
      <div className="max-w-4xl mx-auto px-6">
        <div className="border-l-4 border-[#0077B3] pl-6">
          <p className="overline text-[#0077B3] mb-3">{page.answerBoxQ}</p>
          <p data-testid="ai-page-answer-text" className="text-[#1a3050] text-lg leading-relaxed font-medium">{page.answerBoxA}</p>
        </div>
        <p className="text-[#3a5068] text-base leading-relaxed mt-8">{page.description}</p>
      </div>
    </section>
  );
}

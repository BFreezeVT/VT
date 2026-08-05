export default function ServiceAnswerBox({ svc }) {
  return (
    <section data-testid="service-page-answer-box" className="py-16 bg-white">
      <div className="max-w-4xl mx-auto px-6">
        <div className="border-l-4 border-[#0077B3] pl-6">
          <p className="overline text-[#0077B3] mb-3">{svc.answerBoxQ}</p>
          <p data-testid="service-page-answer-text" className="text-[#1a3050] text-lg leading-relaxed font-medium">{svc.answerBoxA}</p>
        </div>
        <p className="text-[#3a5068] text-base leading-relaxed mt-8">{svc.description}</p>
      </div>
    </section>
  );
}

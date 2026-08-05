export default function IndustryDeepDive({ industry }) {
  return (
    <section data-testid="industry-deep-dive" aria-label={`${industry.name} technical deep dive`} className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <p className="overline text-[#0077B3] mb-4">Technical Deep Dive</p>
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#0f1d32] mb-12" style={{ fontFamily: "Outfit" }}>
          How we secure {industry.name.toLowerCase()} environments, in detail
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {industry.deepDive.map((d, i) => (
            <div key={d.title} data-testid={`industry-deep-dive-${i}`}>
              <h3 className="text-[#0f1d32] font-bold text-lg mb-3" style={{ fontFamily: "Outfit" }}>{d.title}</h3>
              <p className="text-[#3a5068] text-sm leading-relaxed">{d.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function IndustryChallenges({ industry }) {
  return (
    <section data-testid="industry-challenges" aria-label={`${industry.name} cybersecurity challenges`} className="py-20 bg-[#0f1d32]">
      <div className="max-w-7xl mx-auto px-6">
        <p className="overline text-[#FF5722] mb-4">The Challenges</p>
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white mb-12" style={{ fontFamily: "Outfit" }}>
          What keeps {industry.name.toLowerCase()} leaders up at night
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {industry.challenges.map((ch, i) => (
            <div key={ch.title} data-testid={`industry-challenge-${i}`} className="grid-border-card p-6 group">
              <h3 className="text-white font-semibold text-base mb-3" style={{ fontFamily: "Outfit" }}>{ch.title}</h3>
              <p className="text-[#94a8be] text-sm leading-relaxed">{ch.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

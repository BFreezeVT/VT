export default function ProudPartners() {
  const partners = [
    "Microsoft",
    "Cisco",
    "Datto",
    "SentinelOne",
    "Fortinet",
    "ConnectWise",
    "Sophos",
  ];

  return (
    <section data-testid="proud-partners-section" className="py-12 bg-[#0f1d32] border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6">
        <p className="text-center text-[#94a8be] text-xs uppercase tracking-[0.2em] mb-8">Proud to Partner With</p>
        <div className="flex flex-wrap items-center justify-center gap-8">
          {partners.map((p) => (
            <span
              key={p}
              className="text-white/30 text-lg font-bold tracking-wide hover:text-white/60 transition-colors"
              style={{ fontFamily: "Outfit" }}
            >
              {p}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

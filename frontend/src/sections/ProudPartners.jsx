export default function ProudPartners() {
  const partners = [
    { name: "Microsoft", url: "https://www.microsoft.com" },
    { name: "Cisco", url: "https://www.cisco.com" },
    { name: "Datto", url: "https://www.datto.com" },
    { name: "SentinelOne", url: "https://www.sentinelone.com" },
    { name: "Fortinet", url: "https://www.fortinet.com" },
    { name: "ConnectWise", url: "https://www.connectwise.com" },
    { name: "Sophos", url: "https://www.sophos.com" },
  ];

  return (
    <section data-testid="proud-partners-section" className="py-10 bg-[#091428]">
      <div className="max-w-7xl mx-auto px-6">
        <p className="text-center text-[#94a8be] text-xs uppercase tracking-[0.2em] mb-6">Proud to Partner With</p>
        <div className="flex flex-wrap items-center justify-center gap-8">
          {partners.map((p) => (
            <a
              key={p.name}
              href={p.url}
              target="_blank"
              rel="noopener noreferrer"
              data-testid={`partner-${p.name.toLowerCase()}`}
              className="text-white/30 text-lg font-bold tracking-wide hover:text-[#0077B3] transition-colors"
              style={{ fontFamily: "Outfit" }}
            >
              {p.name}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function AIPageFramework({ page }) {
  return (
    <section data-testid="ai-page-framework" className="py-20 bg-[#0f1d32]">
      <div className="max-w-7xl mx-auto px-6">
        <p className="overline text-[#0077B3] mb-4">Framework</p>
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white mb-12" style={{ fontFamily: "Outfit" }}>
          {page.frameworkTitle}
        </h2>
        <div className={`grid grid-cols-1 sm:grid-cols-2 ${page.frameworkItems.length > 4 ? "lg:grid-cols-5" : "lg:grid-cols-4"} gap-6`}>
          {page.frameworkItems.map((item, i) => (
            <div key={item.title} data-testid={`ai-framework-item-${i}`} className="grid-border-card p-6">
              <div className="flex items-center gap-2 mb-3">
                <span className="stat-number text-lg text-[#0077B3]">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="text-white font-semibold text-sm" style={{ fontFamily: "Outfit" }}>{item.title}</h3>
              </div>
              <p className="text-[#94a8be] text-xs leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

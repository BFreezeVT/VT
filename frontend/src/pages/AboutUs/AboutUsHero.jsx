import Breadcrumbs from "../../components/Breadcrumbs";

export default function AboutUsHero() {
  return (
    <section data-testid="about-us-hero" className="py-24 lg:py-28">
      <div className="max-w-5xl mx-auto px-6 text-center">
        <div className="flex justify-center">
          <Breadcrumbs items={[{ label: "About Us" }]} />
        </div>
        <p className="overline text-[#0077B3] mb-4">About Veracity Technologies</p>
        <h1 data-testid="about-us-headline" className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-none text-white mb-6" style={{ fontFamily: "Outfit" }}>
          The IT Partner Twin Cities Businesses Have Trusted Since 1989
        </h1>
        <p className="text-base md:text-lg text-[#94a8be] leading-relaxed mb-10 max-w-2xl mx-auto">
          Veracity Technologies is a SOC 2 certified Managed Service Provider in Minnetonka, Minnesota. For more than 35 years, we have helped small and midsize businesses in financial services, construction, manufacturing, and high-compliance industries keep their technology secure, compliant, and running, so they can focus on growth and serving their clients.
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-0 border-t border-white/10 pt-8 max-w-2xl mx-auto">
          <div data-testid="about-us-metric-0" className="text-center px-4">
            <p className="stat-number text-4xl text-white">35+</p>
            <p className="text-xs text-[#94a8be] mt-1">Years in Business</p>
          </div>
          <div data-testid="about-us-metric-1" className="text-center px-4 border-l border-white/10">
            <p className="stat-number text-4xl text-white">98%</p>
            <p className="text-xs text-[#94a8be] mt-1">Client Retention Rate</p>
          </div>
          <div data-testid="about-us-metric-2" className="text-center px-4 border-l border-white/10">
            <p className="stat-number text-4xl text-[#0077B3]">5.0</p>
            <p className="text-xs text-[#94a8be] mt-1">Stars on Clutch</p>
          </div>
          <div data-testid="about-us-metric-3" className="text-center px-4 border-l border-white/10">
            <p className="stat-number text-4xl text-white">24/7</p>
            <p className="text-xs text-[#94a8be] mt-1">Monitoring and Support</p>
          </div>
        </div>
      </div>
    </section>
  );
}

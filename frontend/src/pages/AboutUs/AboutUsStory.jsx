export default function AboutUsStory() {
  return (
    <section data-testid="about-us-story" className="py-20 bg-[#0a1628]">
      <div className="max-w-4xl mx-auto px-6">
        <p className="overline text-[#0077B3] mb-4">Our Story</p>
        <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6" style={{ fontFamily: "Outfit" }}>
          From Break-Fix to a Proactive Partner
        </h2>
        <div className="space-y-5 text-base text-[#94a8be] leading-relaxed">
          <p>
            Veracity Technologies began in the 1980s as Tech-Com, a break-fix IT company focused on solving technology problems quickly and reliably. As technology advanced, we recognized that businesses needed more than reactive support. They needed proactive management that prevents problems before they disrupt operations.
          </p>
          <p>
            Founded in 1989 and based in Minnetonka, Minnesota, we evolved into Veracity Technologies, a SOC 2 certified Managed Service Provider dedicated to keeping clients secure, compliant, and productive through modern, tailored IT solutions and long-term partnerships. We chose the name Veracity because technology-dependent businesses require precision, accuracy, and truth from their IT partner in order to get high-performing technology, access, integration, and return on investment.
          </p>
          <p>
            Today, we serve small and midsize businesses across the Twin Cities metro and beyond, with deep expertise in financial services, construction, manufacturing, and other high-compliance industries. Our long-term partnerships and 98% retention rate reflect a simple commitment: keep technology reliable, secure, and ready for growth, so our clients can focus on their business.
          </p>
        </div>
      </div>
    </section>
  );
}

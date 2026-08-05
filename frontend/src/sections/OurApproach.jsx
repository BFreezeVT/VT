import { Monitor, ShieldCheck, Layers, Headphones } from "lucide-react";

const CLIENT_SUCCESS_IMG = "https://customer-assets-agu9un31.emergentagent.net/job_a66d851c-ab3d-4669-9a37-bc99f9119744/artifacts/zce5q1xq_Designer%20%2827%29.png";

const approaches = [
  { icon: Monitor, title: "24/7 Managed IT Monitoring", desc: "AI-powered monitoring across your entire environment. We detect and resolve issues before they impact your productivity or operations." },
  { icon: ShieldCheck, title: "Cybersecurity & Access Controls", desc: "Multi-factor authentication, zero-trust architecture, endpoint protection, and automated threat response. Layered security that adapts in real time." },
  { icon: Layers, title: "System Integration & Automation", desc: "We connect your tools - Procore, Sage, Bloomberg, SAP, and more - into a unified, automated ecosystem that reduces friction and manual work." },
  { icon: Headphones, title: "Expert Support, Faster Response", desc: "When automation handles the routine, our experts are free for what matters. 15-minute SLA for critical issues. Real people who know your industry." },
];

export default function OurApproach() {
  return (
    <section id="approach" data-testid="approach-section" aria-label="How Veracity delivers operational intelligence" className="py-12 lg:py-18 bg-transparent relative overflow-hidden">
      <img src="https://customer-assets.emergentagent.com/job_jobsite-it-secure/artifacts/yo1g9lv0_2.png" alt="" aria-hidden="true" className="absolute -right-24 -bottom-20 w-[550px] h-[550px] object-contain opacity-[0.035] brightness-200 pointer-events-none" />
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="relative flex items-center justify-center mb-8"><div className="absolute inset-0 flex items-center"><div className="w-full border-t border-white/15"></div></div><span className="relative bg-[#0f1d32]/80 backdrop-blur-sm px-8 py-1.5 rounded text-[#5cc0e8] text-xl font-extrabold uppercase tracking-[0.15em]">How We Deliver</span></div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left - content */}
          <div>
            <h2 data-testid="approach-heading" className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white mb-6 animate-fade-in-up stagger-1" style={{ fontFamily: "Outfit, sans-serif" }}>
              Managed IT that prevents problems instead of chasing them.
            </h2>
            <p className="text-[#dce6f0] text-base leading-relaxed mb-8 animate-fade-in-up stagger-2">
              Traditional providers react when things break. We build proactive systems that monitor, detect, and resolve issues automatically - so your team focuses on the business, not the technology.
            </p>

            {/* Open list - no boxes */}
            <div className="space-y-8">
              {approaches.map((a, i) => (
                <div key={a.title} data-testid={`approach-card-${i}`} className={`flex items-start gap-5 animate-fade-in-up stagger-${i + 3}`}>
                  <div className="w-11 h-11 flex-shrink-0 flex items-center justify-center border border-[#90a4b8] bg-white mt-0.5">
                    <a.icon className="w-5 h-5 text-[#0077B3]" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold text-base mb-1.5" style={{ fontFamily: "Outfit" }}>{a.title}</h3>
                    <p className="text-[#dce6f0] text-sm leading-relaxed">{a.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right - Client Success infographic (wide 3:2 image with its own baked-in captions) */}
          <div className="animate-fade-in-up stagger-2 lg:sticky lg:top-24">
            <div className="relative overflow-hidden border border-[#90a4b8] bg-[#0f1d32]">
              <img data-testid="client-success-image" src={CLIENT_SUCCESS_IMG} alt="Veracity Technologies client success overview: partnership, measurable business impact, and scalable growth, with testimonials from a VP of Operations, CFO, and CEO" className="w-full h-auto object-contain" loading="lazy" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

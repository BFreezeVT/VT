import { Wrench, Radar, Rocket, ShieldCheck, Compass, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

const SERVICES = [
  {
    icon: Wrench,
    title: "Reactive Services",
    body: "Fast, expert help when something breaks. Our helpdesk resolves issues in minutes, not hours, so your team stays productive.",
  },
  {
    icon: Radar,
    title: "Proactive Technology Management",
    body: "24/7 monitoring, patching, and maintenance that catch problems before they become downtime.",
  },
  {
    icon: Rocket,
    title: "Technology Implementation",
    body: "Planned rollouts of new systems, migrations, and upgrades, delivered on schedule with minimal disruption.",
  },
  {
    icon: ShieldCheck,
    title: "Security, Continuity, and Infrastructure Services",
    body: "Cybersecurity, backup, and disaster recovery that protect your business and keep it running through anything.",
  },
  {
    icon: Compass,
    title: "Strategic Technology and vCIO Services",
    body: "A virtual CIO who aligns your technology with your business goals, plans your roadmap, and guides major decisions.",
  },
  {
    icon: Sparkles,
    title: "AI as a Service",
    body: "Practical AI that saves your team time, from readiness assessments to governed adoption and automation.",
  },
];

export default function AboutUsServices() {
  return (
    <section data-testid="about-us-services" className="py-20 bg-[#0a1628]">
      <div className="max-w-6xl mx-auto px-6">
        <p className="overline text-[#0077B3] mb-4 text-center">What We Do</p>
        <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4 text-center" style={{ fontFamily: "Outfit" }}>
          Six Service Areas, One Accountable Partner
        </h2>
        <p className="text-base text-[#94a8be] leading-relaxed mb-12 max-w-2xl mx-auto text-center">
          One team covers everything your business technology needs, from the helpdesk call to the boardroom strategy.
        </p>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES.map((service) => (
            <div key={service.title} data-testid="about-us-service" className="bg-[#0f1d32] border border-white/10 rounded-sm p-6">
              <service.icon className="w-8 h-8 text-[#0077B3] mb-4" />
              <h3 className="text-lg font-bold text-white mb-2" style={{ fontFamily: "Outfit" }}>{service.title}</h3>
              <p className="text-sm text-[#94a8be] leading-relaxed">{service.body}</p>
            </div>
          ))}
        </div>
        <p className="text-center mt-10">
          <Link to="/services/managed-it-services" className="text-[#0077B3] hover:text-[#00a0e4] text-sm font-semibold transition-colors">
            Explore our services
          </Link>
        </p>
      </div>
    </section>
  );
}

import { ShieldCheck, Clock, HeartHandshake, GraduationCap, Award, Building2 } from "lucide-react";

const REASONS = [
  {
    icon: ShieldCheck,
    title: "SOC 2 Certified Security",
    body: "Veracity is a SOC 2 certified Managed Service Provider, which means our security controls are independently audited. Your data, your clients, and your compliance obligations are protected by enterprise-grade controls, not promises.",
  },
  {
    icon: Building2,
    title: "Built for High-Compliance Industries",
    body: "We specialize in financial services, construction, manufacturing, and other high-compliance industries in the Minneapolis-St. Paul area. We understand regulatory requirements, audit preparation, and the cost of getting compliance wrong.",
  },
  {
    icon: Clock,
    title: "Fast Response, 24/7 Monitoring",
    body: "When you call our dedicated helpdesk, we guarantee service within 7 minutes or less. Around-the-clock monitoring identifies and resolves issues before they disrupt your operations, so small problems never become downtime.",
  },
  {
    icon: HeartHandshake,
    title: "Long-Term Partnerships, Not Transactions",
    body: "Our 98% client retention rate is the result of long-term relationships. We work closely with each client, learn their environment, and invest in their success. Many of our clients have partnered with us for a decade or more.",
  },
  {
    icon: GraduationCap,
    title: "Expert Training and Support",
    body: "We offer comprehensive training and continuous support to keep your team productive. Our technicians understand your systems and your people, and they explain solutions in plain language, not jargon.",
  },
  {
    icon: Award,
    title: "Proven Expertise, Recognized Nationally",
    body: "With more than 35 years in business, Veracity has been named an MSP 501 Award recipient for eight consecutive years, a CRN Tech Elite 250 and CRN Security 100 provider, and a Channel Futures Top 501 Managed Services Provider.",
  },
];

export default function AboutUsWhyChoose() {
  return (
    <section data-testid="about-us-why-choose" className="py-20 bg-[#0f1d32]">
      <div className="max-w-6xl mx-auto px-6">
        <p className="overline text-[#0077B3] mb-4 text-center">Why Choose Veracity Technologies</p>
        <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4 text-center" style={{ fontFamily: "Outfit" }}>
          What Makes Veracity Different from Other MSPs
        </h2>
        <p className="text-base text-[#94a8be] leading-relaxed mb-12 max-w-2xl mx-auto text-center">
          Choosing an IT partner is a decision about trust. Here is what Twin Cities businesses get when they choose Veracity.
        </p>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {REASONS.map((reason) => (
            <div key={reason.title} data-testid="about-us-reason" className="bg-[#0a1628] border border-white/10 rounded-sm p-6">
              <reason.icon className="w-8 h-8 text-[#0077B3] mb-4" />
              <h3 className="text-lg font-bold text-white mb-2" style={{ fontFamily: "Outfit" }}>{reason.title}</h3>
              <p className="text-sm text-[#94a8be] leading-relaxed">{reason.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

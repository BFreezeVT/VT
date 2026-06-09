import { Heart, Clock, ShieldCheck, Users } from "lucide-react";

const stats = [
  { icon: Heart, value: "98%", label: "Client Retention Rate", color: "text-[#10b981]" },
  { icon: Clock, value: "<5 min", label: "Average Response Time", color: "text-[#0077B3]" },
  { icon: Users, value: "100+", label: "Years of Combined Experience", color: "text-[#0077B3]" },
  { icon: ShieldCheck, value: "24/7", label: "AI-Powered Monitoring", color: "text-[#0077B3]" },
];

export default function TrustStats() {
  return (
    <section data-testid="trust-stats-section" className="py-12 bg-[#0b1626] relative blend-top-dark blend-bottom-dark">
      <div className="max-w-5xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((s, i) => (
            <div key={i} className="text-center">
              <s.icon className={`w-5 h-5 ${s.color} mx-auto mb-2`} />
              <p className="stat-number text-3xl sm:text-4xl text-white mb-1">{s.value}</p>
              <p className="text-[#94a8be] text-xs">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

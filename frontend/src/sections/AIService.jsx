import { Brain, ShieldCheck, Bot, Sparkles, Lock, Eye, ExternalLink } from "lucide-react";

const aiServices = [
  { icon: Brain, title: "AI Strategy & Integration", desc: "Adopt AI tools — copilots, chatbots, predictive analytics — securely and in compliance with your industry's regulations." },
  { icon: ShieldCheck, title: "AI Security & Governance", desc: "Protect models, training data, and pipelines from prompt injection, data poisoning, and unauthorized access." },
  { icon: Bot, title: "AI-Powered Threat Detection", desc: "ML models detect anomalies, flag credential abuse, and stop ransomware before execution — 24/7, in real time." },
  { icon: Eye, title: "Shadow AI Monitoring", desc: "Discover, assess, and govern unsanctioned AI tools employees are already using across your organization." },
  { icon: Lock, title: "Data Loss Prevention for AI", desc: "Prevent sensitive data — client records, financials, trade secrets — from leaking into public LLMs." },
  { icon: Sparkles, title: "AI Readiness Assessments", desc: "Evaluate infrastructure, data hygiene, and compliance posture to build an AI adoption roadmap for your industry." },
];

export default function AIService() {
  return (
    <section id="ai-service" data-testid="ai-service-section" aria-label="AI as a Service offerings" className="py-24 lg:py-32 bg-[#f8fafc] relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, #0077B3 1px, transparent 0)", backgroundSize: "40px 40px" }} />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="max-w-3xl mb-16">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 flex items-center justify-center bg-[#0077B3]/10 border border-[#0077B3]/30">
              <Brain className="w-5 h-5 text-[#0077B3]" />
            </div>
            <p className="overline text-[#0077B3]">AI as a Service</p>
          </div>
          <h2 data-testid="ai-service-heading" className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[#003B71] mb-6" style={{ fontFamily: "Outfit, sans-serif" }}>
            AI is transforming your industry. We make sure it doesn&rsquo;t expose you.
          </h2>
          <p className="text-[#64748b] text-base leading-relaxed mb-6">
            Every organization is racing to adopt AI. But without proper security, governance, and compliance frameworks, AI becomes your biggest attack surface. We help you move fast and stay protected.
          </p>
          <div className="flex items-center gap-6">
            <div>
              <p className="stat-number text-3xl sm:text-4xl text-[#003B71]">90<span className="text-[#FF5722]">%</span></p>
              <p className="text-xs text-[#64748b] mt-1">unprepared for AI-augmented threats</p>
            </div>
            <div className="w-px h-12 bg-[#1e6bb8]/50" />
            <div>
              <p className="stat-number text-3xl sm:text-4xl text-[#003B71]">68<span className="text-[#0077B3]">%</span></p>
              <p className="text-xs text-[#64748b] mt-1">of employees use unauthorized AI tools</p>
            </div>
          </div>
          <a href="https://newsroom.accenture.com/news/2025/only-one-in-10-organizations-globally-are-ready-to-protect-against-ai-augmented-cyber-threats" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-[#0077B3] text-[10px] mt-3 hover:text-[#003B71] transition-colors">
            Sources: Accenture 2025, Second Talent 2025 <ExternalLink className="w-2.5 h-2.5" />
          </a>
        </div>

        {/* Services — alternating open layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-10 border-t border-[#e2e8f0]/50 pt-12">
          {aiServices.map((svc, i) => (
            <div key={svc.title} data-testid={`ai-card-${i}`} className={`animate-fade-in-up stagger-${(i % 6) + 1}`}>
              <svc.icon className="w-5 h-5 text-[#0077B3] mb-3" />
              <h3 className="text-[#003B71] font-semibold text-base mb-2" style={{ fontFamily: "Outfit, sans-serif" }}>{svc.title}</h3>
              <p className="text-[#64748b] text-sm leading-relaxed">{svc.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

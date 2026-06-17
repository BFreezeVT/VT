import { Brain, ShieldCheck, Bot, Sparkles, Lock, Eye, ExternalLink } from "lucide-react";

const aiServices = [
  { icon: Brain, title: "AI Strategy & Integration", desc: "Adopt AI tools - copilots, chatbots, predictive analytics - securely and in compliance with your industry's regulations." },
  { icon: ShieldCheck, title: "AI Security & Governance", desc: "Protect models, training data, and pipelines from prompt injection, data poisoning, and unauthorized access." },
  { icon: Bot, title: "AI-Powered Threat Detection", desc: "ML models detect anomalies, flag credential abuse, and stop ransomware before execution - 24/7, in real time." },
  { icon: Eye, title: "Shadow AI Monitoring", desc: "Discover, assess, and govern unsanctioned AI tools employees are already using across your organization." },
  { icon: Lock, title: "Data Loss Prevention for AI", desc: "Prevent sensitive data - client records, financials, trade secrets - from leaking into public LLMs." },
  { icon: Sparkles, title: "AI Readiness Assessments", desc: "Evaluate infrastructure, data hygiene, and compliance posture to build an AI adoption roadmap for your industry." },
];

export default function AIService() {
  return (
    <section id="ai-service" data-testid="ai-service-section" aria-label="AI as a Service offerings" className="py-16 lg:py-24 bg-gradient-to-b from-[#dce6f0] to-[#c8d6e5] relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, #0077B3 1px, transparent 0)", backgroundSize: "40px 40px" }} />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="relative flex items-center justify-center mb-8"><div className="absolute inset-0 flex items-center"><div className="w-full border-t-2 border-[#a0b4c8]"></div></div><span className="relative bg-gradient-to-b from-[#dce6f0] to-[#c8d6e5] px-6 text-[#0077B3] text-xl font-bold uppercase tracking-[0.15em]">AI as a Service</span></div>
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-10">
          <h2 data-testid="ai-service-heading" className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#0f1d32] mb-6" style={{ fontFamily: "Outfit, sans-serif" }}>
            AI is transforming your industry. We make sure it doesn&rsquo;t expose you.
          </h2>
          <p className="text-[#1a3050] text-base leading-relaxed mb-6">
            Every organization is racing to adopt AI. But without proper security, governance, and compliance frameworks, AI becomes your biggest attack surface. We help you move fast and stay protected.
          </p>
          <div className="flex items-center justify-center gap-8">
            <div>
              <p className="stat-number text-4xl sm:text-5xl text-[#0f1d32]">90<span className="text-[#FF5722]">%</span></p>
              <p className="text-xs text-[#1a3050] mt-1">unprepared for AI-augmented threats</p>
            </div>
            <div className="w-px h-14 bg-[#0077B3]/30" />
            <div>
              <p className="stat-number text-4xl sm:text-5xl text-[#0f1d32]">68<span className="text-[#0077B3]">%</span></p>
              <p className="text-xs text-[#1a3050] mt-1">of employees use unauthorized AI tools</p>
            </div>
          </div>
          <a href="https://newsroom.accenture.com/news/2025/only-one-in-10-organizations-globally-are-ready-to-protect-against-ai-augmented-cyber-threats" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-[#0077B3] text-[10px] mt-3 hover:text-[#0f1d32] transition-colors">
            Sources: Accenture 2025, Second Talent 2025 <ExternalLink className="w-2.5 h-2.5" />
          </a>
        </div>

        {/* Services - alternating open layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-10 border-t border-[#a0b4c8]/50 pt-12">
          {aiServices.map((svc, i) => (
            <div key={svc.title} data-testid={`ai-card-${i}`} className={`animate-fade-in-up stagger-${(i % 6) + 1}`}>
              <svc.icon className="w-5 h-5 text-[#0077B3] mb-3" />
              <h3 className="text-[#0f1d32] font-semibold text-base mb-2" style={{ fontFamily: "Outfit, sans-serif" }}>{svc.title}</h3>
              <p className="text-[#1a3050] text-sm leading-relaxed">{svc.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

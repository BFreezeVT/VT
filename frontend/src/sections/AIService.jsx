import { Brain, ShieldCheck, Bot, Sparkles, Lock, Eye } from "lucide-react";

const aiServices = [
  {
    icon: Brain,
    title: "AI Strategy & Integration",
    desc: "We help you adopt AI tools — from copilots and chatbots to predictive analytics — securely and in compliance with your industry's regulations.",
  },
  {
    icon: ShieldCheck,
    title: "AI Security & Governance",
    desc: "Protect your models, training data, and AI pipelines from prompt injection, data poisoning, and unauthorized access with purpose-built guardrails.",
  },
  {
    icon: Bot,
    title: "AI-Powered Threat Detection",
    desc: "Our SOC uses machine-learning models to detect anomalies, flag credential abuse, and stop ransomware before it executes — 24/7, in real time.",
  },
  {
    icon: Eye,
    title: "Shadow AI Monitoring",
    desc: "Employees are already using AI tools you don't know about. We discover, assess, and govern unsanctioned AI usage across your organization.",
  },
  {
    icon: Lock,
    title: "Data Loss Prevention for AI",
    desc: "Prevent sensitive data — client records, financials, trade secrets — from leaking into public LLMs and third-party AI services.",
  },
  {
    icon: Sparkles,
    title: "AI Readiness Assessments",
    desc: "Not sure where to start? We evaluate your infrastructure, data hygiene, and compliance posture to build an AI adoption roadmap tailored to your industry.",
  },
];

export default function AIService() {
  return (
    <section
      id="ai-service"
      data-testid="ai-service-section"
      aria-label="AI as a Service offerings including AI security, governance, and threat detection"
      className="py-24 lg:py-32 bg-[#020812] relative overflow-hidden"
    >
      {/* Subtle animated grid background */}
      <div className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, #0077B3 1px, transparent 0)`,
          backgroundSize: '40px 40px',
        }}
      />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-16">
          {/* Left header - sticky */}
          <div className="lg:col-span-2">
            <div className="lg:sticky lg:top-24">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 flex items-center justify-center bg-[#0077B3]/10 border border-[#0077B3]/30">
                  <Brain className="w-5 h-5 text-[#0077B3]" />
                </div>
                <p className="overline text-[#0077B3]">AI as a Service</p>
              </div>
              <h2
                data-testid="ai-service-heading"
                className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-white mb-6"
                style={{ fontFamily: "Outfit, sans-serif" }}
              >
                AI is transforming your industry. We make sure it doesn&rsquo;t expose you.
              </h2>
              <p className="text-[#A0B6CD] text-base leading-relaxed mb-8">
                Every organization is racing to adopt AI. But without proper security, governance, 
                and compliance frameworks, AI becomes your biggest attack surface. We help you 
                move fast and stay protected.
              </p>
              <div className="grid-border-card p-5 inline-block">
                <p className="stat-number text-3xl sm:text-4xl text-white mb-1">
                  78<span className="text-[#FF5722]">%</span>
                </p>
                <p className="text-xs text-[#A0B6CD]">of organizations have no AI security policy in place</p>
              </div>
            </div>
          </div>

          {/* Right - service cards */}
          <div className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-2 gap-5">
            {aiServices.map((svc, i) => (
              <div
                key={svc.title}
                data-testid={`ai-card-${i}`}
                className={`grid-border-card p-6 group animate-fade-in-up stagger-${(i % 6) + 1}`}
              >
                <div className="w-10 h-10 flex items-center justify-center border border-[#003B71] bg-[#020812] mb-4 group-hover:border-[#0077B3] transition-colors">
                  <svc.icon className="w-5 h-5 text-[#0077B3]" />
                </div>
                <h3
                  className="text-white font-semibold text-sm mb-2"
                  style={{ fontFamily: "Outfit, sans-serif" }}
                >
                  {svc.title}
                </h3>
                <p className="text-[#A0B6CD] text-sm leading-relaxed">{svc.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

import { ChevronDown } from "lucide-react";

const faqCategories = [
  {
    category: "Getting Started",
    items: [
      {
        q: "Will the assessment disrupt our operations?",
        a: "No. The assessment is non-invasive. We work around your schedule using passive tools that don\u2019t interfere with your systems or workflows.",
      },
      {
        q: "How long does it take?",
        a: "The online assessment takes under 3 minutes. A full operational review takes 3-5 business days. You receive a detailed report within one week.",
      },
      {
        q: "Is our data kept confidential?",
        a: "Yes. NDAs signed before any engagement. Data handling follows ISO 27001 protocols. Your records, IP, and infrastructure details stay private.",
      },
      {
        q: "How is pricing structured?",
        a: "Customized based on your organization\u2019s size, industry, compliance requirements, and complexity. We offer a free AI Business Intelligence Assessment with no obligation. Call (952) 941-7333 to start a conversation.",
      },
      {
        q: "Can you help us transition from our current provider?",
        a: "Yes, we handle provider transitions regularly. We conduct a full environment discovery, document your current stack, and migrate services with minimal disruption. Most transitions complete within 30 days.",
      },
    ],
  },
  {
    category: "Security & Compliance",
    items: [
      {
        q: "Can you help with compliance?",
        a: "Core strength. CMMC, SOC 2, PCI-DSS, HIPAA, ISO 27001, NIST 800-171, SEC/FINRA, OSHA. We identify gaps and build a roadmap to get you audit-ready.",
      },
      {
        q: "How fast do you respond to critical issues?",
        a: "15-minute SLA for critical issues. Our AI-powered systems detect and resolve most issues automatically. When human intervention is needed, we are there in minutes.",
      },
      {
        q: "What is CMMC?",
        a: "Cybersecurity Maturity Model Certification. Required by the DoD for contractors handling Controlled Unclassified Information. If you bid on defense contracts, you need CMMC 2.0. Veracity is a Registered Provider.",
      },
      {
        q: "How do you handle ransomware risk?",
        a: "AI-powered endpoint detection, network segmentation, email authentication, immutable backups, awareness training, and 24/7 monitoring. Multiple layers. No single point of failure.",
      },
      {
        q: "Do you train employees on threat awareness?",
        a: "Ongoing. Quarterly simulations, role-specific training, AI-threat awareness, real-time coaching. 59% of incidents start with compromised credentials. Training closes that gap.",
      },
      {
        q: "What happens during a security incident?",
        a: "Our response team activates immediately. We contain the threat, preserve evidence, assess impact, restore operations from tested backups, handle regulatory notifications, and conduct root cause analysis. Response begins in minutes, not hours.",
      },
    ],
  },
  {
    category: "AI & Automation",
    items: [
      {
        q: "What is Shadow AI?",
        a: "Shadow AI refers to unauthorized AI tools employees use without IT or security oversight \u2014 things like ChatGPT for sensitive documents, unapproved automation tools, or consumer AI apps connected to company data. It creates serious compliance and data leakage risk.",
      },
      {
        q: "Do you offer AI governance?",
        a: "Yes. We help organizations establish AI usage policies, deploy technical guardrails, audit existing tool usage, and build governed AI environments that let employees use AI productively without creating security or compliance exposure.",
      },
      {
        q: "What is an AI Business Intelligence Assessment?",
        a: "It's a structured evaluation of your organization's AI readiness, current tool usage, governance gaps, and automation opportunities. The output is a prioritized roadmap showing where AI can reduce cost, improve efficiency, and reduce risk in your specific environment.",
      },
      {
        q: "How does AI reduce business risk?",
        a: "AI enables continuous monitoring at a scale humans can't match \u2014 detecting anomalies, flagging policy violations, and responding to threats in real time. It also reduces human error, enforces consistent processes, and provides audit trails that support compliance.",
      },
      {
        q: "What is a Human Risk Simulation?",
        a: "It's an interactive assessment that presents realistic AI-generated threat scenarios \u2014 phishing, social engineering, impersonation \u2014 and measures how your team responds. The result is a Human Risk Score identifying your organization's behavioral vulnerabilities.",
      },
    ],
  },
  {
    category: "About Veracity",
    items: [
      {
        q: "Do you work with our industry?",
        a: "We specialize in construction, financial services, manufacturing, and high-compliance industries. Our team holds sector-specific certifications and understands the regulatory requirements and operational realities of each.",
      },
      {
        q: "What platforms do you work with?",
        a: "Procore, Sage, Bluebeam for construction. Bloomberg, Salesforce, trading platforms for financial services. SAP, SCADA, MES systems for manufacturing. If your team uses it, we know how to integrate and secure it.",
      },
      {
        q: "What makes Veracity different?",
        a: "We operate as a Managed Intelligence Provider, not a traditional MSP. We use AI and automation to proactively detect and resolve issues rather than reacting when things break. Clients get dedicated account managers, faster response times, and strategic technology guidance \u2014 not just a help desk.",
      },
      {
        q: "What areas do you serve?",
        a: "We primarily serve the Twin Cities metro including Minneapolis, St. Paul, Minnetonka, Bloomington, Eden Prairie, Plymouth, and surrounding Minnesota communities. We also support remote and hybrid teams nationwide through our cloud-based delivery model.",
      },
      {
        q: "Do you support remote and hybrid teams?",
        a: "Absolutely. Our service delivery is cloud-first and supports distributed workforces across any location. We manage endpoint security, identity, access controls, and collaboration tools for remote and hybrid environments.",
      },
      {
        q: "What is a Managed Intelligence Provider?",
        a: "A Managed Intelligence Provider (MIP) goes beyond traditional managed IT by integrating AI, automation, and proactive intelligence into every layer of your technology environment. Rather than reacting to problems, a MIP predicts, prevents, and resolves issues autonomously.",
      },
      {
        q: "How is Veracity different from a traditional provider?",
        a: "Traditional providers react when things break. Veracity builds proactive, AI-enhanced environments that detect and resolve issues before they impact your business. We combine strategic vCIO guidance with full IT and security execution \u2014 at a fraction of the cost of in-house staff.",
      },
    ],
  },
];

export default function FAQSection() {
  return (
    <section
      id="faq"
      data-testid="faq-section"
      aria-label="Frequently asked questions about AI automation and managed intelligence"
      className="py-12 lg:py-18 bg-transparent relative overflow-hidden"
    >
      <img src="/images/logo-circle.webp" alt="" aria-hidden="true" loading="lazy" className="absolute -right-16 top-1/2 -translate-y-1/2 w-[450px] h-[450px] object-contain opacity-[0.04] brightness-200 pointer-events-none" />
      <div className="max-w-3xl mx-auto px-6">
        <div className="text-center mb-10">
          
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#0077B3] mb-4 animate-fade-in-up">FAQ</p>
          <h2
            data-testid="faq-heading"
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white mb-4 animate-fade-in-up stagger-1"
            style={{ fontFamily: "Outfit, sans-serif" }}
          >
            Common questions. Clear answers.
          </h2>
        </div>

        <div className="space-y-10 animate-fade-in-up stagger-2">
          {faqCategories.map((group, groupIndex) => {
            const startIndex = faqCategories.slice(0, groupIndex).reduce((sum, g) => sum + g.items.length, 0);
            return (
              <div key={group.category} data-testid={`faq-category-${groupIndex}`}>
                <h3
                  data-testid={`faq-category-heading-${groupIndex}`}
                  className="text-sm font-bold uppercase tracking-[0.15em] text-[#00a0e4] mb-3 pb-2 border-b border-white/10"
                >
                  {group.category}
                </h3>
                <div className="space-y-3">
                  {group.items.map((faq, itemIndex) => {
                    const i = startIndex + itemIndex;
                    return (
                      // Native <details>/<summary> - the browser guarantees the answer text
                      // is always present in the DOM (no JS/framework mount-state involved),
                      // it just controls visibility via the `open` attribute + CSS. This is
                      // deliberately not a JS-driven accordion library, to permanently remove
                      // any risk of crawler-visible content depending on client-side state.
                      <details
                        key={faq.q}
                        data-testid={`faq-item-${i}`}
                        open={i < 4}
                        className="group border-b border-white/10"
                      >
                        <summary
                          data-testid={`faq-trigger-${i}`}
                          className="flex items-center justify-between gap-4 cursor-pointer list-none text-white hover:text-[#0077B3] text-left py-5 text-base font-medium [&::-webkit-details-marker]:hidden marker:content-none"
                        >
                          <span>{faq.q}</span>
                          <ChevronDown className="w-4 h-4 shrink-0 text-[#94a8be] transition-transform duration-200 group-open:rotate-180" />
                        </summary>
                        <div
                          data-testid={`faq-content-${i}`}
                          className="text-[#c0cfe0] text-sm leading-relaxed pb-5"
                        >
                          {faq.a}
                        </div>
                      </details>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

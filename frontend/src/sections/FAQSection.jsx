import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../components/ui/accordion";

const faqs = [
  {
    q: "Will this audit disrupt our operations?",
    a: "Not at all. Our assessment is completely non-invasive. We work around your schedule and use passive scanning tools that won&rsquo;t interfere with your network, production systems, or daily workflows. Most of our review happens in the background while your teams work uninterrupted.",
  },
  {
    q: "How long does the audit take?",
    a: "The initial assessment typically takes 3-5 business days. You&rsquo;ll receive a comprehensive report with findings and recommendations tailored to your industry within one week of completion.",
  },
  {
    q: "Is our data kept confidential?",
    a: "Absolutely. We sign NDAs before any engagement and follow strict data handling protocols aligned with ISO 27001 standards. Your project data, financial records, intellectual property, and infrastructure details remain completely confidential.",
  },
  {
    q: "Do you work with our industry?",
    a: "We specialize in construction, financial services, manufacturing, and high-compliance industries. Our team holds sector-specific certifications and understands the unique regulatory requirements, tools, and threats each industry faces.",
  },
  {
    q: "What software and platforms do you support?",
    a: "We have deep expertise across industry-specific platforms - Procore, Sage, and Bluebeam for construction; Bloomberg, Salesforce, and trading platforms for financial services; SAP, SCADA, and MES systems for manufacturing. If your team uses it, we know how to secure and optimize it.",
  },
  {
    q: "Can you help with compliance requirements?",
    a: "That&rsquo;s one of our core strengths. We support CMMC, SOC 2, PCI-DSS, HIPAA, ISO 27001, NIST 800-171, SEC/FINRA regulations, and OSHA digital requirements. We&rsquo;ll identify gaps and build a roadmap to get you audit-ready.",
  },
  {
    q: "How quickly do you respond to IT issues?",
    a: "We respond to critical issues within 15 minutes under our SLA. Our 24/7 Security Operations Center uses AI-powered monitoring to detect and respond to threats in real time, often resolving issues before your team even notices them.",
  },
  {
    q: "What is Shadow AI and should my business be concerned?",
    a: "Shadow AI refers to employees using unauthorized AI tools like ChatGPT, Claude, or other LLMs without IT approval. 68% of employees use unauthorized AI tools, creating serious risks of data leakage, compliance violations, and intellectual property exposure. Veracity discovers, assesses, and governs Shadow AI across your organization.",
  },
  {
    q: "Do you offer AI security and governance services?",
    a: "Yes. We offer comprehensive AI as a Service including AI strategy and integration, AI security and governance frameworks, AI-powered threat detection, Shadow AI monitoring, data loss prevention for LLMs, and AI readiness assessments. 90% of organizations are unprepared for AI-augmented threats.",
  },
  {
    q: "What makes Veracity different from other MSPs?",
    a: "Three things: industry specialization, AI-powered security, and local presence. We don&rsquo;t do generic IT. Every engagement is built on sector-specific knowledge of your industry's regulations, tools, and threats. Our SOC uses machine learning for 24/7 threat detection. And we&rsquo;re headquartered in Minnetonka, MN with on-site response across the Twin Cities metro.",
  },
  {
    q: "What areas do you serve?",
    a: "We serve 45 cities across the Minneapolis-St. Paul metro and Central Minnesota, including Minneapolis, St. Paul, Minnetonka, Bloomington, Eden Prairie, Plymouth, Edina, Wayzata, Woodbury, Eagan, St. Cloud, and many more. Our headquarters is at 5929 Baker Rd, Suite 420, Minnetonka, MN 55345.",
  },
  {
    q: "How much do your managed IT services cost?",
    a: "Pricing is customized based on your organization's size, industry, compliance requirements, and IT complexity. We offer a free Technology and Cyber Risk Audit with no obligation to help you understand your needs before committing. Contact us at (952) 941-7333 for a consultation.",
  },
  {
    q: "What is CMMC and does my business need it?",
    a: "CMMC (Cybersecurity Maturity Model Certification) is a framework required by the U.S. Department of Defense for contractors handling Controlled Unclassified Information. If your business is part of the defense supply chain or bids on DoD contracts, you need CMMC 2.0 certification. Veracity is a CMMC Registered Provider.",
  },
  {
    q: "Can you help prevent ransomware attacks?",
    a: "Yes. Ransomware attacks rose 32% globally in 2025 with average payments reaching $2.3 million. Our multi-layered approach includes AI-powered endpoint detection, network segmentation, email authentication (DMARC/DKIM/SPF), tested backups with immutable storage, employee security training, and 24/7 SOC monitoring that catches lateral movement before ransomware executes.",
  },
  {
    q: "Do you provide employee cybersecurity training?",
    a: "Yes. We provide ongoing security awareness training including quarterly phishing simulations, role-specific training for employees who handle financial transactions or sensitive data, AI-specific threat awareness, and real-time coaching when employees encounter suspicious activity. Training is a critical layer of defense since 59% of incidents start with compromised credentials.",
  },
  {
    q: "What happens if we experience a security breach?",
    a: "Our incident response team activates immediately. We contain the threat, preserve forensic evidence, assess the scope of impact, restore operations from tested backups, handle regulatory notification requirements, and conduct a thorough root cause analysis to prevent recurrence. Our 24/7 SOC means response begins in minutes, not hours.",
  },
  {
    q: "Can you help us transition from our current IT provider?",
    a: "Absolutely. We handle provider transitions regularly with a structured onboarding process: discovery call, comprehensive network assessment, tool deployment and security hardening, and ongoing unlimited support. Most transitions are completed within 30 days with zero disruption to your operations.",
  },
  {
    q: "Do you support remote and hybrid work environments?",
    a: "Yes. We deploy secure remote access solutions including VPN, zero-trust architecture, conditional access policies, mobile device management (MDM), and cloud security for Microsoft 365, Google Workspace, and other SaaS platforms. Every remote connection is verified and encrypted regardless of location.",
  },
];

export default function FAQSection() {
  return (
    <section
      id="faq"
      data-testid="faq-section"
      aria-label="Frequently asked questions about managed IT services and cybersecurity audits"
      className="py-16 lg:py-24 bg-[#0f1d32]"
    >
      <div className="max-w-3xl mx-auto px-6">
        <div className="text-center mb-16">
          
          <p className="text-base font-bold uppercase tracking-[0.15em] text-[#0077B3] mb-4 animate-fade-in-up">FAQ</p>
          <h2
            data-testid="faq-heading"
            className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white mb-4 animate-fade-in-up stagger-1"
            style={{ fontFamily: "Outfit, sans-serif" }}
          >
            Common questions, straight answers.
          </h2>
        </div>

        <Accordion type="single" collapsible className="space-y-3 animate-fade-in-up stagger-2">
          {faqs.map((faq, i) => (
            <AccordionItem
              key={i}
              value={`faq-${i}`}
              data-testid={`faq-item-${i}`}
              className="border-b border-white/10 px-0"
            >
              <AccordionTrigger
                data-testid={`faq-trigger-${i}`}
                className="text-white hover:text-[#0077B3] hover:no-underline text-left py-5 text-base font-medium"
              >
                {faq.q}
              </AccordionTrigger>
              <AccordionContent
                data-testid={`faq-content-${i}`}
                className="text-[#94a8be] text-sm leading-relaxed pb-5"
              >
                {faq.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}

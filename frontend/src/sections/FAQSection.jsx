import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../components/ui/accordion";

const faqs = [
  {
    q: "Will the assessment disrupt our operations?",
    a: "No. The assessment is non-invasive. We work around your schedule using passive tools that don&rsquo;t interfere with your systems or workflows.",
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
    q: "Do you work with our industry?",
    a: "We specialize in construction, financial services, manufacturing, and high-compliance industries. Our team holds sector-specific certifications and understands the regulatory requirements and operational realities of each.",
  },
  {
    q: "What platforms do you work with?",
    a: "Procore, Sage, Bluebeam for construction. Bloomberg, Salesforce, trading platforms for financial services. SAP, SCADA, MES systems for manufacturing. If your team uses it, we know how to integrate and secure it.",
  },
  {
    q: "Can you help with compliance?",
    a: "Core strength. CMMC, SOC 2, PCI-DSS, HIPAA, ISO 27001, NIST 800-171, SEC/FINRA, OSHA. We identify gaps and build a roadmap to get you audit-ready.",
  },
  {
    q: "How fast do you respond to critical issues?",
    a: "15-minute SLA for critical issues. Our AI-powered systems detect and resolve most issues automatically. When human intervention is needed, we are there in minutes.",
  },
  {
    q: "What is Shadow AI?",
    a: "Employees using unauthorized AI tools without approval. 68% of employees do this. It creates data leakage, compliance violations, and IP exposure. We discover, assess, and govern it.",
  },
  {
    q: "Do you offer AI governance?",
    a: "Yes. AI strategy, security frameworks, automated threat detection, Shadow AI monitoring, data loss prevention for LLMs, and AI readiness assessments. 90% of organizations are unprepared for AI-augmented threats.",
  },
  {
    q: "What makes Veracity different?",
    a: "Industry specialization, AI-first approach, and local presence. Every engagement is built on sector-specific knowledge of your regulations, workflows, and operational risks. Our systems use machine learning for real-time detection. Headquartered in Minnetonka, MN with on-site response across the Twin Cities.",
  },
  {
    q: "What areas do you serve?",
    a: "45 cities across the Minneapolis-St. Paul metro and Central Minnesota, including Minneapolis, St. Paul, Minnetonka, Bloomington, Eden Prairie, Plymouth, Edina, Wayzata, Woodbury, Eagan, St. Cloud, and more. Headquarters: 5929 Baker Rd, Suite 420, Minnetonka, MN 55345.",
  },
  {
    q: "How is pricing structured?",
    a: "Customized based on your organization&rsquo;s size, industry, compliance requirements, and complexity. We offer a free AI Business Intelligence Assessment with no obligation. Call (952) 941-7333 to start a conversation.",
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
  {
    q: "Can you help us transition from our current provider?",
    a: "Yes. We run structured transitions: discovery, network assessment, tool deployment, security hardening, ongoing support. Most are completed within 30 days with zero disruption to your operations.",
  },
  {
    q: "Do you support remote and hybrid teams?",
    a: "Yes. Zero-trust access, conditional policies, device management, and cloud security for Microsoft 365, Google Workspace, and other platforms. Every connection verified and encrypted regardless of location.",
  },
  {
    q: "What is a Managed Intelligence Provider?",
    a: "A Managed Intelligence Provider goes beyond traditional IT support. Instead of managing hardware and responding to tickets, Veracity deploys AI, automation, and intelligent systems to give businesses real-time visibility, reduce manual work, lower operational risk, and make faster decisions. We manage outcomes, not infrastructure.",
  },
  {
    q: "What is an AI Business Intelligence Assessment?",
    a: "It is a free assessment that scores your organization across six categories: automation maturity, AI readiness, operational risk, human risk, business continuity, and operational efficiency. You receive a Business Intelligence Score with identified gaps and actionable opportunities. Takes under 3 minutes.",
  },
  {
    q: "How does AI reduce business risk?",
    a: "AI reduces risk by automating threat detection 24/7 without human fatigue, identifying anomalies before they become incidents, governing data flows across platforms, and eliminating manual processes that introduce human error. Businesses using AI-driven systems detect and respond to issues in minutes, not days.",
  },
  {
    q: "What is a Human Risk Simulation?",
    a: "A behavioral assessment that measures how your team responds to realistic AI-driven threat scenarios - vendor impersonation, payment redirects, credential harvesting, and executive urgency attacks. It produces a Human Risk Score (0-100) that reflects your organizational exposure to social engineering.",
  },
  {
    q: "How is Veracity different from a traditional provider?",
    a: "Traditional providers manage tickets and react when things break. Veracity deploys AI, automation, and intelligent systems to prevent problems, reduce manual work, improve visibility, and drive measurable business outcomes. Minnetonka, Minnesota. Twin Cities metro.",
  },
];

export default function FAQSection() {
  return (
    <section
      id="faq"
      data-testid="faq-section"
      aria-label="Frequently asked questions about AI automation and managed intelligence"
      className="py-12 lg:py-18 bg-transparent"
    >
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

        <Accordion type="multiple" defaultValue={["faq-0", "faq-1", "faq-2", "faq-3"]} className="space-y-3 animate-fade-in-up stagger-2">
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
                className="text-[#c0cfe0] text-sm leading-relaxed pb-5"
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

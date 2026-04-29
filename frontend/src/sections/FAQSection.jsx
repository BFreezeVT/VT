import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../components/ui/accordion";

const faqs = [
  {
    q: "Will this audit disrupt our operations?",
    a: "Not at all. Our assessment is completely non-invasive. We work around your schedule and use passive scanning tools that won't interfere with your network, production systems, or daily workflows. Most of our review happens in the background while your teams work uninterrupted.",
  },
  {
    q: "How long does the audit take?",
    a: "The initial assessment typically takes 3-5 business days. You'll receive a comprehensive report with findings and recommendations tailored to your industry within one week of completion.",
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
    a: "We have deep expertise across industry-specific platforms — Procore, Sage, and Bluebeam for construction; Bloomberg, Salesforce, and trading platforms for financial services; SAP, SCADA, and MES systems for manufacturing. If your team uses it, we know how to secure and optimize it.",
  },
  {
    q: "Can you help with compliance requirements?",
    a: "That's one of our core strengths. We support CMMC, SOC 2, PCI-DSS, HIPAA, ISO 27001, NIST 800-171, SEC/FINRA regulations, and OSHA digital requirements. We'll identify gaps and build a roadmap to get you audit-ready.",
  },
];

export default function FAQSection() {
  return (
    <section
      id="faq"
      data-testid="faq-section"
      aria-label="Frequently asked questions about managed IT services and cybersecurity audits"
      className="py-24 lg:py-32 bg-[#e9eff6] border-t border-[#c8d6e5]"
    >
      <div className="max-w-3xl mx-auto px-6">
        <div className="text-center mb-16">
          
          <p className="overline text-[#0077B3] mb-4 animate-fade-in-up">FAQ</p>
          <h2
            data-testid="faq-heading"
            className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#1a2b42] mb-4 animate-fade-in-up stagger-1"
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
              className="border-b border-[#dfe6ee] px-0"
            >
              <AccordionTrigger
                data-testid={`faq-trigger-${i}`}
                className="text-[#1a2b42] hover:text-[#0077B3] hover:no-underline text-left py-5 text-base font-medium"
              >
                {faq.q}
              </AccordionTrigger>
              <AccordionContent
                data-testid={`faq-content-${i}`}
                className="text-[#4a5e78] text-sm leading-relaxed pb-5"
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

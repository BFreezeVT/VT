import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../components/ui/accordion";

const faqs = [
  {
    q: "Will this audit disrupt our operations?",
    a: "Not at all. Our assessment is completely non-invasive. We work around your schedule and use passive scanning tools that won't interfere with your network or project workflows. Most of our review happens in the background while your teams work uninterrupted.",
  },
  {
    q: "How long does the audit take?",
    a: "The initial assessment typically takes 3-5 business days. You'll receive a comprehensive report with findings and recommendations within one week of completion.",
  },
  {
    q: "Is our data kept confidential?",
    a: "Absolutely. We sign NDAs before any engagement and follow strict data handling protocols aligned with ISO 27001 standards. Your project data, financials, and infrastructure details remain completely confidential.",
  },
  {
    q: "Do you work with subcontractors and specialty trades?",
    a: "Yes. We understand the complex vendor ecosystem in construction. Our solutions are designed to securely connect GCs, subs, owners, and architects while maintaining proper access controls for each party.",
  },
  {
    q: "What construction software do you support?",
    a: "We have deep expertise with Procore, Sage 300 CRE, PlanGrid, Bluebeam, AutoCAD, Revit, and most major construction management platforms. If your team uses it, we know how to secure and optimize it.",
  },
  {
    q: "Can you help with remote job site connectivity?",
    a: "That's one of our specialties. We deploy ruggedized networking solutions for job sites of all sizes, from single-building renovations to multi-acre developments, ensuring reliable connectivity for every trailer and field device.",
  },
];

export default function FAQSection() {
  return (
    <section
      id="faq"
      data-testid="faq-section"
      className="py-24 lg:py-32 bg-[#001A33]/20"
    >
      <div className="max-w-3xl mx-auto px-6">
        <div className="text-center mb-16">
          <p className="overline text-[#0077B3] mb-4 animate-fade-in-up">FAQ</p>
          <h2
            data-testid="faq-heading"
            className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-white mb-4 animate-fade-in-up stagger-1"
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
              className="border-b border-[#003B71] px-0"
            >
              <AccordionTrigger
                data-testid={`faq-trigger-${i}`}
                className="text-white hover:text-[#0077B3] hover:no-underline text-left py-5 text-base font-medium"
              >
                {faq.q}
              </AccordionTrigger>
              <AccordionContent
                data-testid={`faq-content-${i}`}
                className="text-[#A0B6CD] text-sm leading-relaxed pb-5"
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

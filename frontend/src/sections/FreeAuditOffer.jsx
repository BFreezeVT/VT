import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { CheckCircle, ClipboardCheck, Search, Lock, BarChart3, Clock } from "lucide-react";
import { useLeadSubmit } from "../hooks/useLeadSubmit";

const auditIncludes = [
  { icon: Search, text: "AI readiness assessment" },
  { icon: Search, text: "Full network vulnerability scan" },
  { icon: Lock, text: "Password & access policy review" },
  { icon: BarChart3, text: "Ransomware & threat readiness assessment" },
  { icon: ClipboardCheck, text: "Industry-specific compliance gap analysis" },
  { icon: Clock, text: "Disaster recovery plan evaluation" },
];

export default function FreeAuditOffer() {
  const { submitted, submitting, submitLead } = useLeadSubmit();

  return (
    <section
      id="audit"
      data-testid="audit-section"
      aria-label="Schedule a free technology and cyber risk audit"
      className="py-16 lg:py-24 bg-white border-t border-b border-[#e2e8f0]"
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Left - Info */}
          <div className="animate-fade-in-up">
            <p className="overline text-[#FF5722] mb-4">Limited Availability</p>
            <h2
              data-testid="audit-heading"
              className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[#003B71] mb-6"
              style={{ fontFamily: "Outfit, sans-serif" }}
            >
              Free Technology &amp; Cyber Risk Audit
            </h2>
            <p className="text-[#1a2b42] text-base leading-relaxed mb-8">
              Our team will conduct a comprehensive, non-invasive review of your IT infrastructure 
              and cybersecurity posture — tailored to your industry. You&rsquo;ll receive a detailed 
              report with actionable recommendations for your specific compliance and operational needs.
            </p>

            <p className="text-[#003B71] font-semibold text-sm mb-4" style={{ fontFamily: "Outfit, sans-serif" }}>
              What&rsquo;s included:
            </p>
            <div className="space-y-3">
              {auditIncludes.map((item, i) => (
                <div
                  key={i}
                  data-testid={`audit-include-${i}`}
                  className="flex items-center gap-3"
                >
                  <item.icon className="w-4 h-4 text-[#0077B3] flex-shrink-0" />
                  <span className="text-[#1a2b42] text-sm font-medium">{item.text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right - Form */}
          <div className="animate-fade-in-up stagger-2">
            <div className="grid-border-card p-8 lg:p-10">
              {!submitted ? (
                <>
                  <div className="flex items-center gap-4 mb-6">
                    <img src="https://customer-assets.emergentagent.com/job_jobsite-it-secure/artifacts/yo1g9lv0_2.png" alt="Veracity" className="w-14 h-14 object-contain" />
                    <h3
                      className="text-[#003B71] font-bold text-2xl"
                      style={{ fontFamily: "Outfit, sans-serif" }}
                    >
                      Schedule Your Free Audit
                    </h3>
                  </div>
                  <p className="text-[#4a5e78] text-sm mb-8">
                    Fill in your details and we&rsquo;ll be in touch within one business day.
                  </p>
                  <form onSubmit={(e) => {
                    e.preventDefault();
                    const fd = new FormData(e.target);
                    submitLead({
                      company: fd.get("company"),
                      role: fd.get("role"),
                      phone: fd.get("phone"),
                      email: fd.get("email"),
                      source_page: "homepage",
                    });
                  }} className="space-y-5">
                    <div>
                      <label htmlFor="company" className="text-[#003B71] text-sm font-medium mb-1.5 block">
                        Company Name
                      </label>
                      <Input
                        data-testid="form-company"
                        id="company"
                        name="company"
                        placeholder="Your company name"
                        className="bg-[#003B71] border-[#d0dbe8] text-[#003B71] placeholder:text-[#94a3b8] focus:border-[#0077B3] focus:ring-1 focus:ring-[#0077B3] rounded-sm h-11"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="role" className="text-[#003B71] text-sm font-medium mb-1.5 block">
                        Your Role
                      </label>
                      <Input
                        data-testid="form-role"
                        id="role"
                        name="role"
                        placeholder="e.g. IT Director, Owner, PM"
                        className="bg-[#003B71] border-[#d0dbe8] text-[#003B71] placeholder:text-[#94a3b8] focus:border-[#0077B3] focus:ring-1 focus:ring-[#0077B3] rounded-sm h-11"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="phone" className="text-[#003B71] text-sm font-medium mb-1.5 block">
                        Phone
                      </label>
                      <Input
                        data-testid="form-phone"
                        id="phone"
                        name="phone"
                        type="tel"
                        placeholder="(555) 123-4567"
                        className="bg-[#003B71] border-[#d0dbe8] text-[#003B71] placeholder:text-[#94a3b8] focus:border-[#0077B3] focus:ring-1 focus:ring-[#0077B3] rounded-sm h-11"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="text-[#003B71] text-sm font-medium mb-1.5 block">
                        Email
                      </label>
                      <Input
                        data-testid="form-email"
                        id="email"
                        name="email"
                        type="email"
                        placeholder="you@company.com"
                        className="bg-[#003B71] border-[#d0dbe8] text-[#003B71] placeholder:text-[#94a3b8] focus:border-[#0077B3] focus:ring-1 focus:ring-[#0077B3] rounded-sm h-11"
                        required
                      />
                    </div>
                    <Button
                      data-testid="form-submit-button"
                      type="submit"
                      className="w-full bg-[#003B71] hover:bg-[#003B71]/90 text-white rounded-sm font-semibold h-12 text-base"
                    >
                      Schedule Your Free Audit
                    </Button>
                    <p className="text-xs text-[#4a5e78]/60 text-center">
                      Non-invasive. Confidential. No obligation.
                    </p>
                  </form>
                </>
              ) : (
                <div data-testid="form-success" className="text-center py-8">
                  <CheckCircle className="w-16 h-16 text-[#0077B3] mx-auto mb-4" />
                  <h3
                    className="text-[#003B71] font-bold text-xl mb-2"
                    style={{ fontFamily: "Outfit, sans-serif" }}
                  >
                    Thank you!
                  </h3>
                  <p className="text-[#4a5e78] text-sm">
                    We&rsquo;ve received your request. Our team will reach out within one business day to schedule your free audit.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

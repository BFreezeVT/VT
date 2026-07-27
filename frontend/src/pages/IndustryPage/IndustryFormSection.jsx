import { Shield } from "lucide-react";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";

export default function IndustryFormSection({ industry, submitted, error, submitLead }) {
  return (
    <section id="industry-form" data-testid="industry-form-section" className="py-20 bg-white">
      <div className="max-w-3xl mx-auto px-6">
        <div className="grid-border-card p-8 lg:p-10">
          {!submitted ? (
            <>
              <h2 className="text-2xl font-bold text-white mb-2 text-center" style={{ fontFamily: "Outfit" }}>
                {industry.ctaText}
              </h2>
              <p className="text-[#94a8be] text-sm mb-8 text-center">
                Non-invasive. Confidential. Tailored to {industry.name.toLowerCase()}.
              </p>
              {error && (
                <p data-testid="industry-form-error" className="text-[#FF5722] text-sm font-medium mb-4 text-center">
                  Something went wrong submitting your request. Please try again, or call us directly at (952) 941-7333.
                </p>
              )}
              <form onSubmit={(e) => {
                e.preventDefault();
                const fd = new FormData(e.target);
                submitLead({
                  company: fd.get("company"),
                  name: fd.get("name"),
                  phone: fd.get("phone"),
                  email: fd.get("email"),
                  source_page: "industry",
                  source_industry: industry.name,
                  situation: fd.get("situation") || "",
                  contact_preference: fd.get("contact_preference") || "call",
                });
              }} className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="company" className="text-white text-sm font-medium mb-1.5 block">Company</label>
                  <Input data-testid="industry-form-company" id="company" name="company" placeholder="Your company" className="bg-white border-white/10 text-white placeholder:text-[#94a3b8] focus:border-[#0077B3] rounded-sm h-11" required />
                </div>
                <div>
                  <label htmlFor="name" className="text-white text-sm font-medium mb-1.5 block">Name</label>
                  <Input data-testid="industry-form-name" id="name" name="name" placeholder="Full name" className="bg-white border-white/10 text-white placeholder:text-[#94a3b8] focus:border-[#0077B3] rounded-sm h-11" required />
                </div>
                <div>
                  <label htmlFor="phone" className="text-white text-sm font-medium mb-1.5 block">Phone</label>
                  <Input data-testid="industry-form-phone" id="phone" name="phone" type="tel" placeholder="(555) 123-4567" className="bg-white border-white/10 text-white placeholder:text-[#94a3b8] focus:border-[#0077B3] rounded-sm h-11" required />
                </div>
                <div>
                  <label htmlFor="email" className="text-white text-sm font-medium mb-1.5 block">Email</label>
                  <Input data-testid="industry-form-email" id="email" name="email" type="email" placeholder="you@company.com" className="bg-white border-white/10 text-white placeholder:text-[#94a3b8] focus:border-[#0077B3] rounded-sm h-11" required />
                </div>
                <div className="sm:col-span-2">
                  <textarea name="situation" placeholder="Tell us about your current situation or challenges..." rows={2} className="w-full bg-white/5 border border-white/10 text-white placeholder:text-[#94a3b8] rounded-sm px-3 py-2 text-sm resize-none focus:outline-none focus:border-[#0077B3]" />
                </div>
                <div className="sm:col-span-2">
                  <p className="text-white/70 text-xs mb-2">Preferred contact method:</p>
                  <div className="flex gap-4">
                    <label className="flex items-center gap-2 cursor-pointer"><input type="radio" name="contact_preference" value="call" defaultChecked className="accent-[#0077B3]" /><span className="text-white text-sm">Call me</span></label>
                    <label className="flex items-center gap-2 cursor-pointer"><input type="radio" name="contact_preference" value="email" className="accent-[#0077B3]" /><span className="text-white text-sm">Email me</span></label>
                  </div>
                </div>
                <div className="sm:col-span-2">
                  <Button data-testid="industry-form-submit" type="submit" className="w-full bg-[#0077B3] hover:bg-[#0077B3]/90 text-white rounded-sm font-semibold h-12">
                    {industry.ctaText}
                  </Button>
                </div>
              </form>
            </>
          ) : (
            <div data-testid="industry-form-success" className="text-center py-6">
              <Shield className="w-12 h-12 text-[#0077B3] mx-auto mb-4" />
              <h3 className="text-white font-bold text-xl mb-2" style={{ fontFamily: "Outfit" }}>Thank you!</h3>
              <p className="text-[#94a8be] text-sm">We&rsquo;ll reach out within one business day to schedule your {industry.name.toLowerCase()} security audit.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

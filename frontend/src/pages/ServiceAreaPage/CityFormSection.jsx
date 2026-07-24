import { Shield } from "lucide-react";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";

export default function CityFormSection({ city, submitted, submitLead }) {
  return (
    <section id="city-form" data-testid="city-form-section" aria-label={`Schedule IT audit in ${city.name}`} className="py-20 bg-[#0f1d32]">
      <div className="max-w-3xl mx-auto px-6">
        <div className="grid-border-card p-8 lg:p-10">
          {!submitted ? (
            <>
              <h2
                className="text-2xl font-bold text-white mb-2 text-center"
                style={{ fontFamily: "Outfit, sans-serif" }}
              >
                {city.ctaText}
              </h2>
              <p className="text-[#94a8be] text-sm mb-8 text-center">
                Get a comprehensive, non-invasive review of your {city.name} business&rsquo;s IT and cybersecurity posture.
              </p>
              <form onSubmit={(e) => {
                e.preventDefault();
                const fd = new FormData(e.target);
                submitLead({
                  company: fd.get("company"),
                  name: fd.get("name"),
                  phone: fd.get("phone"),
                  email: fd.get("email"),
                  source_page: "city",
                  source_city: city.name,
                  situation: fd.get("situation") || "",
                  contact_preference: fd.get("contact_preference") || "call",
                });
              }} className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="company" className="text-white text-sm font-medium mb-1.5 block">Company Name</label>
                  <Input data-testid="city-form-company" id="company" name="company" placeholder="Your company" className="bg-white border-white/10 text-white placeholder:text-[#94a3b8] focus:border-[#0077B3] rounded-sm h-11" required />
                </div>
                <div>
                  <label htmlFor="name" className="text-white text-sm font-medium mb-1.5 block">Your Name</label>
                  <Input data-testid="city-form-name" id="name" name="name" placeholder="Full name" className="bg-white border-white/10 text-white placeholder:text-[#94a3b8] focus:border-[#0077B3] rounded-sm h-11" required />
                </div>
                <div>
                  <label htmlFor="phone" className="text-white text-sm font-medium mb-1.5 block">Phone</label>
                  <Input data-testid="city-form-phone" id="phone" name="phone" type="tel" placeholder="(555) 123-4567" className="bg-white border-white/10 text-white placeholder:text-[#94a3b8] focus:border-[#0077B3] rounded-sm h-11" required />
                </div>
                <div>
                  <label htmlFor="email" className="text-white text-sm font-medium mb-1.5 block">Email</label>
                  <Input data-testid="city-form-email" id="email" name="email" type="email" placeholder="you@company.com" className="bg-white border-white/10 text-white placeholder:text-[#94a3b8] focus:border-[#0077B3] rounded-sm h-11" required />
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
                  <Button data-testid="city-form-submit" type="submit" className="w-full bg-[#0077B3] hover:bg-[#0077B3]/90 text-white rounded-sm font-semibold h-12 text-base">
                    {city.ctaText}
                  </Button>
                </div>
              </form>
            </>
          ) : (
            <div data-testid="city-form-success" className="text-center py-6">
              <Shield className="w-12 h-12 text-[#0077B3] mx-auto mb-4" />
              <h3 className="text-white font-bold text-xl mb-2" style={{ fontFamily: "Outfit, sans-serif" }}>Thank you!</h3>
              <p className="text-[#94a8be] text-sm">We&rsquo;ll reach out within one business day to schedule your {city.name} IT audit.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

import { useState } from "react";
import { CheckCircle2, AlertTriangle } from "lucide-react";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import { useLeadSubmit } from "../../hooks/useLeadSubmit";

/**
 * Shared lead capture form for the buyer offer pages.
 * Posts to the Website B backend (POST /api/leads) via useLeadSubmit.
 * `offerName` is sent as `situation` so the team knows which offer was requested.
 * `sourcePage` is the page slug, used for attribution.
 */
export default function OfferLeadForm({ offerName, sourcePage, heading, subheading, testId, buttonText }) {
  const { submitted, submitting, error, submitLead } = useLeadSubmit();
  const [form, setForm] = useState({ name: "", company: "", email: "", phone: "" });

  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    await submitLead({
      name: form.name,
      company: form.company,
      email: form.email,
      phone: form.phone,
      source_page: sourcePage,
      situation: offerName,
      contact_preference: "call",
    });
  };

  if (submitted) {
    return (
      <div data-testid={`${testId}-success`} className="bg-white/5 border border-white/10 rounded-lg p-8 text-center">
        <CheckCircle2 className="w-10 h-10 text-[#4cc978] mx-auto mb-4" />
        <h3 className="text-xl font-bold text-white mb-2" style={{ fontFamily: "Outfit" }}>You are all set.</h3>
        <p className="text-[#94a8be] text-sm leading-relaxed max-w-md mx-auto">
          Thanks for requesting {offerName}. A member of the Veracity team will reach out shortly. If you need help right away, call (952) 941-7333.
        </p>
      </div>
    );
  }

  return (
    <div data-testid={testId} className="bg-white/5 border border-white/10 rounded-lg p-6 sm:p-8">
      {heading ? (
        <h3 className="text-xl font-bold text-white mb-2" style={{ fontFamily: "Outfit" }}>{heading}</h3>
      ) : null}
      {subheading ? <p className="text-[#94a8be] text-sm mb-6 leading-relaxed">{subheading}</p> : null}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor={`${testId}-name`} className="block text-xs font-semibold text-[#94a8be] mb-1.5">Your name</label>
            <Input id={`${testId}-name`} value={form.name} onChange={set("name")} placeholder="Jane Smith" required className="bg-white/10 border-white/15 text-white placeholder:text-[#94a8be]/60" />
          </div>
          <div>
            <label htmlFor={`${testId}-company`} className="block text-xs font-semibold text-[#94a8be] mb-1.5">Company</label>
            <Input id={`${testId}-company`} value={form.company} onChange={set("company")} placeholder="Acme Manufacturing" required className="bg-white/10 border-white/15 text-white placeholder:text-[#94a8be]/60" />
          </div>
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor={`${testId}-email`} className="block text-xs font-semibold text-[#94a8be] mb-1.5">Work email</label>
            <Input id={`${testId}-email`} type="email" value={form.email} onChange={set("email")} placeholder="jane@acme.com" required className="bg-white/10 border-white/15 text-white placeholder:text-[#94a8be]/60" />
          </div>
          <div>
            <label htmlFor={`${testId}-phone`} className="block text-xs font-semibold text-[#94a8be] mb-1.5">Phone</label>
            <Input id={`${testId}-phone`} type="tel" value={form.phone} onChange={set("phone")} placeholder="(952) 555-0123" required className="bg-white/10 border-white/15 text-white placeholder:text-[#94a8be]/60" />
          </div>
        </div>
        {error ? (
          <p className="text-sm text-[#f2705f] flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 flex-shrink-0" /> Something went wrong sending your request. Please try again or call (952) 941-7333.
          </p>
        ) : null}
        <Button type="submit" disabled={submitting} className="w-full bg-[#0077B3] hover:bg-[#005f8f] text-white rounded-sm font-semibold h-12">
          {submitting ? "Sending..." : (buttonText || "Request It Free")}
        </Button>
        <p className="text-xs text-[#94a8be]/70 text-center">No cost, no obligation. We will not share your information.</p>
      </form>
    </div>
  );
}

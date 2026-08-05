import { useState } from "react";
import { CheckCircle, Send, Mail } from "lucide-react";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";

export default function ScorecardEmailReport({ emailSent, emailError, submitEmail }) {
  const [showEmailForm, setShowEmailForm] = useState(false);

  return (
    <div className="text-center mb-16">
      {!showEmailForm && !emailSent && (
        <button onClick={() => setShowEmailForm(true)} className="text-[#0077B3] text-sm font-medium hover:text-white transition-colors flex items-center gap-2 mx-auto">
          <Mail className="w-4 h-4" /> Email me my full report
        </button>
      )}
      {showEmailForm && !emailSent && (
        <div className="max-w-md mx-auto mt-6">
          {emailError && (
            <p data-testid="email-report-error" className="text-[#ef4444] text-xs font-medium mb-3">
              We couldn&rsquo;t send your report just now. Please try again, or call us at (952) 941-7333.
            </p>
          )}
          <form onSubmit={submitEmail} className="grid grid-cols-2 gap-3">
            <Input name="firstName" placeholder="First name" required className="bg-white/5 border-white/10 text-white placeholder:text-[#94a8be]/50 rounded-md" />
            <Input name="lastName" placeholder="Last name" required className="bg-white/5 border-white/10 text-white placeholder:text-[#94a8be]/50 rounded-md" />
            <Input name="email" type="email" placeholder="Email" required className="col-span-2 bg-white/5 border-white/10 text-white placeholder:text-[#94a8be]/50 rounded-md" />
            <Input name="company" placeholder="Company" className="col-span-2 bg-white/5 border-white/10 text-white placeholder:text-[#94a8be]/50 rounded-md" />
            <Button type="submit" className="col-span-2 bg-[#0077B3] hover:bg-[#0077B3]/90 text-white rounded-md font-semibold">
              <Send className="w-4 h-4 mr-2" /> Send My Report
            </Button>
          </form>
        </div>
      )}
      {emailSent && (
        <div className="flex items-center justify-center gap-2 text-[#10b981] text-sm mt-4">
          <CheckCircle className="w-4 h-4" /> Report sent! Check your inbox.
        </div>
      )}
    </div>
  );
}

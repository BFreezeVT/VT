import { Link } from "react-router-dom";
import { CheckCircle2 } from "lucide-react";
import { Button } from "../../components/ui/button";

export default function HRSFinalCTA() {
  return (
    <section data-testid="hrs-final-cta" className="py-20 bg-[#0f1d32]">
      <div className="max-w-3xl mx-auto px-6 text-center">
        <CheckCircle2 className="w-10 h-10 text-[#0077B3] mx-auto mb-4" />
        <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4" style={{ fontFamily: "Outfit" }}>
          Your Human Risk Score is one piece of the picture
        </h2>
        <p className="text-[#94a8be] text-base mb-8 max-w-xl mx-auto">
          The Business Technology Assessment scores your organization's full technology maturity - cybersecurity, compliance, AI readiness, and automation - and shows exactly where to focus next.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link to="/business-technology-assessment" data-testid="hrs-final-cta-assessment">
            <Button className="bg-[#0077B3] hover:bg-[#0077B3]/90 text-white rounded-sm font-semibold px-8 h-12">
              Start Your Business Technology Assessment
            </Button>
          </Link>
          <a href="tel:9529417333" data-testid="hrs-final-cta-call">
            <Button className="bg-transparent border border-white/20 hover:border-[#0077B3] text-white rounded-sm font-semibold px-8 h-12">
              Schedule a Strategy Discussion
            </Button>
          </a>
        </div>
      </div>
    </section>
  );
}

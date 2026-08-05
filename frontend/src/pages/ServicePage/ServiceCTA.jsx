import { Link } from "react-router-dom";
import { CheckCircle2 } from "lucide-react";
import { Button } from "../../components/ui/button";

export default function ServiceCTA({ svc }) {
  return (
    <section data-testid="service-page-cta" className="py-20 bg-[#0f1d32]">
      <div className="max-w-3xl mx-auto px-6 text-center">
        <CheckCircle2 className="w-10 h-10 text-[#0077B3] mx-auto mb-4" />
        <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4" style={{ fontFamily: "Outfit" }}>
          See where {svc.name} fits in your overall technology maturity
        </h2>
        <p className="text-[#94a8be] text-base mb-8 max-w-xl mx-auto">
          The Business Technology Assessment scores your organization across AI readiness, cybersecurity, compliance, and automation maturity - and shows exactly where to start.
        </p>
        <Link to="/business-technology-assessment" data-testid="service-page-bottom-cta">
          <Button className="bg-[#0077B3] hover:bg-[#0077B3]/90 text-white rounded-sm font-semibold px-8 h-12">
            Start Your Business Technology Assessment
          </Button>
        </Link>
        <p className="text-[#94a8be]/70 text-xs mt-3">Or call (952) 941-7333</p>
      </div>
    </section>
  );
}

import { Link } from "react-router-dom";
import { CheckCircle2 } from "lucide-react";
import { Button } from "../../components/ui/button";

export default function ClientSuccessCTA() {
  return (
    <section data-testid="client-success-cta" className="py-20 bg-white">
      <div className="max-w-3xl mx-auto px-6 text-center">
        <CheckCircle2 className="w-10 h-10 text-[#0077B3] mx-auto mb-4" />
        <h2 className="text-2xl sm:text-3xl font-bold text-[#0f1d32] mb-4" style={{ fontFamily: "Outfit" }}>
          See what a partnership with Veracity could look like for your business
        </h2>
        <p className="text-[#3a5068] text-base mb-8 max-w-xl mx-auto">
          Start with a free Business Technology Assessment to see exactly where your organization stands - and where the biggest opportunities are.
        </p>
        <Link to="/business-technology-assessment" data-testid="client-success-bottom-cta">
          <Button className="bg-[#003B71] hover:bg-[#002a52] text-white rounded-sm font-semibold px-8 h-12">
            Start Your Business Technology Assessment
          </Button>
        </Link>
        <p className="text-[#4a5e78] text-xs mt-3">Or call (952) 941-7333</p>
      </div>
    </section>
  );
}

import { CheckCircle, XCircle, ShieldCheck, ShieldAlert } from "lucide-react";

export default function ScorecardRisksAndRecs({ topRisks, topRecs }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
      <div>
        <h3 className="text-white font-bold text-lg mb-4 flex items-center gap-2" style={{ fontFamily: "Outfit" }}>
          <ShieldAlert className="w-5 h-5 text-[#ef4444]" /> Your Top Risks
        </h3>
        <div className="space-y-3">
          {topRisks.length > 0 ? topRisks.map((q) => (
            <div key={q.id} className="flex items-start gap-3 p-4 rounded-md bg-[#ef4444]/5 border border-[#ef4444]/10">
              <XCircle className="w-4 h-4 text-[#ef4444] flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-white text-sm font-medium capitalize">{q.risk}</p>
                <p className="text-[#94a8be] text-xs mt-0.5">Based on Q{q.id}: {q.text}</p>
              </div>
            </div>
          )) : (
            <p className="text-[#94a8be] text-sm">No major risks identified. Great job!</p>
          )}
        </div>
      </div>
      <div>
        <h3 className="text-white font-bold text-lg mb-4 flex items-center gap-2" style={{ fontFamily: "Outfit" }}>
          <ShieldCheck className="w-5 h-5 text-[#0077B3]" /> Recommended Actions
        </h3>
        <div className="space-y-3">
          {topRecs.length > 0 ? topRecs.map((rec) => (
            <div key={rec} className="flex items-start gap-3 p-4 rounded-md bg-[#0077B3]/5 border border-[#0077B3]/10">
              <CheckCircle className="w-4 h-4 text-[#0077B3] flex-shrink-0 mt-0.5" />
              <p className="text-white text-sm font-medium">{rec}</p>
            </div>
          )) : (
            <p className="text-[#94a8be] text-sm">Keep maintaining your current security posture.</p>
          )}
        </div>
      </div>
    </div>
  );
}

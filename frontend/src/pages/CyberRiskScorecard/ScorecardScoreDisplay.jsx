import { CheckCircle, AlertTriangle, XCircle } from "lucide-react";

export default function ScorecardScoreDisplay({ totalScore, maxScore, pct, riskLevel, riskColor }) {
  return (
    <div className="text-center mb-16">
      <p className="text-[#94a8be] text-sm uppercase tracking-wider mb-4">Your Results</p>
      <div className="relative w-48 h-48 mx-auto mb-6">
        <svg className="w-48 h-48 -rotate-90" viewBox="0 0 120 120">
          <circle cx="60" cy="60" r="52" stroke="rgba(255,255,255,0.05)" strokeWidth="8" fill="none" />
          <circle cx="60" cy="60" r="52" stroke={riskColor} strokeWidth="8" fill="none" strokeDasharray={`${(pct / 100) * 327} 327`} strokeLinecap="round" className="transition-all duration-1000" />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="stat-number text-5xl text-white">{totalScore}</span>
          <span className="text-xs text-[#94a8be]">/ {maxScore}</span>
        </div>
      </div>
      <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full" style={{ backgroundColor: `${riskColor}15`, border: `1px solid ${riskColor}30` }}>
        {riskLevel === "LOW" ? <CheckCircle className="w-4 h-4" style={{ color: riskColor }} /> : riskLevel === "MODERATE" ? <AlertTriangle className="w-4 h-4" style={{ color: riskColor }} /> : <XCircle className="w-4 h-4" style={{ color: riskColor }} />}
        <span className="text-sm font-bold" style={{ color: riskColor }}>{riskLevel} RISK</span>
      </div>
      <p className="text-[#94a8be] text-base max-w-xl mx-auto mt-6">
        {riskLevel === "LOW" && "You are ahead of most businesses, but there may still be hidden risks that only a professional assessment can uncover."}
        {riskLevel === "MODERATE" && "You have gaps that could lead to security incidents, operational disruption, or compliance issues. These are fixable with the right plan."}
        {riskLevel === "HIGH" && "Your business is at significant risk of disruption, data loss, or cyber attack. Immediate action is recommended to protect your operations."}
      </p>
    </div>
  );
}

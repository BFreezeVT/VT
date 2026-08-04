import { TrendingUp, Info } from "lucide-react";

export default function EfficiencyForecast({ annualHoursReclaimed, monthlySavingsForecast, teamSize, weeklyHoursPerPerson }) {
  return (
    <div data-testid="efficiency-forecast-card" className="bg-white/[0.03] border border-white/8 rounded-md p-6 text-center h-full flex flex-col justify-center">
      <div className="flex items-center justify-center gap-2 mb-3">
        <TrendingUp className="w-4 h-4 text-[#0077B3]" />
        <p className="text-white text-sm font-semibold">Personalized Efficiency Forecast</p>
      </div>
      <div className="grid grid-cols-2 gap-3 mb-3">
        <div>
          <p data-testid="forecast-annual-hours" className="stat-number text-2xl text-white">{annualHoursReclaimed.toLocaleString()}</p>
          <p className="text-[#c0cfe0] text-[11px] mt-1">Annual Hours Reclaimed</p>
        </div>
        <div>
          <p data-testid="forecast-monthly-savings" className="stat-number text-2xl text-[#0077B3]">${monthlySavingsForecast.toLocaleString()}</p>
          <p className="text-[#c0cfe0] text-[11px] mt-1">Monthly Savings Forecast</p>
        </div>
      </div>
      <p className="flex items-start gap-1.5 text-[#c0cfe0]/40 text-[10px] leading-relaxed text-left">
        <Info className="w-3 h-3 flex-shrink-0 mt-0.5" />
        Sample estimate based on a team of {teamSize} and ~{weeklyHoursPerPerson} manual hours/person/week from your answers - not a guarantee.
      </p>
    </div>
  );
}

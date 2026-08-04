// Same transparent, industry-average assumptions used on the standalone /ai-roi-preview
// calculator, but the automation-efficiency assumption scales with the business's own risk
// score - a higher risk score implies more manual, unmanaged, unmonitored processes, and
// therefore more time/cost recoverable by closing those gaps with managed IT + AI automation.
export const AVG_HOURLY_LABOR_COST = 38;
export const WEEKS_PER_YEAR = 52;
export const WEEKS_PER_MONTH = 4.33;
const BASE_EFFICIENCY_RATE = 0.35;
const MAX_RISK_EFFICIENCY_BONUS = 0.25;

export function calculateScorecardROI(pct, teamSize, manualHours) {
  const riskAdjustedEfficiency = BASE_EFFICIENCY_RATE + (pct / 100) * MAX_RISK_EFFICIENCY_BONUS;
  const weeklyManualHoursTotal = teamSize * manualHours;
  const weeklyHoursReclaimed = weeklyManualHoursTotal * riskAdjustedEfficiency;
  const annualHoursReclaimed = Math.round(weeklyHoursReclaimed * WEEKS_PER_YEAR);
  const annualSavings = Math.round(annualHoursReclaimed * AVG_HOURLY_LABOR_COST);
  const monthlySavings = Math.round(weeklyHoursReclaimed * WEEKS_PER_MONTH * AVG_HOURLY_LABOR_COST);
  return { riskAdjustedEfficiency, annualHoursReclaimed, annualSavings, monthlySavings };
}

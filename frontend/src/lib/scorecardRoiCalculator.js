// Same transparent, industry-average assumptions used on the standalone /ai-roi-preview
// calculator, but the automation-efficiency assumption scales with the business's own risk
// score - a higher risk score implies more manual, unmanaged, unmonitored processes, and
// therefore more time/cost recoverable by closing those gaps with managed IT + AI automation.
// The hourly labor cost is tailored to the industry selected at the start of the scorecard
// (see INDUSTRY_HOURLY_RATES in roiCalculator.js - single source of truth for both tools).
import { DEFAULT_HOURLY_LABOR_COST } from "./roiCalculator";

export const AVG_HOURLY_LABOR_COST = DEFAULT_HOURLY_LABOR_COST;
export const WEEKS_PER_YEAR = 52;
export const WEEKS_PER_MONTH = 4.33;
const BASE_EFFICIENCY_RATE = 0.35;
const MAX_RISK_EFFICIENCY_BONUS = 0.25;

export function calculateScorecardROI(pct, teamSize, manualHours, hourlyRate = DEFAULT_HOURLY_LABOR_COST) {
  const riskAdjustedEfficiency = BASE_EFFICIENCY_RATE + (pct / 100) * MAX_RISK_EFFICIENCY_BONUS;
  const weeklyManualHoursTotal = teamSize * manualHours;
  const weeklyHoursReclaimed = weeklyManualHoursTotal * riskAdjustedEfficiency;
  const annualHoursReclaimed = Math.round(weeklyHoursReclaimed * WEEKS_PER_YEAR);
  const annualSavings = Math.round(annualHoursReclaimed * hourlyRate);
  const monthlySavings = Math.round(weeklyHoursReclaimed * WEEKS_PER_MONTH * hourlyRate);
  return { riskAdjustedEfficiency, annualHoursReclaimed, annualSavings, monthlySavings };
}

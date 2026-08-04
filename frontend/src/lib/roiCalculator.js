// Shared, transparent industry-average assumptions used to power the Business Technology
// Assessment's "Personalized Efficiency Forecast". Same base assumptions as the standalone
// /ai-roi-preview calculator, but the automation-efficiency rate scales with the business's own
// automation maturity gap (the less automated they are today, the more they stand to reclaim),
// and the hourly labor cost is tailored to the industry the assessment already asked about.
export const WEEKS_PER_YEAR = 52;
export const WEEKS_PER_MONTH = 4.33;
const BASE_EFFICIENCY_RATE = 0.35;
const MAX_GAP_EFFICIENCY_BONUS = 0.25;
export const DEFAULT_HOURLY_LABOR_COST = 38;

// Directional, industry-average fully-loaded hourly labor costs (Minnesota market).
export const INDUSTRY_HOURLY_RATES = {
  "Construction": 42,
  "Financial Services": 45,
  "Manufacturing": 38,
  "Healthcare": 40,
  "Professional Services": 48,
  "Other": DEFAULT_HOURLY_LABOR_COST,
};

// Team size question answers are ranges - use representative midpoints for the math.
export const TEAM_SIZE_MIDPOINTS = { "1-10": 5, "11-50": 30, "51-200": 125, "200+": 250 };

// Weekly manual-hours-per-person question answers mapped to representative hour counts.
export const WEEKLY_MANUAL_HOURS_MIDPOINTS = {
  "Less than 5 hours": 3,
  "5-10 hours": 7,
  "10-20 hours": 15,
  "20+ hours": 22,
};

/**
 * Calculates a personalized, directional ROI forecast from Business Technology Assessment answers.
 * @param {object} answers - the assessment's answers state (keyed by question id)
 * @param {number} automationScore - 0-100 automation maturity score (higher = more automated)
 * @returns {{ teamSize: number, weeklyHoursPerPerson: number, hourlyRate: number, efficiencyRate: number, annualHoursReclaimed: number, monthlySavingsForecast: number, annualSavingsForecast: number }}
 */
export function calculateAssessmentROI(answers, automationScore) {
  const teamSize = TEAM_SIZE_MIDPOINTS[answers.team_size?.text] || 20;
  const weeklyHoursPerPerson = WEEKLY_MANUAL_HOURS_MIDPOINTS[answers.weekly_manual_hours?.text] || 8;
  const hourlyRate = INDUSTRY_HOURLY_RATES[answers.industry?.text] || DEFAULT_HOURLY_LABOR_COST;
  const automationGapPct = 100 - (automationScore ?? 50);
  const efficiencyRate = BASE_EFFICIENCY_RATE + (automationGapPct / 100) * MAX_GAP_EFFICIENCY_BONUS;

  const weeklyManualHoursTotal = teamSize * weeklyHoursPerPerson;
  const weeklyHoursReclaimed = weeklyManualHoursTotal * efficiencyRate;
  const annualHoursReclaimed = Math.round(weeklyHoursReclaimed * WEEKS_PER_YEAR);
  const monthlySavingsForecast = Math.round(weeklyHoursReclaimed * WEEKS_PER_MONTH * hourlyRate);
  const annualSavingsForecast = Math.round(annualHoursReclaimed * hourlyRate);

  return { teamSize, weeklyHoursPerPerson, hourlyRate, efficiencyRate, annualHoursReclaimed, monthlySavingsForecast, annualSavingsForecast };
}

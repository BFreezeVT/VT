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

// Shared industry list used by both the Business Technology Assessment and the Cyber Risk
// Scorecard's industry selector - single source of truth for the dropdown options.
export const INDUSTRY_OPTIONS = ["Construction", "Financial Services", "Manufacturing", "Healthcare", "Professional Services", "Other"];

// One-line "why this matters" note shown right after picking an industry, on both the
// Assessment and the Cyber Risk Scorecard's industry step - ties the tool directly to the
// visitor's world before they answer anything else.
export const INDUSTRY_INSIGHTS = {
  "Financial Services": "Financial services firms face growing compliance pressure (SOC 2, GLBA) - this assessment will flag your biggest audit-readiness gaps.",
  "Construction": "Construction firms often lose the most time to disconnected job sites and manual field updates - we'll size up how much that's costing you.",
  "Manufacturing": "Manufacturers increasingly face cyber risk on OT/production systems (PLCs, SCADA) - we'll check how exposed yours are.",
  "Healthcare": "Healthcare practices carry outsized risk around HIPAA compliance and PHI protection - this assessment will surface where you stand.",
  "Professional Services": "For professional services firms, client confidentiality and data protection directly drive trust and retention - let's see how solid yours is.",
  "Other": "Every business has its own mix of technology risks and opportunities - let's find yours.",
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

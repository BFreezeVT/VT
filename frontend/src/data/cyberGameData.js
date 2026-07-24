import { Target, Zap, Crown, Flame, ShieldCheck } from "lucide-react";

// Scenarios reframed as AI-driven threat simulations
export const scenarios = [
  // Vendor impersonation
  { id: 1, from: "accounting@sage-invoices-portal.com", subject: "Invoice #INV-2847 - Updated Payment Instructions", preview: "Your invoice is past due. To avoid service interruption, please wire $47,250 to the updated bank account below. New routing number: 0281...", threat: true, category: "Vendor Impersonation", explanation: "AI-generated vendor impersonation. The domain mimics a trusted vendor but is fraudulent. Changing payment routing is a hallmark of business email compromise.", difficulty: "easy" },
  { id: 2, from: "jthompson@turnerconstruction.com", subject: "Re: Updated Schedule for Phase 2 Steel Delivery", preview: "Hi Mike, Attached is the revised schedule for the Phase 2 steel delivery. Let me know if the Thursday window works for your crew.", threat: false, category: "Vendor Communication", explanation: "Legitimate vendor communication - references a specific project, uses a proper company domain, and has a natural conversational tone.", difficulty: "easy" },
  { id: 3, from: "billing@quickbooks-invoicing.net", subject: "Payment Received - $12,450.00 Applied to Invoice #3847", preview: "A payment of $12,450.00 has been applied. However, we noticed a discrepancy. Please log in to review and confirm the payment allocation.", threat: true, category: "Vendor Impersonation", explanation: "Impersonates a trusted financial platform. QuickBooks uses @intuit.com, not a lookalike domain. The discrepancy lure exploits curiosity.", difficulty: "hard" },
  // Payment change requests
  { id: 4, from: "ap@trusted-partner-billing.com", subject: "Updated Banking Information - Please Update Records", preview: "Due to a recent bank transition, please update our payment details in your system. New account and routing numbers are attached. This is effective immediately.", threat: true, category: "Payment Redirect", explanation: "Classic payment redirect attack. Legitimate vendors confirm banking changes via phone, not email. AI makes these messages increasingly convincing.", difficulty: "medium" },
  { id: 5, from: "shipping@fedex.com", subject: "FedEx: Your Package Is Scheduled for Delivery Tomorrow", preview: "Tracking #7892-4521-8834. Your package from Grainger Industrial Supply is out for delivery. Estimated arrival: December 5, 10am-2pm.", threat: false, category: "Legitimate Notification", explanation: "Legitimate shipping notification with specific tracking number, named sender, and realistic delivery window.", difficulty: "hard" },
  // Credential login prompts
  { id: 6, from: "it-support@yourcompany-helpdesk.io", subject: "Action Required: Password Expires in 2 Hours", preview: "Your network password expires today. Click the link below to reset it now or you will be locked out of all systems including email, VPN, and project management tools.", threat: true, category: "Credential Harvesting", explanation: "Fake IT support using a lookalike domain. Real IT departments use your actual company domain. The artificial deadline creates panic to bypass judgment.", difficulty: "easy" },
  { id: 7, from: "admin@m1crosoft-security.com", subject: "Critical: Unauthorized Access Detected on Your Account", preview: "Our AI systems detected 47 failed login attempts from Russia. Your account is at risk. Click immediately to secure your account and change your password.", threat: true, category: "Credential Harvesting", explanation: "AI-generated credential harvesting. Uses typosquatting (m1crosoft with a '1'). The dramatic scenario is designed to trigger an emotional, bypassing rational analysis.", difficulty: "hard" },
  { id: 8, from: "noreply@microsoft365.com", subject: "Your Microsoft 365 Subscription Renewal Confirmation", preview: "Thank you for renewing your Microsoft 365 Business Premium subscription. Your next billing date is January 15, 2026.", threat: false, category: "Legitimate Notification", explanation: "Legitimate platform notification from the correct domain. Informational only, no credential requests or urgent calls to action.", difficulty: "easy" },
  // Executive urgency requests
  { id: 9, from: "ceo@company-exec-office.co", subject: "Confidential - Need your help with something", preview: "Hey, are you at your desk? I need you to purchase some gift cards for a client meeting this afternoon. Keep this between us for now. I will reimburse you.", threat: true, category: "Executive Impersonation", explanation: "AI-powered executive impersonation. The fake domain (.co), gift card request, and secrecy demand are designed to exploit trust in authority.", difficulty: "easy" },
  { id: 10, from: "no-reply@zoom.us", subject: "Cloud Recording Available: Q4 Planning Meeting", preview: "Hi, your cloud recording for the Q4 Planning Meeting from Dec 3 is now available. The recording will be available for 30 days.", threat: false, category: "Legitimate Notification", explanation: "Legitimate platform notification from the correct domain referencing a specific meeting with standard retention info.", difficulty: "hard" },
  // AI-generated messages
  { id: 11, from: "payroll@company-hr-update.net", subject: "URGENT: Verify Your Direct Deposit Information", preview: "We have detected an issue with your bank details. Click here immediately to re-verify or your next paycheck will be delayed. This is an automated notification.", threat: true, category: "AI-Generated Threat", explanation: "AI-generated social engineering. The domain is suspicious, urgency language manipulates behavior, and threatening delayed pay exploits financial anxiety.", difficulty: "easy" },
  { id: 12, from: "docusign@docusign-notifications.net", subject: "Action Required: Sign Your Updated Service Agreement", preview: "John Smith has sent you a document to review and sign. Please complete by end of business today. Click here to review document.", threat: true, category: "AI-Generated Threat", explanation: "AI-crafted impersonation of a trusted platform. Real DocuSign uses @docusign.com. The generic sender name and urgency are red flags obscured by familiar formatting.", difficulty: "hard" },
  { id: 13, from: "hr@company.com", subject: "Updated PTO Policy - Effective January 1", preview: "Hi team, Please review the attached updated PTO policy. Key changes include increased carryover limits and a new floating holiday. Questions? Reach out to HR.", threat: false, category: "Legitimate Communication", explanation: "Legitimate internal communication from the correct company domain with routine policy content and no urgent calls to action.", difficulty: "medium" },
  { id: 14, from: "security@amaz0n-verify.com", subject: "Your Amazon Account Has Been Locked", preview: "We detected suspicious activity on your account. Please verify your identity within 24 hours or your account will be permanently suspended.", threat: true, category: "AI-Generated Threat", explanation: "AI-enhanced account takeover attempt. Uses typosquatting (amaz0n with a zero). The suspension threat and 24-hour deadline manufacture panic.", difficulty: "medium" },
  { id: 15, from: "procore-notifications@procore.com", subject: "Daily Log Submitted for Riverside Commons - Dec 4", preview: "A new daily log has been submitted by Site Superintendent Dave Martinez for the Riverside Commons project.", threat: false, category: "Legitimate Communication", explanation: "Legitimate platform notification from the correct domain with specific project details and named team member.", difficulty: "medium" },
];

export const DIFFICULTIES = {
  easy: { label: "Awareness", icon: Target, timer: 0, count: 5, pool: "easy", color: "text-[#0077B3]" },
  medium: { label: "Decision-Maker", icon: Zap, timer: 20, count: 6, pool: "all", color: "text-[#FF5722]" },
  hard: { label: "Executive", icon: Crown, timer: 12, count: 7, pool: "hard", color: "text-[#FF5722]" },
};

export const BADGES = [
  { id: "first_game", label: "First Assessment", desc: "Complete your first simulation", icon: Target },
  { id: "perfect", label: "Perfect Judgment", desc: "Every response correct", icon: Crown },
  { id: "speed_demon", label: "Quick Thinker", desc: "Respond in under 5 seconds", icon: Zap },
  { id: "streak_3", label: "Sharp Instincts", desc: "3 correct in a row", icon: Flame },
  { id: "all_modes", label: "Full Spectrum", desc: "Complete all difficulty levels", icon: ShieldCheck },
];

export function getStoredData() {
  try {
    const raw = localStorage.getItem("veracity_hri");
    return raw ? JSON.parse(raw) : { highScores: {}, badges: [], gamesPlayed: 0, modesCompleted: [] };
  } catch (e) { console.warn("Failed to read stored game data:", e); return { highScores: {}, badges: [], gamesPlayed: 0, modesCompleted: [] }; }
}

export function storeData(data) {
  try { localStorage.setItem("veracity_hri", JSON.stringify(data)); } catch (e) { console.warn("Failed to persist game data:", e); }
}

export function getCorrectAction(scenario) {
  if (scenario.threat) return "report";
  return "trust";
}

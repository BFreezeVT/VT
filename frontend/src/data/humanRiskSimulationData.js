const humanRiskSimulationData = {
  slug: "human-risk-simulation",
  name: "Human Risk Simulation",
  headline: "How Would Your Team Respond to Real-World AI-Driven Threats?",
  subhead: "Human Risk Simulation is a free, interactive assessment that tests real employee decision-making against AI-generated phishing and social engineering scenarios - revealing your organization's true human risk exposure before an attacker does.",
  heroStat: { value: "68%", label: "of breaches involve a human element - error, social engineering, or misuse (Verizon DBIR 2025)" },
  answerBoxQ: "What is a Human Risk Simulation?",
  answerBoxA: "A Human Risk Simulation is an interactive assessment that presents employees with realistic, AI-generated phishing emails, vendor impersonation attempts, and social engineering scenarios, then measures how they respond - trust, verify, report, or ignore. Unlike a static training video or a written policy quiz, it produces a quantifiable Human Risk Score based on actual decision-making under realistic conditions, giving organizations a data-driven view of where their people - not just their technology - are exposed.",
  whyItMatters: {
    title: "Why Human Behavior Is the Largest Cybersecurity Risk",
    body: "Firewalls, endpoint detection, and email filtering have gotten very good at stopping known threats. So attackers have adapted - they target the one control that's hardest to patch: human judgment. Well over half of confirmed breaches now involve a human element, whether that's a clicked link, a spoofed invoice approved without a second look, or a password reused across systems. No amount of technical control fully closes that gap. The organizations that reduce human risk are the ones that measure it directly, then train against the specific decisions their people actually get wrong - not a generic annual video.",
  },
  aiThreats: {
    title: "AI-Driven Phishing and Social Engineering Threats",
    body: "Generative AI has eliminated the old tells - broken English, obviously fake logos, awkward phrasing - that used to make phishing easy to spot. Today's AI-crafted attacks reproduce a vendor's exact tone, reference real project details scraped from public sources, and generate believable urgency without a single grammar mistake. Executive impersonation, invoice fraud, and credential-harvesting attempts are now personalized at scale, which is why Veracity's simulation scenarios are modeled on real 2025-2026 AI-driven attack patterns - not outdated phishing examples your team has already learned to recognize.",
  },
  levels: [
    { key: "easy", title: "Awareness Level", desc: "A foundational set of scenarios covering common vendor impersonation, credential harvesting, and legitimate-message recognition - designed to establish a baseline for how your broader team currently responds to everyday threats." },
    { key: "medium", title: "Decision-Maker Level", desc: "Timed, higher-pressure scenarios covering payment redirect fraud, AI-generated social engineering, and ambiguous requests that require judgment under time constraints - built for managers and staff who handle approvals, payments, or vendor communication." },
    { key: "hard", title: "Executive Level", desc: "The most sophisticated scenarios, including executive impersonation, board-level urgency tactics, and highly targeted AI-generated messages designed specifically to bypass senior leaders who assume they're not the target - because increasingly, they are." },
  ],
  commonMistakes: [
    { title: "Trusting Based on Familiarity Alone", desc: "Recognizing a vendor name or logo isn't verification - AI-generated impersonation reproduces both convincingly." },
    { title: "Acting on Urgency Without Verifying", desc: "Manufactured urgency (\"respond within 2 hours or your account is locked\") is designed specifically to bypass normal judgment." },
    { title: "Ignoring Instead of Reporting", desc: "Deleting a suspicious message feels safe, but it means IT never learns a targeted campaign is in progress against your organization." },
    { title: "Assuming Executives Aren't Targets", desc: "Executive impersonation and business email compromise specifically target leadership, exactly because they're assumed to be low-risk." },
    { title: "Treating Every Verification the Same Way", desc: "Replying to the suspicious email to \"verify\" it doesn't count - attackers control that inbox. Verification requires a separate, known channel." },
  ],
  whyTrainingFails: {
    title: "Why Security Awareness Training Often Fails",
    body: "Most security awareness training is an annual video followed by a multiple-choice quiz - passive content that measures whether someone clicked through slides, not whether they'd actually make the right call under pressure. It's rarely scenario-based, rarely tailored to how your specific industry gets targeted, and almost never measures real decision-making. The result: organizations report 100% training completion and still fall for phishing simulations weeks later. Behavior change requires practicing the actual decision - trust, verify, report, or ignore - under realistic conditions, then getting immediate feedback on what was missed.",
  },
  measurement: {
    title: "How Organizations Can Measure Human Risk",
    body: "Human risk becomes manageable once it's measurable. Instead of assuming your team is \"probably fine\" after annual training, a Human Risk Simulation produces a concrete Human Risk Score based on real responses to realistic scenarios - broken down by threat category, response time, and decision accuracy. That score can be tracked over time, benchmarked across departments or difficulty levels, and used to target follow-up training at the specific gaps that actually exist, rather than repeating content your team has already mastered.",
  },
  faqs: [
    { q: "Is the Human Risk Simulation the same as a phishing test?", a: "It's broader. Traditional phishing tests typically measure one thing - whether someone clicks a link. The Human Risk Simulation covers multiple threat categories (vendor impersonation, payment fraud, credential harvesting, executive impersonation) across three difficulty levels, and scores the full decision - trust, verify, report, or ignore - not just click-through rate." },
    { q: "How long does the simulation take?", a: "The Awareness level takes about 3-5 minutes. Decision-Maker and Executive levels run slightly longer due to timed scenarios. Most users complete all three levels in under 15 minutes." },
    { q: "Is this simulation free?", a: "Yes. The Human Risk Simulation is a free tool available on our homepage - no login required to play through a level and see your Human Risk Score." },
    { q: "Can we run this across our whole team, not just one person?", a: "Yes. Many organizations use this as an informal team exercise, then follow up with Veracity for department-wide security awareness training informed by the specific gaps the simulation reveals." },
    { q: "What happens after I get my Human Risk Score?", a: "You can request your results and a personalized action plan directly from the results screen. Veracity's team reviews common gap patterns and recommends targeted next steps - from specific training topics to broader email security controls." },
    { q: "Does a high Human Risk Score mean our team is untrainable?", a: "No - it means you now have a specific, measurable starting point. Every organization we've assessed has improved with targeted, scenario-based follow-up training informed by real results rather than generic content." },
  ],
  ctaText: "Take the Full Simulation",
};

export default humanRiskSimulationData;

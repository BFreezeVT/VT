export default function ROIAnalysisSection({ annualHoursReclaimed, monthlySavingsForecast }) {
  return (
    <div data-testid="roi-analysis-section" className="max-w-3xl mx-auto mb-12 pt-8 border-t border-white/10">
      <h3 className="text-white font-bold text-xl mb-6" style={{ fontFamily: "Outfit" }}>
        ROI Analysis: How Managed AI Captures These Savings
      </h3>

      <div className="space-y-6 text-[#c0cfe0] text-sm leading-relaxed">
        <div>
          <h4 className="text-white font-semibold text-sm mb-2" style={{ fontFamily: "Outfit" }}>Where the Hours Actually Go</h4>
          <p>
            Your answers point to {annualHoursReclaimed.toLocaleString()} hours a year currently absorbed by manual, repetitive work - data entry, scheduling, status reporting, and system handoffs that exist only because your tools don&rsquo;t talk to each other automatically. That figure translates to roughly ${monthlySavingsForecast.toLocaleString()} a month in fully-loaded labor cost that&rsquo;s effectively invisible on a P&amp;L, because it&rsquo;s buried inside salaries rather than itemized as a line item. Most leadership teams underestimate this number precisely because it never shows up as a single expense - it&rsquo;s distributed across every employee who spends part of their week on work a system should be doing instead.
          </p>
        </div>

        <div>
          <h4 className="text-white font-semibold text-sm mb-2" style={{ fontFamily: "Outfit" }}>How Managed AI Closes the Gap</h4>
          <p>
            Managed AI captures this value in three concrete ways. First, workflow automation eliminates the manual triggers between systems - a completed form automatically updates a CRM, generates an invoice, or notifies the right person, instead of a human doing that transfer by hand. Second, AI-assisted document and communication processing handles the repetitive reading, summarizing, and routing work that consumes hours without requiring real judgment. Third, unified monitoring and reporting remove the recurring task of manually pulling data from five different systems into one dashboard every morning. Together, these three levers are what separate a business that merely "has AI tools" from one that has actually automated its operations.
          </p>
        </div>

        <div>
          <h4 className="text-white font-semibold text-sm mb-2" style={{ fontFamily: "Outfit" }}>From Estimate to Executed Plan</h4>
          <p>
            These figures are a sample estimate built from your assessment answers and industry-average labor costs - directionally accurate, not a signed proposal. Converting them into a defensible number requires mapping your actual workflows, systems, and team structure. That&rsquo;s exactly what a review with Veracity Technologies does: prioritize the automation opportunities with the fastest payback, and sequence them into a roadmap your team can actually execute without disrupting daily operations.
          </p>
        </div>
      </div>
    </div>
  );
}

import Breadcrumbs from "../../components/Breadcrumbs";
import OfferLayout from "../Offers/OfferLayout";
import OfferLeadForm from "../Offers/OfferLeadForm";

const STEPS = [
  {
    n: 1,
    title: "Request your AI Readiness Innovation Assessment using the form on this page",
    body: "Tell us where to reach you. It only takes a minute.",
  },
  {
    n: 2,
    title: "We email your AIRIA assessment link via Breach Secure Now",
    body: "You will get a link to the 10-minute assessment. Complete it when it suits you.",
  },
  {
    n: 3,
    title: "We schedule a brief assessment review",
    body: "We walk through your results together and map the next steps.",
  },
];

const BENEFITS = [
  {
    title: "Trusted AI Guidance",
    body: "Straight answers on what AI can and cannot do for your business, from people who implement it every day.",
  },
  {
    title: "Customized AI Strategy Support using the AI Readiness Innovation Assessment (AIRIA) framework",
    body: "A structured look at where your organization stands and what to prioritize first.",
  },
  {
    title: "Cybersecurity First Approach",
    body: "Including what is safe to share in tools like ChatGPT, and how AI is used to craft convincing, malicious scams.",
  },
  {
    title: "A clear path to measurable outcomes through automation and innovation",
    body: "So you gain the rewards without increasing risk.",
  },
];

export default function AiriaRequest() {
  return (
    <OfferLayout
      title="Free AI Readiness Innovation Assessment (AIRIA) | Veracity Technologies"
      description="Request your free AI Readiness Innovation Assessment from Veracity Technologies. A 10-minute assessment shows whether your organization is ready for AI safely and strategically, with a brief review of your results."
      slug="airia-request"
      pageName="AI Readiness Innovation Assessment"
      testId="airia-request-page"
      cta={{
        title: "Explore AI Safely, Strategically, and Successfully",
        text: "Start with a free Business Technology Assessment to see exactly where your organization stands, and where the biggest opportunities are.",
        buttonText: "Start Your Business Technology Assessment",
      }}
    >
      <section className="py-24 lg:py-28">
        <div className="max-w-5xl mx-auto px-6">
          <div className="flex justify-center">
            <Breadcrumbs items={[{ label: "AI Readiness Innovation Assessment" }]} />
          </div>
          <p className="overline text-[#0077B3] mb-4 text-center">Free Assessment for Twin Cities Businesses</p>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-none text-white mb-6 text-center" style={{ fontFamily: "Outfit" }}>
            Is Your Organization Ready for AI, Safely and Strategically?
          </h1>
          <p className="text-base md:text-lg text-[#94a8be] leading-relaxed mb-4 max-w-2xl mx-auto text-center">
            AI is already integrated into the tools your team uses every day, from Microsoft 365 to CRMs and beyond. While AI brings huge productivity gains, it also introduces new cybersecurity risks and strategic challenges.
          </p>
          <p className="text-base md:text-lg text-white leading-relaxed mb-12 max-w-2xl mx-auto text-center font-semibold">
            Request your free AI Readiness Innovation Assessment. It only takes 10 minutes.
          </p>

          <div className="max-w-2xl mx-auto">
            <OfferLeadForm
              offerName="AI Readiness Innovation Assessment (AIRIA)"
              sourcePage="airia-request"
              heading="Request your free AI Readiness Innovation Assessment"
              subheading="We will email your assessment link via Breach Secure Now, then schedule a brief review of your results."
              testId="airia-request-form"
              buttonText="Request My Free Assessment"
            />
          </div>
        </div>
      </section>

      <section className="py-16 bg-[#0a1628]">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-8" style={{ fontFamily: "Outfit" }}>
            How It Works
          </h2>
          <div className="space-y-6">
            {STEPS.map((s) => (
              <div key={s.n} className="flex gap-4 bg-white/5 border border-white/10 rounded-lg p-6">
                <span className="flex-shrink-0 w-10 h-10 rounded-full bg-[#0077B3] text-white text-lg font-bold flex items-center justify-center">{s.n}</span>
                <div>
                  <h3 className="text-lg font-bold text-white mb-1" style={{ fontFamily: "Outfit" }}>{s.title}</h3>
                  <p className="text-[#94a8be] leading-relaxed text-sm">{s.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6" style={{ fontFamily: "Outfit" }}>
            We Can Help You Explore AI Safely, Strategically, and Successfully
          </h2>
          <p className="text-[#94a8be] leading-relaxed mb-8">
            So you gain the rewards without increasing risk.
          </p>
          <div className="grid sm:grid-cols-2 gap-6">
            {BENEFITS.map((b) => (
              <div key={b.title} className="bg-white/5 border border-white/10 rounded-lg p-6">
                <h3 className="text-base font-bold text-white mb-2" style={{ fontFamily: "Outfit" }}>{b.title}</h3>
                <p className="text-[#94a8be] leading-relaxed text-sm">{b.body}</p>
              </div>
            ))}
          </div>
          <p className="text-[#94a8be] leading-relaxed mt-8">
            Prefer to talk first? Call us at <a href="tel:9529417333" className="text-white hover:underline">(952) 941-7333</a>. For client support, call (952) 767-6111.
          </p>
        </div>
      </section>
    </OfferLayout>
  );
}

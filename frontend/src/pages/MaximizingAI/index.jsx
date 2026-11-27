import Breadcrumbs from "../../components/Breadcrumbs";
import OfferLayout from "../Offers/OfferLayout";
import OfferLeadForm from "../Offers/OfferLeadForm";
import { buildBookSchema } from "../Offers/offerSchemas";

const STATS = [
  { value: "87% of small businesses", label: "Using AI report increased productivity" },
  { value: "2x faster growth", label: "AI-powered businesses grow 2x faster on average" },
  { value: "60% of cyber-attacks", label: "Now involve AI" },
];

const INSIDE = [
  "How to automate routine, time-consuming tasks so you can focus on strategy, customers, and growth.",
  "Proven, budget-friendly AI tools that small and mid-sized businesses are using successfully right now.",
  "Real case studies from business owners who have streamlined operations, reduced costs, and boosted productivity with AI.",
  "Practical ways to apply AI in cybersecurity, marketing, operations, compliance, and customer service.",
  "Common pitfalls that waste money or create risk, and how to choose solutions that actually deliver results.",
];

const FOR_YOU = [
  "Is curious about AI but unsure where to start, or who to trust",
  "Wants to streamline operations and free up your team's time",
  "Is ready to boost productivity and improve customer experiences",
  "Needs to strengthen cybersecurity without slowing growth",
];

export default function MaximizingAI() {
  return (
    <OfferLayout
      title="Maximizing Business Potential With AI | Veracity Technologies"
      description="Get the free book Maximizing Business Potential With AI by Todd Friesen and Sandra Johnson. Proven strategies, practical tools, and real-world success stories to harness AI in your business, without being a tech expert or breaking the budget."
      slug="maximizing-ai"
      pageName="Maximizing AI"
      testId="maximizing-ai-page"
      extraSchemas={[buildBookSchema("Maximizing Business Potential With AI", "Proven strategies, practical tools, and real-world success stories to harness AI in your business.", "maximizing-ai", ["Todd Friesen", "Sandra Johnson"])]}
      cta={{
        title: "AI Is Not Just the Future. It Is Your Competitive Edge Today.",
        text: "Start with a free Business Technology Assessment to see exactly where your organization stands, and where the biggest opportunities are.",
        buttonText: "Start Your Business Technology Assessment",
      }}
    >
      <section className="py-24 lg:py-28">
        <div className="max-w-5xl mx-auto px-6">
          <div className="flex justify-center">
            <Breadcrumbs items={[{ label: "Maximizing AI" }]} />
          </div>
          <p className="overline text-[#0077B3] mb-4 text-center">Free Book by Veracity Technologies Leadership</p>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-none text-white mb-6 text-center" style={{ fontFamily: "Outfit" }}>
            Maximizing Business Potential With AI
          </h1>
          <p className="text-base md:text-lg text-[#94a8be] leading-relaxed mb-4 max-w-2xl mx-auto text-center">
            Unlock proven strategies, practical tools, and real-world success stories to harness AI in your business.
          </p>
          <p className="text-base md:text-lg text-[#c8d4e2] leading-relaxed mb-12 max-w-2xl mx-auto text-center">
            Discover how business owners across industries are using AI to work smarter, serve clients better, strengthen cybersecurity, and stay ahead of change, without being tech experts or breaking the budget.
          </p>

          <div className="max-w-2xl mx-auto">
            <OfferLeadForm
              offerName="Maximizing Business Potential With AI (free book)"
              sourcePage="maximizing-ai"
              heading="Get your free copy of the book"
              subheading="Fill out the form and we will send your copy. No cost, no obligation."
              testId="maximizing-ai-form"
              buttonText="Get My Free Copy"
            />
          </div>
        </div>
      </section>

      <section className="py-16 bg-[#0a1628]">
        <div className="max-w-4xl mx-auto px-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
            {STATS.map((s) => (
              <div key={s.value} className="bg-white/5 border border-white/10 rounded-lg p-6">
                <p className="text-3xl font-extrabold text-white mb-2" style={{ fontFamily: "Outfit" }}>{s.value}</p>
                <p className="text-[#94a8be] text-sm">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6" style={{ fontFamily: "Outfit" }}>
            AI Is Not Just the Future. It Is Your Competitive Edge Today.
          </h2>
          <p className="text-[#94a8be] leading-relaxed mb-4">
            From tightening cybersecurity to streamlining operations and reducing costs, business owners are facing relentless change and rising pressure to deliver more with fewer resources.
          </p>
          <p className="text-[#94a8be] leading-relaxed mb-8">
            You do not need to code, build a tech team, or spend a fortune to harness AI. This book reveals proven, real-world strategies from business leaders who are already using AI to grow revenue, protect against evolving threats, and run smarter, without getting lost in hype or investing in tools that do not pay off.
          </p>
          <h3 className="text-xl font-bold text-white mb-4" style={{ fontFamily: "Outfit" }}>What you will discover inside the book:</h3>
          <ul className="space-y-3">
            {INSIDE.map((item) => (
              <li key={item} className="flex gap-3 text-[#c8d4e2] text-sm leading-relaxed">
                <span className="text-[#0077B3] font-bold flex-shrink-0">&check;</span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="py-16 bg-[#0a1628]">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6" style={{ fontFamily: "Outfit" }}>
            Is This Book for You?
          </h2>
          <p className="text-[#94a8be] leading-relaxed mb-6">
            If you are a small business owner, entrepreneur, or manager who:
          </p>
          <ul className="space-y-3 mb-10">
            {FOR_YOU.map((item) => (
              <li key={item} className="flex gap-3 text-[#c8d4e2] text-sm leading-relaxed">
                <span className="text-[#0077B3] font-bold flex-shrink-0">&check;</span>
                {item}
              </li>
            ))}
          </ul>

          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6" style={{ fontFamily: "Outfit" }}>
            Meet the Authors: Todd Friesen and Sandra Johnson
          </h2>
          <p className="text-[#94a8be] leading-relaxed mb-4">
            Todd Friesen is a Managing Partner at Veracity Technologies, a leading managed IT services provider focused on helping small to mid-sized businesses in the Greater Minneapolis-St. Paul area thrive. Under Todd&rsquo;s leadership, Veracity is recognized for its strategic vision and disciplined, process-driven approach, especially in industries where security, compliance, and continuous innovation are paramount, such as finance, construction, and manufacturing. Though many of its clients operate locally, Veracity&rsquo;s influence extends nationwide through robust remote support and satellite offices.
          </p>
          <p className="text-[#94a8be] leading-relaxed mb-4">
            Todd&rsquo;s entry into tech was not conventional. He began studying veterinary science at the University of Minnesota, but a hands-on experience with computer automation changed his trajectory. He later refined his technical skills at Brown Institute, jumped into programming, and soon discovered strengths in sales, marketing, and leadership. In 1989, he founded what would become Veracity Technologies, growing it from a modest break-fix operation into a full-service, high-performance Managed Service Provider trusted across sectors.
          </p>
          <p className="text-[#94a8be] leading-relaxed mb-4">
            A U.S. Army Reserve officer for over three decades, Todd brings a military-inspired mindset to business. Mission clarity, discipline, and ongoing improvement are baked into Veracity&rsquo;s culture. This has shaped not only a strong internal team but also fostered deep, enduring client relationships defined by trust and shared outcomes.
          </p>
          <p className="text-[#94a8be] leading-relaxed mb-4">
            Todd is recognized as a forward-thinker in applying AI to drive practical outcomes for businesses. From streamlining operations to enhancing the competitive edge, he helps clients deploy technology in ways that truly matter. Under his leadership, Veracity achieved SOC 2 compliance and earned a spot on the prestigious MSP 501 list an impressive eight times, positioning it among the world&rsquo;s elite service providers.
          </p>
          <p className="text-[#94a8be] leading-relaxed mb-4">
            Sandra Johnson, MA, RCC, is a business strategist and executive coach with over two decades of experience. Much of Veracity&rsquo;s strength is amplified by Todd&rsquo;s collaboration with Sandra. Her background includes leadership experience at Fortune 100 companies, entrepreneurial ventures, and transformation consulting. Her results-driven approach has delivered significant turnarounds: vaulting teams from the bottom 20% to number one, sparking 30% growth in stagnant units, and generating 20% ROE (Return on Equity) during downturns.
          </p>
          <p className="text-[#94a8be] leading-relaxed">
            A former leader at Marriott International, she designed leadership pipelines that consistently produced high-performing executives. She is also a university mentor, speaker, board director, and a founding contributor to the Worldwide Association of Business Coaches. Sandra holds a BA in English with a focus on Business and Political Science, and an MA in Communication from Bethel University. She is a Registered Corporate Coach with certifications in training, coaching, and human dynamics. Together, Todd and Sandra offer clients a unique blend of technical precision and people-centered strategy, guiding organizations through meaningful and sustainable growth in an era of rapid change.
          </p>
        </div>
      </section>
    </OfferLayout>
  );
}

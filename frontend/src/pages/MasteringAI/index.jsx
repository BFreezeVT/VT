import Breadcrumbs from "../../components/Breadcrumbs";
import OfferLayout from "../Offers/OfferLayout";
import OfferLeadForm from "../Offers/OfferLeadForm";
import { buildBookSchema } from "../Offers/offerSchemas";

const STATS = [
  { value: "$10.5 trillion", label: "Projected global cost of cybercrime by 2025" },
  { value: "90% of breaches", label: "Occur in small businesses" },
  { value: "60% of small businesses", label: "Close within six months of a major hack" },
];

const INSIDE = [
  "How AI can take repetitive tasks off your plate, so you can focus on growing your business",
  "Which affordable tools are actually working for small businesses like yours",
  "Real stories from business owners who have saved time and money using AI",
  "How to use AI for cybersecurity, marketing, and better customer service",
  "What to avoid, and how to stay away from overhyped, overpriced tools",
];

const FOR_YOU = [
  "Feels overwhelmed by all the AI buzz and wants simple, clear guidance",
  "Wants to protect your business without spending a fortune",
  "Is ready to work smarter and take advantage of what is next in business tech",
];

export default function MasteringAI() {
  return (
    <OfferLayout
      title="Mastering AI for Business Success | Veracity Technologies"
      description="Get the free book Mastering AI for Business Success by Todd Friesen and Jon Hutchins. Real-world AI strategies, tools, and use cases to drive growth, efficiency, and security, without needing a tech team or a massive budget."
      slug="mastering-ai"
      pageName="Mastering AI"
      testId="mastering-ai-page"
      extraSchemas={[buildBookSchema("Mastering AI for Business Success", "Real-world AI strategies, tools, and use cases to drive growth, efficiency, and security for small and midsize businesses.", "mastering-ai", ["Todd Friesen", "Jon Hutchins"])]}
      cta={{
        title: "AI Is Already Changing the Rules. Do Not Get Left Behind.",
        text: "Mastering AI for Business Success gives you a clear, proven path to start using AI now, to protect what you have built and prepare for what is ahead.",
        buttonText: "Start Your Business Technology Assessment",
      }}
    >
      <section className="py-24 lg:py-28">
        <div className="max-w-5xl mx-auto px-6">
          <div className="flex justify-center">
            <Breadcrumbs items={[{ label: "Mastering AI" }]} />
          </div>
          <p className="overline text-[#0077B3] mb-4 text-center">Free Book by Veracity Technologies Leadership</p>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-none text-white mb-6 text-center" style={{ fontFamily: "Outfit" }}>
            Mastering AI for Business Success
          </h1>
          <p className="text-base md:text-lg text-[#94a8be] leading-relaxed mb-4 max-w-2xl mx-auto text-center">
            Unlock the strategies, tools, and real-world use cases to drive growth, efficiency, and security with AI.
          </p>
          <p className="text-base md:text-lg text-[#c8d4e2] leading-relaxed mb-12 max-w-2xl mx-auto text-center">
            Discover how everyday business owners are using AI to save time, cut costs, and stay secure, without needing a tech team or a massive budget.
          </p>

          <div className="max-w-2xl mx-auto">
            <OfferLeadForm
              offerName="Mastering AI for Business Success (free book)"
              sourcePage="mastering-ai"
              heading="Get your free copy of the book"
              subheading="Fill out the form and we will send your copy. No cost, no obligation."
              testId="mastering-ai-form"
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
            AI Is Not the Future. It Is Already Changing How You Do Business.
          </h2>
          <p className="text-[#94a8be] leading-relaxed mb-4">
            Whether it is a cyber-attack, rising overhead, or trying to do more with less, small business owners are under more pressure than ever. But you do not need to be a tech expert to stay competitive.
          </p>
          <p className="text-[#94a8be] leading-relaxed mb-8">
            This book gives you the real-world strategies and tools smart business leaders are using to grow, stay secure, and run more efficiently with AI, without hiring a data science team or wasting money on shiny tools that do not deliver.
          </p>
          <h3 className="text-xl font-bold text-white mb-4" style={{ fontFamily: "Outfit" }}>What you will learn inside:</h3>
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
            Meet the Authors: Todd Friesen and Jon Hutchins
          </h2>
          <p className="text-[#94a8be] leading-relaxed mb-4">
            Todd Friesen and Jon Hutchins, managing partners of Veracity Technologies, lead the delivery of advanced IT solutions for small- and medium-sized businesses in the Greater Minneapolis-St. Paul area. With over 35 years of combined experience, Veracity is a trusted partner to financial services, construction, and manufacturing firms, offering secure, compliant IT systems and helping businesses harness AI for efficiency and growth.
          </p>
          <p className="text-[#94a8be] leading-relaxed mb-4">
            Todd founded Veracity Technologies (originally TechCom) in 1989. He retired in 2010 after a 31-year career in the U.S. Army Reserve, where he served in the Chemical Corps, helping protect the nation from nuclear, biological, and chemical threats. A University of Minnesota graduate and ROTC alumnus, Todd credits his military background, emphasizing leadership, discipline, and mission-driven execution, for his success in business.
          </p>
          <p className="text-[#94a8be] leading-relaxed mb-4">
            Jon joined the company in 1997, bringing expertise in Information Systems Management and earning numerous IT certifications. He quickly became a subject matter expert and a client favorite. In 2007, Jon helped transform the business from break-fix services to a managed service provider (MSP) model. A year later, Todd named him managing partner. Jon&rsquo;s success stems from his focus on professional development, client relationships, and strategic partnerships.
          </p>
          <p className="text-[#94a8be] leading-relaxed">
            Together, Todd and Jon emphasize teamwork, disciplined leadership, and a client-centric culture, resulting in low staff turnover and strong customer loyalty. Financial operations are overseen by third partner Tim Andrea. Veracity Technologies maintains SOC 2 (System and Organizational Controls 2) compliance, meeting rigorous standards for data security and operational integrity, a distinction held by only about five percent of MSPs worldwide. The company is an eight-time MSP 501 award winner, honored for excellence in innovation, customer success, and financial performance. Veracity is also proud to have received the Employer Support of the Guard and Reserve (ESGR) award for outstanding support of National Guard and Reserve employees.
          </p>
        </div>
      </section>
    </OfferLayout>
  );
}

import Breadcrumbs from "../../components/Breadcrumbs";
import OfferLayout from "../Offers/OfferLayout";
import OfferLeadForm from "../Offers/OfferLeadForm";

const QUESTIONS = [
  "Are your IT systems truly secured from hackers, viruses, and rogue employees?",
  "Are your backups configured properly to ensure that you could be back up and running again fast in a disaster?",
  "Are you unknowingly exposing your company to expensive fines and litigation under new data breach laws?",
  "Could you utilize cheaper and more efficient cloud computing technologies to lower IT costs and make it easier to work remotely?",
  "Are your systems optimized for maximum speed and performance? (We can tell you, 99% of the computer networks we review are not.)",
];

const TESTIMONIALS = [
  {
    title: "Dependable Support!",
    quote: "Dependability is key since we joined forces with Veracity's tech support. Quick response and a proactive approach ensure our issues are tackled ASAP, usually even before we notice them, an impressive display of their commitment. What makes them stand out is their foresight, anticipation of future needs and projects to prevent potential crises. With a decade-long partnership yielding exceptional service, we wholeheartedly recommend giving them a shot. They consistently deliver satisfaction and peace of mind.",
    name: "Roger Raeth",
    role: "Systems Manager, Korbel Associates, Inc.",
  },
  {
    title: "Empower Your Business with Veracity Technologies",
    quote: "Partnering with Veracity Technologies has transformed our organization by instilling immense confidence at all levels. Their dedicated team provides a deep understanding of our IT ecosystem, enabling streamlined best practices and industry insights without the need for us to become experts. Veracity's exceptional focus on relationships and customer service sets them apart. They truly feel like part of our team, caring deeply about our success.",
    name: "Jordan Sanford",
    role: "Vice President, Prestige Global Meeting Source",
  },
  {
    title: "Still Thriving with Veracity after 12 years!",
    quote: "Partnering with Veracity Technologies has changed our company, ensuring all licenses, equipment, and employee computer issues are efficiently managed. Their knowledgeable staff and responsive support set them apart from other IT firms. With over 12 years of partnership, Veracity's professionalism and commitment to tailored solutions have been unmatched. I highly recommend Veracity Technologies. They deliver exceptional service and expertise that is second to none.",
    name: "Nadine Wikstrom",
    role: "Director of Operations, SEIU Local 284",
  },
];

export default function FreeNetworkAssessment() {
  return (
    <OfferLayout
      title="Free Network Assessment | Veracity Technologies"
      description="Get a free network assessment from Veracity Technologies in Minnetonka, MN. We answer your top security, backup, compliance, and cost questions, and deliver a customized IT optimization plan. $100 check guarantee if you feel your time was wasted."
      slug="free-network-assessment"
      pageName="Free Network Assessment"
      testId="free-network-assessment-page"
      cta={{
        title: "Are You Ready for Better IT Support?",
        text: "Call us at (952) 941-7333 or start with a free Business Technology Assessment to see exactly where your organization stands.",
        buttonText: "Start Your Business Technology Assessment",
      }}
    >
      <section className="py-24 lg:py-28">
        <div className="max-w-5xl mx-auto px-6">
          <div className="flex justify-center">
            <Breadcrumbs items={[{ label: "Free Network Assessment" }]} />
          </div>
          <p className="overline text-[#0077B3] mb-4 text-center">Free Offer for Twin Cities Businesses</p>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-none text-white mb-6 text-center" style={{ fontFamily: "Outfit" }}>
            Free Network Assessment
          </h1>
          <p className="text-base md:text-lg text-[#94a8be] leading-relaxed mb-12 max-w-2xl mx-auto text-center">
            After conducting this free assessment, we will be able to answer your top questions, and deliver a customized IT optimization plan that shows you how to eliminate every nagging problem, work faster and easier, and lower IT costs wherever possible.
          </p>

          <div className="max-w-2xl mx-auto">
            <OfferLeadForm
              offerName="Free Network Assessment"
              sourcePage="free-network-assessment"
              heading="Sign me up for the free assessment"
              subheading="Simply fill out the form on this page to get started."
              testId="free-network-assessment-form"
              buttonText="Sign Me Up for the Free Assessment"
            />
            <p className="text-center text-sm text-[#94a8be] mt-4">
              Prefer to talk? Call us at <a href="tel:9529417333" className="text-white hover:underline">(952) 941-7333</a> or schedule a 10-minute Discovery Call.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 bg-[#0a1628]">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-8" style={{ fontFamily: "Outfit" }}>
            After Conducting This Free Assessment, We Will Be Able to Answer Your Top Questions, Such As:
          </h2>
          <ul className="space-y-4">
            {QUESTIONS.map((q, i) => (
              <li key={i} className="flex gap-4 bg-white/5 border border-white/10 rounded-lg p-4">
                <span className="flex-shrink-0 w-7 h-7 rounded-full bg-[#0077B3] text-white text-sm font-bold flex items-center justify-center">{i + 1}</span>
                <span className="text-[#c8d4e2] leading-relaxed text-sm">{q}</span>
              </li>
            ))}
          </ul>
          <p className="text-[#94a8be] leading-relaxed mt-8">
            Once we have a clear picture on the state, health, and performance of your current IT systems, we will then deliver a customized IT optimization plan that will show you how to eliminate every single nagging problem, enable you to work faster and easier, and lower IT costs wherever possible.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-8" style={{ fontFamily: "Outfit" }}>
            At the End of This Assessment, One of Three Things Will Happen
          </h2>
          <div className="space-y-6">
            <div className="bg-white/5 border border-white/10 rounded-lg p-6">
              <h3 className="text-lg font-bold text-white mb-2" style={{ fontFamily: "Outfit" }}>You love the plan and decide to implement it on your own.</h3>
              <p className="text-[#94a8be] leading-relaxed text-sm">If this is the case, we will wish you the best of luck and ask that you keep in touch with us to let us know how you are doing.</p>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-lg p-6">
              <h3 className="text-lg font-bold text-white mb-2" style={{ fontFamily: "Outfit" }}>You love the plan and ask to become our client so we can personally help you implement it ASAP.</h3>
              <p className="text-[#94a8be] leading-relaxed text-sm">If that is the case, we will knock it out of the park, and that is a promise.</p>
            </div>
            <div className="bg-white/5 border border-[#0077B3]/40 rounded-lg p-6">
              <h3 className="text-lg font-bold text-white mb-2" style={{ fontFamily: "Outfit" }}>Or finally, in the unlikely and unprecedented event that you feel like you wasted your time.</h3>
              <p className="text-[#94a8be] leading-relaxed text-sm">
                If we do not find a way to dramatically improve your situation, <strong className="text-white">we will send you a check for $100 immediately</strong>. No questions asked. Your time is your most valuable asset, and we respect that. To date, we have never had anyone say that we wasted their time, so we feel completely comfortable making this guarantee to you.
              </p>
            </div>
          </div>
          <p className="text-white leading-relaxed mt-8">
            Think about this. The worst that can happen is you get $100 for wasting an hour having an independent third party validate and review the security, speed, and health of your computer network. The best that can happen is we work together to finally take all IT complaints off your plate.
          </p>
        </div>
      </section>

      <section className="py-16 bg-[#0a1628]">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-8" style={{ fontFamily: "Outfit" }}>
            What Our Clients Say
          </h2>
          <div className="space-y-6">
            {TESTIMONIALS.map((t) => (
              <figure key={t.name} className="bg-white/5 border border-white/10 rounded-lg p-6">
                <h3 className="text-lg font-bold text-white mb-2" style={{ fontFamily: "Outfit" }}>{t.title}</h3>
                <blockquote className="text-[#c8d4e2] leading-relaxed mb-4 text-sm">&ldquo;{t.quote}&rdquo;</blockquote>
                <figcaption>
                  <p className="text-white font-semibold text-sm">{t.name}</p>
                  <p className="text-[#94a8be] text-xs">{t.role}</p>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>
    </OfferLayout>
  );
}

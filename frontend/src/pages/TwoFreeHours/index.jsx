import Breadcrumbs from "../../components/Breadcrumbs";
import OfferLayout from "../Offers/OfferLayout";
import OfferLeadForm from "../Offers/OfferLeadForm";

const TESTIMONIALS = [
  {
    quote: "Veracity Technologies has helped streamline our company's operations. The biggest advantage of partnering with them as our Technology support provider is the confidence and peace of mind they provide in our IT infrastructure. Their proactive, responsive, and knowledgeable team minimizes downtime and ensures consistent operations.",
    name: "Cody Nuernberg",
    role: "President, BLD Connection",
  },
  {
    quote: "The most significant benefit of working with Veracity has been their prompt response to issues and the expertise of the technical staff, who intimately understand our systems for complex projects. Their swift action ensures minimal downtime, while intimate knowledge of our environment brings unparalleled efficiency to our projects.",
    name: "Ryan Morris",
    role: "Vice President, Fraser Morris",
  },
];

const PROBLEMS = [
  {
    title: "Problem 1: You have constant technical problems.",
    body: "Maybe you have experienced this yourself: you hire a so-called IT expert to support your computer network, but every time they solve a problem, two more crop up. Or the problem they were supposed to have solved keeps coming back again and again. Then, to add insult to injury, they do not check their work, they keep charging you to come back and repair the same issues, or they waste your time trying to explain why the problem is happening instead of just taking care of it.",
  },
  {
    title: "Problem 2: They do not understand how critically important your time is.",
    body: "If you are like most busy executives we work with, you are the most important player on the team, with multiple time-sensitive projects and critical deadlines that can not be missed. Yet most computer guys do not seem to understand this. When you call their office, you get voice mail. When they finally call you back, they waste your time with a million questions and walk you through mind-numbing tasks like rebooting, wasting even more of your time while they try to get a clue. If they can not fix your computer that way, you have to wait around for them to show up, take it back to their office, fix it, and bring it back, a process that could take days. Meanwhile, you need to get back to work.",
  },
  {
    title: "Problem 3: Poor communication and service.",
    body: "From arrogant technicians who talk over your head to zero communication on the status of your requests and projects, another big problem many business owners have with their IT person is poor communication skills. On top of that, none of them seem to understand basic business concepts, and they want to have a conversation about the technical details rather than just getting it done. Imagine being able to just tell your consultant what you are trying to achieve in your business and they make it happen, and provide real value by advising you on how to make those outcomes happen faster, cheaper, and with less effort.",
  },
];

export default function TwoFreeHours() {
  return (
    <OfferLayout
      title="2 Free Hours of Emergency IT Support | Veracity Technologies"
      description="Get 2 free hours of emergency IT support from Veracity Technologies in Minnetonka, MN. No cost, no obligation, no high-pressure sales. A senior technician helps with your next computer crisis."
      slug="2-free-hours"
      pageName="2 Free Hours of Emergency Support"
      testId="two-free-hours-page"
      cta={{
        title: "Still Dealing with Slow, Incompetent IT Support?",
        text: "Start with a free Business Technology Assessment to see exactly where your organization stands, and where the biggest opportunities are.",
        buttonText: "Start Your Business Technology Assessment",
      }}
    >
      <section className="py-24 lg:py-28">
        <div className="max-w-5xl mx-auto px-6">
          <div className="flex justify-center">
            <Breadcrumbs items={[{ label: "2 Free Hours of Emergency Support" }]} />
          </div>
          <p className="overline text-[#0077B3] mb-4 text-center">Free Offer for Twin Cities Businesses</p>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-none text-white mb-6 text-center" style={{ fontFamily: "Outfit" }}>
            2 Free Hours of Emergency IT Support
          </h1>
          <p className="text-base md:text-lg text-[#94a8be] leading-relaxed mb-12 max-w-2xl mx-auto text-center">
            When your systems go down and your current IT person will not respond fast enough, we will help. Two hours from one of our most talented technicians, absolutely free.
          </p>

          <div className="max-w-2xl mx-auto">
            <OfferLeadForm
              offerName="2 Free Hours of Emergency Support"
              sourcePage="2-free-hours"
              heading="Fill out this form to reserve your 2 hours of free support"
              subheading="No cost or obligation of any kind. You will not be harassed by a high-pressure salesperson. This offer is simply our way of introducing our services to you."
              testId="two-free-hours-form"
              buttonText="Reserve My 2 Free Hours"
            />
            <p className="text-center text-sm text-[#94a8be] mt-4">
              Prefer to talk? Call us at <a href="tel:9529417333" className="text-white hover:underline">(952) 941-7333</a>
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 bg-[#0a1628]">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-8" style={{ fontFamily: "Outfit" }}>
            Sound Familiar? Three Problems We Hear Every Week
          </h2>
          <div className="space-y-8">
            {PROBLEMS.map((p) => (
              <div key={p.title}>
                <h3 className="text-lg font-bold text-white mb-2" style={{ fontFamily: "Outfit" }}>{p.title}</h3>
                <p className="text-[#94a8be] leading-relaxed">{p.body}</p>
              </div>
            ))}
          </div>
          <p className="text-white leading-relaxed mt-8">
            You should not have to tolerate this type of poor service. Our stance is that you should not be having those kinds of issues in the first place. Second, when you do have a problem, it should be addressed immediately, not hours or days later.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6" style={{ fontFamily: "Outfit" }}>
            Free Emergency Support for Your Next Computer Crisis
          </h2>
          <p className="text-[#94a8be] leading-relaxed mb-4">
            As a prospective client, we would like to give you 2 free hours of emergency IT support from one of our most talented technicians, absolutely free. Even if you are not ready to make a change from who you are using now, we can help you out in a bind when you can not get your current IT person to respond fast enough.
          </p>
          <p className="text-[#94a8be] leading-relaxed">
            There is no cost or obligation of any kind when you request your free support, and you will not be harassed by a high-pressure salesperson. This offer is simply our way of introducing our services to you. You have nothing to lose except the frustration of dealing with slow, incompetent IT support.
          </p>
        </div>
      </section>

      <section className="py-16 bg-[#0a1628]">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-8" style={{ fontFamily: "Outfit" }}>
            What Our Clients Say
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {TESTIMONIALS.map((t) => (
              <figure key={t.name} className="bg-white/5 border border-white/10 rounded-lg p-6">
                <blockquote className="text-[#c8d4e2] leading-relaxed mb-4 text-sm">&ldquo;{t.quote}&rdquo;</blockquote>
                <figcaption>
                  <p className="text-white font-semibold text-sm">{t.name}</p>
                  <p className="text-[#94a8be] text-xs">{t.role}</p>
                </figcaption>
              </figure>
            ))}
          </div>
          <p className="text-[#94a8be] text-sm mt-8">
            Are your systems down? Do you need immediate help? Call us at <a href="tel:9529417333" className="text-white hover:underline">(952) 941-7333</a> to speak with an expert now. For client support, call (952) 767-6111.
          </p>
        </div>
      </section>
    </OfferLayout>
  );
}

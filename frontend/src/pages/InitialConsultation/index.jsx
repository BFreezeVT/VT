import Breadcrumbs from "../../components/Breadcrumbs";
import OfferLayout from "../Offers/OfferLayout";
import OfferLeadForm from "../Offers/OfferLeadForm";

const OUTCOMES = [
  "Where you are overpaying (or getting underserved) for the services and support you are currently getting from your current IT company or team.",
  "Whether or not your systems and data are truly secured from hackers and ransomware, and where you are partially or totally exposed.",
  "If your data is actually being backed up in a manner that would allow you to recover it quickly in the event of an emergency or ransomware attack.",
  "How you could lower the overall costs of IT while improving communication, security and performance, as well as the productivity of your employees.",
];

const TESTIMONIALS = [
  {
    title: "Veracity Technologies is Our Top Choice",
    quote: "Partnering with Veracity Technologies has been incredibly rewarding, providing peace of mind by handling all our IT issues so we can focus on generating revenue. Their quick response time, exceptional service, and unmatched expertise make them the top choice for any business seeking an IT partner. With outstanding customer service and deep technology understanding, I highly recommend Veracity Technologies for all your IT needs.",
    name: "Leah Swartzbaugh",
    role: "Vice President, AMI-Imaging",
  },
  {
    title: "Our Go-To MSP: Veracity Technologies",
    quote: "Partnering with Veracity as our IT MSP has been an excellent decision. Their responsiveness and seamless network maintenance allow us to focus on core business objectives and software development. Veracity's holistic approach, commitment to our growth, and tailored service without unnecessary upselling truly set them apart. I highly recommend Veracity for their outstanding customer service, swift responsiveness, and proactive network maintenance.",
    name: "Joel Prest",
    role: "Director of IT, Atticus Administration",
  },
  {
    title: "Transform Your IT Experience with Veracity Technologies",
    quote: "Teaming up with Veracity Technologies has given us a dedicated point of contact, enabling us to scale operations and minimize IT expenses. Their genuine investment in our success and unwavering commitment to cybersecurity set them apart. With their expertise and lightning-fast response times, I wholeheartedly endorse Veracity Technologies as your next Managed Services Provider.",
    name: "Jeff Lehman",
    role: "President, Building Material Supply, Inc.",
  },
];

export default function InitialConsultation() {
  return (
    <OfferLayout
      title="Initial Consultation | Veracity Technologies"
      description="Schedule a free initial consultation with Veracity Technologies in Minnetonka, MN. A remote assessment shows where you are overpaying, whether your systems are truly secured, and how to lower IT costs, with no obligation."
      slug="initial-consultation"
      pageName="Initial Consultation"
      testId="initial-consultation-page"
      cta={{
        title: "Get a Credible Third-Party Validation of Your IT",
        text: "Start with a free Business Technology Assessment to see exactly where your organization stands, and where the biggest opportunities are.",
        buttonText: "Start Your Business Technology Assessment",
      }}
    >
      <section className="py-24 lg:py-28">
        <div className="max-w-5xl mx-auto px-6">
          <div className="flex justify-center">
            <Breadcrumbs items={[{ label: "Initial Consultation" }]} />
          </div>
          <p className="overline text-[#0077B3] mb-4 text-center">Free Offer for Twin Cities Businesses</p>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-none text-white mb-6 text-center" style={{ fontFamily: "Outfit" }}>
            Contact Us Today to Schedule Your Initial Consultation
          </h1>
          <p className="text-base md:text-lg text-[#94a8be] leading-relaxed mb-12 max-w-2xl mx-auto text-center">
            This assessment can be conducted 100% remote, with or without your current IT company or department knowing. We can give you the full details on our initial consultation call.
          </p>

          <div className="max-w-2xl mx-auto">
            <OfferLeadForm
              offerName="Initial Consultation"
              sourcePage="initial-consultation"
              heading="Schedule your initial consultation"
              subheading="Tell us where to reach you and we will set up a time that works."
              testId="initial-consultation-form"
              buttonText="Schedule My Initial Consultation"
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
            What You Can Expect from Us at Veracity Technologies in the Twin Cities
          </h2>
          <p className="text-[#94a8be] leading-relaxed mb-6">
            At the end of the assessment, you will know:
          </p>
          <ul className="space-y-4">
            {OUTCOMES.map((o, i) => (
              <li key={i} className="flex gap-4 bg-white/5 border border-white/10 rounded-lg p-4">
                <span className="flex-shrink-0 w-7 h-7 rounded-full bg-[#0077B3] text-white text-sm font-bold flex items-center justify-center">{i + 1}</span>
                <span className="text-[#c8d4e2] leading-relaxed text-sm">{o}</span>
              </li>
            ))}
          </ul>
          <p className="text-white leading-relaxed mt-8">
            Fresh eyes see things that others cannot, so at a minimum, our free assessment is a completely cost and risk-free way to get a credible third-party validation of the security, stability, and efficiency of your IT systems.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-8" style={{ fontFamily: "Outfit" }}>
            Here Is What Our Clients Are Saying About Our Services
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

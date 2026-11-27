import Breadcrumbs from "../../components/Breadcrumbs";
import OfferLayout from "../Offers/OfferLayout";
import OfferLeadForm from "../Offers/OfferLeadForm";
import { buildBookSchema } from "../Offers/offerSchemas";

const INSIDE = [
  "Why your small business is more attractive to hackers than you think.",
  "The staggering cost of cyberattacks, and why many businesses never recover.",
  "Real stories of companies brought to their knees by preventable breaches.",
  "The top tactics hackers use to infiltrate your network (and how to stop them).",
  "The essential steps you must take now to protect your company, clients, and reputation.",
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

export default function CybersecurityThatWorks() {
  return (
    <OfferLayout
      title="Cybersecurity That Works | Veracity Technologies"
      description="Get the free book Cybersecurity That Works from Veracity Technologies. Learn why your small business is more attractive to hackers than you think, the top tactics hackers use, and the essential steps to protect your company, clients, and reputation."
      slug="cybersecurity-that-works"
      pageName="Cybersecurity That Works"
      testId="cybersecurity-that-works-page"
      extraSchemas={[buildBookSchema("Cybersecurity That Works", "Practical cybersecurity guidance for small businesses: why hackers target you, what attacks cost, and the essential steps to protect your company.", "cybersecurity-that-works", ["Veracity Technologies"])]}
      cta={{
        title: "Protect Your Company Before It Is Too Late",
        text: "Start with a free Business Technology Assessment to see exactly where your organization stands, and where the biggest opportunities are.",
        buttonText: "Start Your Business Technology Assessment",
      }}
    >
      <section className="py-24 lg:py-28">
        <div className="max-w-5xl mx-auto px-6">
          <div className="flex justify-center">
            <Breadcrumbs items={[{ label: "Cybersecurity That Works" }]} />
          </div>
          <p className="overline text-[#0077B3] mb-4 text-center">Free Book for Twin Cities Business Owners</p>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-none text-white mb-6 text-center" style={{ fontFamily: "Outfit" }}>
            Cybersecurity That Works
          </h1>
          <p className="text-base md:text-lg text-[#94a8be] leading-relaxed mb-12 max-w-2xl mx-auto text-center">
            Read this book and discover what most small business owners never learn until it is too late.
          </p>

          <div className="max-w-2xl mx-auto">
            <OfferLeadForm
              offerName="Cybersecurity That Works (free book)"
              sourcePage="cybersecurity-that-works"
              heading="Fill out the form below to receive your free copy"
              subheading="No cost, no obligation. We will send your copy right away."
              testId="cybersecurity-that-works-form"
              buttonText="Get My Free Copy"
            />
          </div>
        </div>
      </section>

      <section className="py-16 bg-[#0a1628]">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-8" style={{ fontFamily: "Outfit" }}>
            Read This Book and You Will Discover:
          </h2>
          <ul className="space-y-3">
            {INSIDE.map((item) => (
              <li key={item} className="flex gap-3 text-[#c8d4e2] text-sm leading-relaxed">
                <span className="text-[#0077B3] font-bold flex-shrink-0">&check;</span>
                {item}
              </li>
            ))}
          </ul>
          <p className="text-[#94a8be] leading-relaxed mt-8">
            Most small businesses assume they are too small to be a target. Hackers disagree. This book explains, in plain language, how attacks actually happen and what to do about them, before your company becomes the next cautionary tale.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-8" style={{ fontFamily: "Outfit" }}>
            What Our Clients Are Saying About Our Minneapolis IT Support Services
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

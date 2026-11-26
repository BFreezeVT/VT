import Breadcrumbs from "../../components/Breadcrumbs";
import OfferLayout from "../Offers/OfferLayout";
import OfferLeadForm from "../Offers/OfferLeadForm";

const QUIZ = [
  "Do they answer their phone live and respond to emergencies promptly?",
  "Are they easy to reach and highly responsive (responding same day) when you need them for non-emergencies?",
  "Do they proactively monitor, patch, and update your computer network's critical security settings daily? Weekly? At all? How do you know for sure?",
  "Do they offer proof that they are backing up all your data, laptops, and devices?",
  "Do they meet with you regularly (at least once a quarter) to report what they have been doing, review projects, and offer new ways to improve your network's performance instead of waiting until you have a problem to make recommendations?",
  "Do they provide detailed invoices that clearly explain what you are paying for?",
  "Do they explain what they are doing and answer your questions in terms that you can understand, not in geek speak?",
  "Have they proactively discussed cybersecurity with you, and made recommendations for better protecting your network from ransomware?",
  "Have they provided you complete network documentation, or do they hold the keys to the kingdom, refusing to give you admin passwords?",
  "Do they offer any guarantees on their services?",
  "Do they arrive on time and dress professionally?",
  "Do you look forward to seeing them and working with them, or do you cringe every time you have to make that call?",
];

export default function Aspirin() {
  return (
    <OfferLayout
      title="Free $497 IT Systems Assessment (Aspirin) | Veracity Technologies"
      description="Get a free $497 IT Systems Assessment from Veracity Technologies in Minnetonka, MN. A senior technician audits your network security and health in 60 minutes, with a report of findings and no obligation."
      slug="aspirin"
      pageName="Aspirin: Free IT Systems Assessment"
      testId="aspirin-page"
      cta={{
        title: "Why Risk It?",
        text: "Our free IT Systems Assessment comes with zero strings attached, no expectations, and no obligations on your part. At minimum, it is a good third-party validation of how well your systems are currently performing.",
        buttonText: "Start Your Business Technology Assessment",
      }}
    >
      <section className="py-24 lg:py-28">
        <div className="max-w-5xl mx-auto px-6">
          <div className="flex justify-center">
            <Breadcrumbs items={[{ label: "Aspirin: Free IT Systems Assessment" }]} />
          </div>
          <p className="overline text-[#0077B3] mb-4 text-center">Free Offer for Twin Cities Businesses</p>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-none text-white mb-6 text-center" style={{ fontFamily: "Outfit" }}>
            Isn&rsquo;t It Time to Finally Get Rid of This Headache?
          </h1>
          <p className="text-base md:text-lg text-[#94a8be] leading-relaxed mb-6 max-w-2xl mx-auto text-center">
            Although the notion of providing reliable, affordable, full-service computer support is not an amazing concept, it still surprises us how many computer technicians do not get it right. We understand if you are skeptical about our claims. Our guess is that you have been disappointed, even burned, by other IT guys in the past. That is why we would like to extend the following offer to you.
          </p>

          <div className="max-w-2xl mx-auto">
            <OfferLeadForm
              offerName="Free $497 IT Systems Assessment (Aspirin)"
              sourcePage="aspirin"
              heading="Sign me up for the free assessment"
              subheading="A $497 Get-To-Know-Us free gift. No obligation, no sales pressure."
              testId="aspirin-form"
              buttonText="Sign Me Up for the Free Assessment"
            />
          </div>
        </div>
      </section>

      <section className="py-16 bg-[#0a1628]">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6" style={{ fontFamily: "Outfit" }}>
            A $497 &ldquo;Get-To-Know-Us&rdquo; Free Gift
          </h2>
          <p className="text-[#94a8be] leading-relaxed mb-4">
            As a prospective client, we would like to offer you a free, no-obligation, no-sales-pressure IT Systems Assessment where we will send one of our senior technicians to your office to conduct an audit of your network&rsquo;s security and overall health.
          </p>
          <p className="text-[#94a8be] leading-relaxed mb-4">
            When done, we will give you a report of findings that will not only reveal if your data and computer network really are properly backed up and secured, but also if there is anything you need to do now to prevent a major network outage, data loss, hacker attack, or other expensive, data-erasing disaster. Plus, we can almost always show you how to save a little (or a lot) on hardware and software by switching to more efficient cloud-computing solutions.
          </p>
          <p className="text-[#94a8be] leading-relaxed mb-4">
            After all, it never hurts to get a competitive bid from a qualified third party, and this assessment is totally, completely free without obligation.
          </p>
          <p className="text-[#94a8be] leading-relaxed">
            The assessment only takes 60 minutes to conduct, but when it is done, you will know for sure if your company&rsquo;s data is secured and, in the event of a disaster, exactly how fast you could be back up and running again (if at all).
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4" style={{ fontFamily: "Outfit" }}>
            How Does Your Current IT Guy Stack Up?
          </h2>
          <p className="text-[#94a8be] leading-relaxed mb-8">
            Take this quiz to find out. How can you tell if you are receiving poor or substandard service? How do you know if your IT company or computer guy is doing everything possible to secure your network and prevent expensive disasters? If your technician does not score a &ldquo;yes&rdquo; on every point, you could be paying for substandard support and jeopardizing your data and your network&rsquo;s security.
          </p>
          <ol className="space-y-4">
            {QUIZ.map((q, i) => (
              <li key={i} className="flex gap-4 bg-white/5 border border-white/10 rounded-lg p-4">
                <span className="flex-shrink-0 w-7 h-7 rounded-full bg-[#0077B3] text-white text-sm font-bold flex items-center justify-center">{i + 1}</span>
                <span className="text-[#c8d4e2] leading-relaxed text-sm">{q}</span>
              </li>
            ))}
          </ol>
          <p className="text-[#94a8be] leading-relaxed mt-8">
            If your current provider falls short on any of these, the free assessment is the fastest way to find out where you stand, with zero strings attached.
          </p>
        </div>
      </section>
    </OfferLayout>
  );
}

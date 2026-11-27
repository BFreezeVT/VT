import Breadcrumbs from "../../components/Breadcrumbs";
import OfferLayout from "../Offers/OfferLayout";
import OfferLeadForm from "../Offers/OfferLeadForm";

export default function ITBuyersGuide() {
  return (
    <OfferLayout
      title="Free IT Buyers Guide | Veracity Technologies"
      description="Download the free Minneapolis and St. Paul Decision Makers Guide to IT Support Services and Fees from Veracity Technologies. Learn the insider secrets most IT companies will not tell you, and what you should expect to pay for IT services."
      slug="it-buyers-guide"
      pageName="IT Buyers Guide"
      testId="it-buyers-guide-page"
      cta={{
        title: "Still Comparing IT Providers?",
        text: "Start with a free Business Technology Assessment to see exactly where your organization stands, and where the biggest opportunities are.",
        buttonText: "Start Your Business Technology Assessment",
      }}
    >
      <section className="py-24 lg:py-28">
        <div className="max-w-5xl mx-auto px-6">
          <div className="flex justify-center">
            <Breadcrumbs items={[{ label: "IT Buyers Guide" }]} />
          </div>
          <p className="overline text-[#0077B3] mb-4 text-center">Free Download for Twin Cities Decision Makers</p>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-none text-white mb-6 text-center" style={{ fontFamily: "Outfit" }}>
            Free Buyer&rsquo;s IT Guide
          </h1>
          <p className="text-base md:text-lg text-[#94a8be] leading-relaxed mb-12 max-w-2xl mx-auto text-center">
            Download &ldquo;The Minneapolis and St. Paul&rsquo;s Decision Makers&rsquo; Guide to IT Support Services and Fees.&rdquo;
          </p>

          <div className="max-w-2xl mx-auto">
            <OfferLeadForm
              offerName="IT Buyers Guide"
              sourcePage="it-buyers-guide"
              heading="Fill out this form to receive your free report"
              subheading="We will send the guide to your email. No cost, no obligation."
              testId="it-buyers-guide-form"
              buttonText="Send Me the Free Guide"
            />
          </div>
        </div>
      </section>

      <section className="py-16 bg-[#0a1628]">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6" style={{ fontFamily: "Outfit" }}>
            What Is Inside the Guide
          </h2>
          <p className="text-[#94a8be] leading-relaxed mb-4">
            Download our informational guide to choosing your next IT company, titled &ldquo;The Minneapolis and St. Paul&rsquo;s Decision Makers&rsquo; Guide to IT Support Services and Fees.&rdquo; This report contains critical and eye-opening information you need to know about selecting a responsible, trustworthy IT company.
          </p>
          <p className="text-[#94a8be] leading-relaxed mb-4">
            In it you will discover insider secrets most IT companies will not tell you, as well as what you should expect to pay for IT services.
          </p>
          <ul className="space-y-3 mt-6">
            <li className="flex gap-3 text-[#c8d4e2] text-sm leading-relaxed">
              <span className="text-[#0077B3] font-bold flex-shrink-0">&check;</span>
              The questions to ask before you sign any IT services agreement
            </li>
            <li className="flex gap-3 text-[#c8d4e2] text-sm leading-relaxed">
              <span className="text-[#0077B3] font-bold flex-shrink-0">&check;</span>
              What fair pricing for managed IT services actually looks like in the Twin Cities
            </li>
            <li className="flex gap-3 text-[#c8d4e2] text-sm leading-relaxed">
              <span className="text-[#0077B3] font-bold flex-shrink-0">&check;</span>
              The red flags that tell you an IT provider is not protecting your business
            </li>
            <li className="flex gap-3 text-[#c8d4e2] text-sm leading-relaxed">
              <span className="text-[#0077B3] font-bold flex-shrink-0">&check;</span>
              How to tell whether your current provider is keeping your data truly secure
            </li>
          </ul>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6" style={{ fontFamily: "Outfit" }}>
            Get in Touch
          </h2>
          <p className="text-[#94a8be] leading-relaxed mb-4">
            Elevate your IT infrastructure with Veracity Technologies. Contact us today to discover how our expert managed IT services can support and enhance your business.
          </p>
          <p className="text-[#94a8be] leading-relaxed">
            Phone: <a href="tel:9529417333" className="text-white hover:underline">(952) 941-7333</a><br />
            Address: 5929 Baker Rd., Suite 420, Minnetonka, MN 55345, United States
          </p>
          <p className="text-[#94a8be] leading-relaxed mt-4">
            Secure the future of your business with Veracity Technologies, your trusted ally in managed IT services.
          </p>
        </div>
      </section>
    </OfferLayout>
  );
}

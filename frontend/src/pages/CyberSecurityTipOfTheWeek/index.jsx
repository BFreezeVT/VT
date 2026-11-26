import Breadcrumbs from "../../components/Breadcrumbs";
import OfferLayout from "../Offers/OfferLayout";
import OfferLeadForm from "../Offers/OfferLeadForm";

const SAMPLE_TIPS = [
  { n: 5, text: "If hit with ransomware that says: Pay $2,000 or we will delete your files, do not pay! Do this instead to sidestep their evil ways." },
  { n: 19, text: "Do you accept credit cards online? If you answered yes, but you neglect this key step, you may get fines, fees, and even sued!" },
  { n: 28, text: "Why make a hacker's job easier? Do this to your usernames. It is like a wall of steel." },
  { n: 15, text: "How you swipe your debit card determines if you are at serious risk for theft or completely safe. Protect your accounts with this simple, speedy tip." },
  { n: 18, text: "Far too many businesses have firewalls that are useless! Yours might be too unless you take the time to do this frequently." },
  { n: 47, text: "Have a remote login when working on the road? You may unknowingly be inviting a virus into your office, unless you take this action." },
  { n: 10, text: "If you do not take this rare but important step when you get a brand new PC, it could spell the death of that PC (and your files) in a matter of months!" },
  { n: 8, text: "Every day people try to get on Facebook or Twitter and get more than friend updates. They get dangerous viruses and malware instead! This 6-second action eliminates this common risk." },
  { n: 29, text: "What is worse than getting your laptop stolen? Giving that thief access to all of your files. Take this simple step to breathe easy about your files." },
  { n: 12, text: "Over 7 million Dropbox accounts have been hacked! Use these rarely used precautions before jumping on any file-sharing applications (Google Drive, OneDrive, Dropbox, etc.)." },
];

const TESTIMONIALS = [
  {
    title: "Veracity Technologies is Our Top Choice",
    quote: "Partnering with Veracity Technologies has been incredibly rewarding, providing peace of mind by handling all our IT issues so we can focus on generating revenue. Their quick response time, exceptional service, and unmatched expertise make them the top choice for any business seeking an IT partner.",
    name: "Leah Swartzbaugh",
    role: "Vice President, AMI-Imaging",
  },
  {
    title: "Our Go-To MSP: Veracity Technologies",
    quote: "Partnering with Veracity as our IT MSP has been an excellent decision. Their responsiveness and seamless network maintenance allow us to focus on core business objectives and software development. Veracity's holistic approach, commitment to our growth, and tailored service without unnecessary upselling truly set them apart.",
    name: "Joel Prest",
    role: "Director of IT, Atticus Administration",
  },
  {
    title: "Transform Your IT Experience with Veracity Technologies",
    quote: "Teaming up with Veracity Technologies has given us a dedicated point of contact, enabling us to scale operations and minimize IT expenses. Their genuine investment in our success and unwavering commitment to cybersecurity set them apart.",
    name: "Jeff Lehman",
    role: "President, Building Material Supply, Inc.",
  },
];

export default function CyberSecurityTipOfTheWeek() {
  return (
    <OfferLayout
      title="Cyber Security Tip of the Week | Veracity Technologies"
      description="Get a free subscription to the weekly Cyber Security Tip of the Week from Veracity Technologies. Short, practical tips show you and your employees the latest scams and how to keep your company safe online."
      slug="cyber-security-tip-of-the-week"
      pageName="Cyber Security Tip of the Week"
      testId="cyber-security-tip-of-the-week-page"
      cta={{
        title: "Want More Than Tips?",
        text: "Start with a free Business Technology Assessment to see exactly where your organization stands, and where the biggest opportunities are.",
        buttonText: "Start Your Business Technology Assessment",
      }}
    >
      <section className="py-24 lg:py-28">
        <div className="max-w-5xl mx-auto px-6">
          <div className="flex justify-center">
            <Breadcrumbs items={[{ label: "Cyber Security Tip of the Week" }]} />
          </div>
          <p className="overline text-[#0077B3] mb-4 text-center">Free Weekly Email for Business Owners</p>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-none text-white mb-6 text-center" style={{ fontFamily: "Outfit" }}>
            Cyber Security Tip of the Week
          </h1>
          <p className="text-base md:text-lg text-[#94a8be] leading-relaxed mb-4 max-w-2xl mx-auto text-center">
            Eliminate the single biggest threat to your company going out of business, virtually overnight.
          </p>
          <p className="text-base md:text-lg text-white leading-relaxed mb-12 max-w-2xl mx-auto text-center font-semibold">
            Get a free subscription to weekly cybersecurity tips so your company does not become the next victim.
          </p>

          <div className="max-w-2xl mx-auto">
            <OfferLeadForm
              offerName="Cyber Security Tip of the Week"
              sourcePage="cyber-security-tip-of-the-week"
              heading="Sign up for the free weekly email"
              subheading="We will send byte-sized, quick-read tips to your inbox. Every tip is packed with a unique and up-to-date real-world solution that keeps you one step ahead of the bad guys."
              testId="cyber-security-tip-of-the-week-form"
              buttonText="Sign Me Up for the Free Tips"
            />
          </div>
        </div>
      </section>

      <section className="py-16 bg-[#0a1628]">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6" style={{ fontFamily: "Outfit" }}>
            Did You Know That 82% of Data Breaches Involve Human Error?
          </h2>
          <p className="text-[#94a8be] leading-relaxed mb-4">
            As insane as it sounds, the simple mistake of clicking on a link in a phishing email, or using a weak password, or joining a public Wi-Fi opens the door to cybercriminals to wreak havoc on you and your business.
          </p>
          <p className="text-[#94a8be] leading-relaxed mb-4">
            Employees take these simple actions hundreds of times a day without ever giving it a second thought, and in a split second, a criminal can access things like:
          </p>
          <ul className="space-y-2 mb-6">
            <li className="text-[#c8d4e2] text-sm leading-relaxed">Your bank account, withdrawing thousands of dollars you will never get back</li>
            <li className="text-[#c8d4e2] text-sm leading-relaxed">Confidential client information, which you will have to pay tens of thousands to get back (and notify all your clients that you caused their private information to be leaked)</li>
            <li className="text-[#c8d4e2] text-sm leading-relaxed">Your company data, files, and more, shutting it all down so that you can not access anything until you pay thousands in online ransom and your business grinds to a halt</li>
          </ul>
          <p className="text-white leading-relaxed font-semibold mb-2">But it does not have to be this way.</p>
          <p className="text-[#94a8be] leading-relaxed">
            When you and your employees subscribe to these free weekly 30- to 60-second tips and reminders, they will be better educated and much less likely to cause a breach in security. You must constantly educate yourself on how to protect what is yours.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-8" style={{ fontFamily: "Outfit" }}>
            Protect Your Bank Account and Important Data with Cyber Security Secrets Like These
          </h2>
          <ul className="space-y-4">
            {SAMPLE_TIPS.map((t) => (
              <li key={t.n} className="flex gap-4 bg-white/5 border border-white/10 rounded-lg p-4">
                <span className="flex-shrink-0 w-12 h-7 rounded-full bg-[#0077B3] text-white text-xs font-bold flex items-center justify-center">Tip {t.n}</span>
                <span className="text-[#c8d4e2] leading-relaxed text-sm">{t.text}</span>
              </li>
            ))}
          </ul>
          <p className="text-[#94a8be] leading-relaxed mt-8">
            And while we cannot ever guarantee you will not be breached, the security secrets you get will significantly reduce your risk. Sign up today.
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

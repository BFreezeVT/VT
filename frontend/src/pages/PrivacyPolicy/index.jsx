import { stringifyJsonLd } from "@/lib/jsonLd";
import { useEffect } from "react";
import { ShieldCheck, Database, Cookie, Lock, UserCheck, Mail } from "lucide-react";
import { buildBreadcrumbSchema, buildWebPageSchema } from "./privacyPolicySchemas";
import PrivacyPolicyNav from "./PrivacyPolicyNav";
import PrivacyPolicyFooter from "./PrivacyPolicyFooter";
import Breadcrumbs from "../../components/Breadcrumbs";

const SECTIONS = [
  {
    icon: ShieldCheck,
    id: "commitment",
    title: "Our Commitment to Privacy",
    body: [
      "Your privacy is important to us. To better protect your privacy we provide this notice explaining our online information practices and the choices you can make about the way your information is collected and used. To make this notice easy to find, we make it available on our homepage and at every point where personally identifiable information may be requested.",
      "Veracity Technologies is a SOC 2 certified managed IT and cybersecurity provider in Minnetonka, Minnesota. Protecting data is not just a policy for us, it is the work we do for our clients every day, and we hold ourselves to the same standard.",
    ],
  },
  {
    icon: Database,
    id: "collect",
    title: "The Information We Collect",
    body: [
      "This notice applies to all information collected or submitted on this website. On some pages, you can make requests and register to receive materials. The types of personal information collected at these pages are:",
    ],
    list: ["Name", "Address", "Email address", "Phone number"],
  },
  {
    icon: UserCheck,
    id: "use",
    title: "The Way We Use Information",
    body: [
      "We use the information you provide about yourself when placing an order only to complete that request for information. We do not share this information with outside parties except to the extent necessary to complete that process.",
      "We use return email addresses to answer the email we receive. Such addresses are not used for any other purpose and are not shared with outside parties.",
      "You can register with our website if you would like to receive our newsletter as well as updates on our new products and services. Information you submit on our website will not be used for this purpose unless you fill out the applicable registration form.",
      "We use non-identifying and aggregate information to better design our website, but we would not disclose anything that could be used to identify those individuals.",
      "Finally, we never use or share the personally identifiable information provided to us online in ways unrelated to the ones described above without also providing you an opportunity to opt out or otherwise prohibit such unrelated uses.",
      "We do not sell your personal information to anyone.",
    ],
  },
  {
    icon: Cookie,
    id: "cookies",
    title: "Cookies and Analytics",
    body: [
      "Our website uses cookies and analytics tools to keep the site working and to understand how visitors use it, so we can improve it. Analytics data is collected in aggregate and does not identify individual visitors. You can control cookies through your browser settings, including blocking or deleting them. Some parts of the site may not work as intended if cookies are disabled.",
    ],
  },
  {
    icon: Lock,
    id: "security",
    title: "Our Commitment to Data Security",
    body: [
      "To prevent unauthorized access, maintain data accuracy, and ensure the correct use of information, we have put in place appropriate physical, electronic, and managerial procedures to safeguard and secure the information we collect online.",
    ],
  },
  {
    icon: UserCheck,
    id: "access",
    title: "How You Can Access or Correct Your Information",
    body: [
      "You can inquire about all your personally identifiable information that we collect online and maintain by contacting us. We use this procedure to better safeguard your information.",
      "You can correct factual errors in your personally identifiable information by sending us a request that credibly shows error.",
      "To protect your privacy and security, we will also take reasonable steps to verify your identity before granting access or making corrections.",
    ],
  },
  {
    icon: ShieldCheck,
    id: "children",
    title: "Children's Privacy",
    body: [
      "This website is intended for businesses and is not directed at children under the age of 13. We do not knowingly collect personal information from children under 13. If you believe we have collected information from a child, please contact us and we will remove it.",
    ],
  },
  {
    icon: ShieldCheck,
    id: "changes",
    title: "Changes to This Policy",
    body: [
      "We may update this privacy policy from time to time to reflect changes in our practices or for other operational, legal, or regulatory reasons. The current version will always be posted on this page, with the last updated date shown below. We encourage you to review this page periodically.",
    ],
  },
];

export default function PrivacyPolicy() {
  useEffect(() => {
    document.title = "Privacy Policy | Veracity Technologies";
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.setAttribute("content", "How Veracity Technologies collects, uses, and protects your personal information. Read what we collect through our website, how we use it, and how you can access or correct it.");
    const canonical = document.querySelector('link[rel="canonical"]');
    if (canonical) canonical.setAttribute("href", "https://www.veracitytechmn.com/privacy-policy");
    return () => {
      document.title = "Veracity Technologies | AI-Powered Cybersecurity & Managed IT";
      if (metaDesc) metaDesc.setAttribute("content", "Managed IT & cybersecurity for Minnesota businesses, powered by AI and automation. SOC 2 compliant, CMMC registered. Free assessment available.");
      if (canonical) canonical.setAttribute("href", "https://www.veracitytechmn.com/");
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#0f1d32]" data-testid="privacy-policy-page">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: stringifyJsonLd(buildBreadcrumbSchema()) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: stringifyJsonLd(buildWebPageSchema()) }} />

      <PrivacyPolicyNav />

      <main role="main">
        <section data-testid="privacy-policy-hero" className="py-24 lg:py-28">
          <div className="max-w-5xl mx-auto px-6 text-center">
            <div className="flex justify-center">
              <Breadcrumbs items={[{ label: "Privacy Policy" }]} />
            </div>
            <p className="overline text-[#0077B3] mb-4">Privacy Policy</p>
            <h1 data-testid="privacy-policy-headline" className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-none text-white mb-6" style={{ fontFamily: "Outfit" }}>
              How We Protect Your Privacy
            </h1>
            <p className="text-base md:text-lg text-[#94a8be] leading-relaxed mb-10 max-w-2xl mx-auto">
              This policy explains what personal information we collect through our website, how we use it, how we protect it, and the choices you have. Last updated November 2026.
            </p>
          </div>
        </section>

        <section data-testid="privacy-policy-sections" className="py-20 bg-[#0a1628]">
          <div className="max-w-4xl mx-auto px-6 space-y-10">
            {SECTIONS.map((section) => (
              <article key={section.id} data-testid="privacy-policy-section" className="bg-[#0f1d32] border border-white/10 rounded-sm p-6 sm:p-8">
                <div className="flex items-start gap-4">
                  <section.icon className="w-7 h-7 text-[#0077B3] shrink-0 mt-1" />
                  <div>
                    <h2 className="text-xl sm:text-2xl font-bold text-white mb-4" style={{ fontFamily: "Outfit" }}>{section.title}</h2>
                    {section.body.map((paragraph, i) => (
                      <p key={i} className="text-sm sm:text-base text-[#94a8be] leading-relaxed mb-4 last:mb-0">{paragraph}</p>
                    ))}
                    {section.list && (
                      <ul className="list-disc pl-6 space-y-1 text-sm sm:text-base text-[#94a8be]">
                        {section.list.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section data-testid="privacy-policy-contact" className="py-20 bg-white">
          <div className="max-w-3xl mx-auto px-6 text-center">
            <Mail className="w-10 h-10 text-[#0077B3] mx-auto mb-4" />
            <h2 className="text-2xl sm:text-3xl font-bold text-[#0f1d32] mb-4" style={{ fontFamily: "Outfit" }}>
              Questions About This Policy
            </h2>
            <p className="text-[#3a5068] text-base mb-8 max-w-xl mx-auto">
              If you have questions about this privacy policy, or about the personal information we have collected from you, contact us and we will help.
            </p>
            <p className="text-[#0f1d32] text-base font-semibold mb-1">Veracity Technologies</p>
            <p className="text-[#3a5068] text-base mb-1">5929 Baker Rd, Suite 420, Minnetonka, MN 55345</p>
            <p className="text-[#3a5068] text-base mb-1">
              Phone: <a href="tel:9529417333" className="text-[#0077B3] hover:text-[#00a0e4] font-semibold">(952) 941-7333</a>
            </p>
            <p className="text-[#3a5068] text-base">
              Email: <a href="mailto:info@veracitytechmn.com" className="text-[#0077B3] hover:text-[#00a0e4] font-semibold">info@veracitytechmn.com</a>
            </p>
          </div>
        </section>
      </main>

      <PrivacyPolicyFooter />
    </div>
  );
}

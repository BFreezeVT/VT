import "@/App.css";
import Navigation from "./sections/Navigation";
import HeroSection from "./sections/HeroSection";
import IntroStats from "./sections/IntroStats";
import WhySpecializedIT from "./sections/WhySpecializedIT";
import OurApproach from "./sections/OurApproach";
import Industries from "./sections/Industries";
import Compliance from "./sections/Compliance";
import CaseStudy from "./sections/CaseStudy";
import FreeAuditOffer from "./sections/FreeAuditOffer";
import RiskReversal from "./sections/RiskReversal";
import FAQSection from "./sections/FAQSection";
import Footer from "./sections/Footer";

function App() {
  return (
    <div className="min-h-screen bg-[#020812]" data-testid="app-root">
      <Navigation />
      <HeroSection />
      <IntroStats />
      <WhySpecializedIT />
      <OurApproach />
      <Industries />
      <Compliance />
      <CaseStudy />
      <FreeAuditOffer />
      <RiskReversal />
      <FAQSection />
      <Footer />
    </div>
  );
}

export default App;

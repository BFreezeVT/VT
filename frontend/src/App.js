import "@/App.css";
import Navigation from "./sections/Navigation";
import HeroSection from "./sections/HeroSection";
import IntroStats from "./sections/IntroStats";
import WhySpecializedIT from "./sections/WhySpecializedIT";
import OurApproach from "./sections/OurApproach";
import AIService from "./sections/AIService";
import Industries from "./sections/Industries";
import Compliance from "./sections/Compliance";
import CaseStudy from "./sections/CaseStudy";
import FreeAuditOffer from "./sections/FreeAuditOffer";
import RiskReversal from "./sections/RiskReversal";
import CyberGame from "./sections/CyberGame";
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
      <AIService />
      <Compliance />
      <CaseStudy />
      <FreeAuditOffer />
      <RiskReversal />
      <CyberGame />
      <FAQSection />
      <Footer />
    </div>
  );
}

export default App;

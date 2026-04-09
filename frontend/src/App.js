import "@/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
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
import ServiceAreasIndex from "./pages/ServiceAreasIndex";
import ServiceAreaPage from "./pages/ServiceAreaPage";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

function HomePage() {
  return (
    <div className="min-h-screen bg-[#020812]" data-testid="app-root">
      <Navigation />
      <main role="main">
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
      </main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/service-areas" element={<ServiceAreasIndex />} />
        <Route path="/service-areas/:citySlug" element={<ServiceAreaPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

import "@/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navigation from "./sections/Navigation";
import HeroSection from "./sections/HeroSection";
import ClientLogos from "./sections/ClientLogos";
import TrustStats from "./sections/TrustStats";
import IntroStats from "./sections/IntroStats";
import AIService from "./sections/AIService";
import OurApproach from "./sections/OurApproach";
import Industries from "./sections/Industries";
import WhySpecializedIT from "./sections/WhySpecializedIT";
import Compliance from "./sections/Compliance";
import CaseStudy from "./sections/CaseStudy";
import Credentials from "./sections/Credentials";
import ProudPartners from "./sections/ProudPartners";
import CyberGame from "./sections/CyberGame";
import FreeAuditOffer from "./sections/FreeAuditOffer";
import RiskReversal from "./sections/RiskReversal";
import FAQSection from "./sections/FAQSection";
import Footer from "./sections/Footer";
import EbookPopup from "./sections/EbookPopup";
import ServiceAreasIndex from "./pages/ServiceAreasIndex";
import ServiceAreaPage from "./pages/ServiceAreaPage";
import IndustryPage from "./pages/IndustryPage";
import BlogIndex from "./pages/BlogIndex";
import BlogPost from "./pages/BlogPost";
import CyberRiskScorecard from "./pages/CyberRiskScorecard";
import NotFound from "./pages/NotFound";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

function HomePage() {
  return (
    <div className="min-h-screen" data-testid="app-root">
      <Navigation />
      <main role="main">
        <HeroSection />
        <IntroStats />
        <AIService />
        <OurApproach />
        <Industries />
        <TrustStats />
        <WhySpecializedIT />
        <Compliance />
        <CaseStudy />
        <Credentials />
        <ProudPartners />
        <CyberGame />
        <FreeAuditOffer />
        <RiskReversal />
        <FAQSection />
      </main>
      <Footer />
      <EbookPopup />
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
        <Route path="/industries/:industrySlug" element={<IndustryPage />} />
        <Route path="/resources" element={<BlogIndex />} />
        <Route path="/resources/:slug" element={<BlogPost />} />
        <Route path="/cyber-risk-scorecard" element={<CyberRiskScorecard />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

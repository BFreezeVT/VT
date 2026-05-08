import "@/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navigation from "./sections/Navigation";
import HeroSection from "./sections/HeroSection";
import IntroStats from "./sections/IntroStats";
import AIService from "./sections/AIService";
import OurApproach from "./sections/OurApproach";
import Industries from "./sections/Industries";
import WhySpecializedIT from "./sections/WhySpecializedIT";
import Compliance from "./sections/Compliance";
import CaseStudy from "./sections/CaseStudy";
import CyberGame from "./sections/CyberGame";
import FreeAuditOffer from "./sections/FreeAuditOffer";
import RiskReversal from "./sections/RiskReversal";
import FAQSection from "./sections/FAQSection";
import Footer from "./sections/Footer";
import ServiceAreasIndex from "./pages/ServiceAreasIndex";
import ServiceAreaPage from "./pages/ServiceAreaPage";
import IndustryPage from "./pages/IndustryPage";
import BlogIndex from "./pages/BlogIndex";
import BlogPost from "./pages/BlogPost";
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
    <div className="min-h-screen bg-[#0f1d32] relative" data-testid="app-root">
      {/* Background watermark logo */}
      <div className="fixed inset-0 flex items-center justify-center pointer-events-none z-0" style={{ opacity: 0.06 }}>
        <img
          src="https://customer-assets.emergentagent.com/job_jobsite-it-secure/artifacts/yo1g9lv0_2.png"
          alt=""
          className="w-[900px] h-[900px] object-contain"
          aria-hidden="true"
        />
      </div>
      <div className="relative z-10">
      <Navigation />
      <main role="main">
        <HeroSection />
        <IntroStats />
        <AIService />
        <OurApproach />
        <Industries />
        <WhySpecializedIT />
        <Compliance />
        <CaseStudy />
        <CyberGame />
        <FreeAuditOffer />
        <RiskReversal />
        <FAQSection />
      </main>
      <Footer />
      </div>
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
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

import "@/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LogoDivider } from "./sections/LogoBranding";
import Navigation from "./sections/Navigation";
import HeroSection from "./sections/HeroSection";
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
import { useEffect, useRef, useCallback } from "react";
import { useLocation } from "react-router-dom";

// Color stops for the progressive gradient
const gradientStops = [
  [224, 235, 244],  // 0% - #e0ebf4 lightest
  [192, 212, 232],  // 10%
  [150, 182, 212],  // 20%
  [100, 148, 190],  // 30%
  [60, 110, 160],   // 40%
  [35, 78, 125],    // 50%
  [22, 56, 95],     // 60%
  [14, 40, 72],     // 70%
  [8, 28, 52],      // 80%
  [4, 16, 34],      // 90%
  [2, 8, 18],       // 100% - #020812 darkest
];

function lerpColor(stops, t) {
  const clamped = Math.max(0, Math.min(1, t));
  const idx = clamped * (stops.length - 1);
  const lower = Math.floor(idx);
  const upper = Math.min(lower + 1, stops.length - 1);
  const frac = idx - lower;
  return `rgb(${Math.round(stops[lower][0] + (stops[upper][0] - stops[lower][0]) * frac)},${Math.round(stops[lower][1] + (stops[upper][1] - stops[lower][1]) * frac)},${Math.round(stops[lower][2] + (stops[upper][2] - stops[lower][2]) * frac)})`;
}

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

function useScrollGradient(ref) {
  const handleScroll = useCallback(() => {
    if (!ref.current) return;
    const scrollHeight = document.body.scrollHeight - window.innerHeight;
    const t = scrollHeight > 0 ? window.scrollY / scrollHeight : 0;
    ref.current.style.backgroundColor = lerpColor(gradientStops, t);
  }, [ref]);

  useEffect(() => {
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);
}

function HomePage() {
  const pageRef = useRef(null);
  useScrollGradient(pageRef);

  return (
    <div ref={pageRef} className="min-h-screen page-gradient" data-testid="app-root">
      <Navigation />
      <main role="main">
        <HeroSection />
        <IntroStats />
        <LogoDivider />
        <AIService />
        <LogoDivider />
        <OurApproach />
        <Industries />
        <LogoDivider />
        <TrustStats />
        <WhySpecializedIT />
        <LogoDivider />
        <Compliance />
        <CaseStudy />
        <LogoDivider />
        <Credentials />
        <ProudPartners />
        <LogoDivider />
        <CyberGame />
        <FreeAuditOffer />
        <LogoDivider />
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

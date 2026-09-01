import "@/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navigation from "./sections/Navigation";
import HeroSection from "./sections/HeroSection";
import TrustIndicators from "./sections/TrustIndicators";
import CoreServices from "./sections/CoreServices";
import IntroStats from "./sections/IntroStats";
import BusinessReality from "./sections/BusinessReality";
import AIService from "./sections/AIService";
import OurApproach from "./sections/OurApproach";
import HowItWorks from "./sections/HowItWorks";
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
import { useEffect, useRef, useCallback, lazy, Suspense } from "react";
import { useLocation } from "react-router-dom";

// Route-level code splitting - each non-homepage page (and its dependencies like recharts/jspdf)
// ships in its own chunk instead of bloating the initial homepage bundle every visitor downloads.
const ServiceAreasIndex = lazy(() => import("./pages/ServiceAreasIndex"));
const ServiceAreaPage = lazy(() => import("./pages/ServiceAreaPage"));
const IndustryPage = lazy(() => import("./pages/IndustryPage"));
const BusinessTechAssessment = lazy(() => import("./pages/BusinessTechAssessment"));
const AIPage = lazy(() => import("./pages/AIPage"));
const BlogIndex = lazy(() => import("./pages/BlogIndex"));
const BlogPost = lazy(() => import("./pages/BlogPost"));
const CyberRiskScorecard = lazy(() => import("./pages/CyberRiskScorecard"));
const AIROIPreview = lazy(() => import("./pages/AIROIPreview"));
const ServicePage = lazy(() => import("./pages/ServicePage"));
const HumanRiskSimulation = lazy(() => import("./pages/HumanRiskSimulation"));
const ClientSuccess = lazy(() => import("./pages/ClientSuccess"));
const NotFound = lazy(() => import("./pages/NotFound"));

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
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) {
      const id = hash.replace("#", "");
      requestAnimationFrame(() => {
        const el = document.getElementById(id);
        if (el) {
          el.scrollIntoView({ behavior: "smooth" });
        } else {
          window.scrollTo(0, 0);
        }
      });
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname, hash]);
  return null;
}

function useScrollGradient(ref) {
  const handleScroll = useCallback(() => {
    if (!ref.current) return;
    const scrollHeight = document.body.scrollHeight - window.innerHeight;
    const rawT = scrollHeight > 0 ? window.scrollY / scrollHeight : 0;
    // Keep the first 60% linear (unchanged) so white-text sections that already rely on it
    // (Industries, BusinessReality, WhySpecializedIT, Compliance, HowItWorks) keep their
    // existing contrast. Ease the final 40% so it darkens more gradually instead of
    // plateauing near-black too early, deepening the "descent" feel toward the bottom.
    const t = rawT <= 0.6 ? rawT : 0.6 + Math.pow((rawT - 0.6) / 0.4, 1.4) * 0.4;
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
        <TrustIndicators />
        <FreeAuditOffer />
        <CoreServices />
        <OurApproach />
        <AIService />
        <Industries />
        <IntroStats />
        <BusinessReality />
        <WhySpecializedIT />
        <Compliance />
        <HowItWorks />
        <CaseStudy />
        <Credentials />
        <ProudPartners />
        <CyberGame />
        <RiskReversal />
        <FAQSection />
      </main>
      <Footer />
      <EbookPopup />
    </div>
  );
}

function RouteFallback() {
  return <div className="min-h-screen bg-[#0f1d32]" data-testid="route-loading-fallback" />;
}

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Suspense fallback={<RouteFallback />}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/service-areas" element={<ServiceAreasIndex />} />
          <Route path="/service-areas/:citySlug" element={<ServiceAreaPage />} />
          <Route path="/industries/:industrySlug" element={<IndustryPage />} />
          <Route path="/business-technology-assessment" element={<BusinessTechAssessment />} />
          <Route path="/resources" element={<BlogIndex />} />
          <Route path="/resources/:slug" element={<BlogPost />} />
          <Route path="/cyber-risk-scorecard" element={<CyberRiskScorecard />} />
          <Route path="/ai-roi-preview" element={<AIROIPreview />} />
          <Route path="/services/:serviceSlug" element={<ServicePage />} />
          <Route path="/human-risk-simulation" element={<HumanRiskSimulation />} />
          <Route path="/client-success" element={<ClientSuccess />} />
          <Route path="/:aiSlug" element={<AIPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;

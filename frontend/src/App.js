import "@/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navigation from "./sections/Navigation";
import HeroSection from "./sections/HeroSection";
import TrustIndicators from "./sections/TrustIndicators";
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
const ContactUs = lazy(() => import("./pages/ContactUs"));
const DiscoveryCall = lazy(() => import("./pages/DiscoveryCall"));
const NotFound = lazy(() => import("./pages/NotFound"));

// Below-fold homepage sections - each ships in its own chunk instead of bloating the
// initial bundle every visitor downloads. Navigation, HeroSection and TrustIndicators
// above stay eager so the first viewport renders from the main chunk. Each section
// gets its own Suspense boundary (fallback null) so sections reveal independently as
// their chunk arrives instead of one slow chunk holding up the whole page.
const FreeAuditOffer = lazy(() => import("./sections/FreeAuditOffer"));
const CoreServices = lazy(() => import("./sections/CoreServices"));
const OurApproach = lazy(() => import("./sections/OurApproach"));
const AIService = lazy(() => import("./sections/AIService"));
const Industries = lazy(() => import("./sections/Industries"));
const IntroStats = lazy(() => import("./sections/IntroStats"));
const BusinessReality = lazy(() => import("./sections/BusinessReality"));
const WhySpecializedIT = lazy(() => import("./sections/WhySpecializedIT"));
const Compliance = lazy(() => import("./sections/Compliance"));
const HowItWorks = lazy(() => import("./sections/HowItWorks"));
const CaseStudy = lazy(() => import("./sections/CaseStudy"));
const Credentials = lazy(() => import("./sections/Credentials"));
const ProudPartners = lazy(() => import("./sections/ProudPartners"));
const CyberGame = lazy(() => import("./sections/CyberGame"));
const RiskReversal = lazy(() => import("./sections/RiskReversal"));
const FAQSection = lazy(() => import("./sections/FAQSection"));
const Footer = lazy(() => import("./sections/Footer"));
const EbookPopup = lazy(() => import("./sections/EbookPopup"));

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
        <LazySection><FreeAuditOffer /></LazySection>
        <LazySection><CoreServices /></LazySection>
        <LazySection><OurApproach /></LazySection>
        <LazySection><AIService /></LazySection>
        <LazySection><Industries /></LazySection>
        <LazySection><IntroStats /></LazySection>
        <LazySection><BusinessReality /></LazySection>
        <LazySection><WhySpecializedIT /></LazySection>
        <LazySection><Compliance /></LazySection>
        <LazySection><HowItWorks /></LazySection>
        <LazySection><CaseStudy /></LazySection>
        <LazySection><Credentials /></LazySection>
        <LazySection><ProudPartners /></LazySection>
        <LazySection><CyberGame /></LazySection>
        <LazySection><RiskReversal /></LazySection>
        <LazySection><FAQSection /></LazySection>
      </main>
      <LazySection><Footer /></LazySection>
      <LazySection><EbookPopup /></LazySection>
    </div>
  );
}

// Per-section Suspense boundary for a lazy homepage section. Fallback is null (no
// skeleton) because these sections sit below the fold; each reveals as its own chunk
// arrives instead of blocking on the slowest chunk.
function LazySection({ children }) {
  return <Suspense fallback={null}>{children}</Suspense>;
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
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/discovery-call" element={<DiscoveryCall />} />
          <Route path="/:aiSlug" element={<AIPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;

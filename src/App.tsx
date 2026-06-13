import { lazy, Suspense, useEffect } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import PageTransition, { TransitionProvider, useTransitionRouter } from "./components/PageTransition";

const preloadImage = new Image();
preloadImage.src = '/images/zz-truck.png';

const Hero = lazy(() => import("./components/Hero"));
const Services = lazy(() => import("./components/Services"));
const Fleet = lazy(() => import("./components/Fleet"));
const AboutUs = lazy(() => import("./components/AboutUs"));
const HomeWhyUs = lazy(() => import("./components/HomeWhyUs"));
const HomeHowItWorks = lazy(() => import("./components/HomeHowItWorks"));
const Coverage = lazy(() => import("./components/Coverage"));
const HomeTestimonials = lazy(() => import("./components/HomeTestimonials"));
const HomeQuoteForm = lazy(() => import("./components/HomeQuoteForm"));
const Gallery3D = lazy(() => import("./components/Gallery3D"));

function HomeSkeleton() {
  return (
    <div style={{
      background: '#0A0A0A',
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}>
      <div style={{
        width: '60px',
        height: '60px',
        border: '3px solid #1A1A1A',
        borderTop: '3px solid #F5A623',
        borderRadius: '50%',
        animation: 'spin 0.8s linear infinite',
      }}/>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}

function ActivePage() {
  const { currentPath } = useTransitionRouter();

  switch (currentPath) {
    case "#services":
    case "/services":
      return <Services />;
    case "#fleet":
    case "/fleet":
      return <Fleet />;
    case "#why-us":
    case "/why-us":
      return <HomeWhyUs />;
    case "#about-us":
    case "/about-us":
      return <AboutUs />;
    case "#how-it-works":
    case "/how-it-works":
      return <HomeHowItWorks />;
    case "#locations":
    case "/locations":
      return <Coverage />;
    case "#testimonials":
    case "/testimonials":
      return <HomeTestimonials />;
    case "#contact":
    case "/contact":
      return <HomeQuoteForm />;
    case "#home":
    default:
      return (
        <>
          <Suspense fallback={<HomeSkeleton />}>
            <Hero />
          </Suspense>
          <Suspense fallback={<div style={{ background: '#0A0A0A', height: '400px' }} />}>
            <HomeWhyUs style={{ marginTop: 0, paddingTop: 0 }} />
            <HomeHowItWorks />
            <HomeTestimonials />
            <HomeQuoteForm />
          </Suspense>
        </>
      );
  }
}

function AppContent() {
  const { currentPath } = useTransitionRouter();

  return (
    <div className="min-h-screen flex flex-col bg-[#0A0A0A] text-white antialiased overflow-x-hidden selection:bg-[#F5A623] selection:text-[#0A0A0A]">
      {/* Sticky Navigation Header */}
      <Navbar />

      <main className="flex-grow w-full">
        <PageTransition routeKey={currentPath}>
          <Suspense fallback={<div className="bg-[#0A0A0A] min-h-screen" />}>
            <ActivePage />
          </Suspense>
        </PageTransition>
      </main>

      {/* Structured Site Information Directory */}
      <Footer />
    </div>
  );
}

export default function App() {
  useEffect(() => {
    document.body.style.backgroundColor = '#0A0A0A';
  }, []);

  return (
    <TransitionProvider>
      <AppContent />
    </TransitionProvider>
  );
}

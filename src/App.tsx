import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Services from "./components/Services";
import Fleet from "./components/Fleet";
import AboutUs from "./components/AboutUs";
import HomeWhyUs from "./components/HomeWhyUs";
import HomeHowItWorks from "./components/HomeHowItWorks";
import Coverage from "./components/Coverage";
import HomeTestimonials from "./components/HomeTestimonials";
import HomeQuoteForm from "./components/HomeQuoteForm";
import Footer from "./components/Footer";
import PageTransition, { TransitionProvider, useTransitionRouter } from "./components/PageTransition";

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
          <Hero />
          <HomeWhyUs />
          <HomeHowItWorks />
          <HomeTestimonials />
          <HomeQuoteForm />
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
          <ActivePage />
        </PageTransition>
      </main>

      {/* Structured Site Information Directory */}
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <TransitionProvider>
      <AppContent />
    </TransitionProvider>
  );
}

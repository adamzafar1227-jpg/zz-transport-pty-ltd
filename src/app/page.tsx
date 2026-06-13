"use client";
import { lazy, Suspense } from 'react';

const Hero = lazy(() => import('@/components/Hero'));
const HomeWhyUs = lazy(() => import('@/components/HomeWhyUs'));
const HomeHowItWorks = lazy(() => import('@/components/HomeHowItWorks'));
const HomeTestimonials = lazy(() => import('@/components/HomeTestimonials'));
const HomeQuoteForm = lazy(() => import('@/components/HomeQuoteForm'));

export default function Home() {
  return (
    <main>
      <Suspense fallback={<div className="bg-[#0A0A0A] min-h-screen" />}>
        <Hero />
        <HomeWhyUs />
        <HomeHowItWorks />
        <HomeTestimonials />
        <HomeQuoteForm />
      </Suspense>
    </main>
  )
}

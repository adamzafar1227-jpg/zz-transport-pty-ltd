"use client";
import Hero from '@/components/Hero'
import HomeWhyUs from '@/components/HomeWhyUs'
import HomeHowItWorks from '@/components/HomeHowItWorks'
import HomeTestimonials from '@/components/HomeTestimonials'
import HomeQuoteForm from '@/components/HomeQuoteForm'

export default function Home() {
  return (
    <main>
      <Hero />
      <HomeWhyUs />
      <HomeHowItWorks />
      <HomeTestimonials />
      <HomeQuoteForm />
    </main>
  )
}

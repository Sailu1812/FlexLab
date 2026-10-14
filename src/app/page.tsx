"use client";

import React, { useState, useEffect } from 'react';
import { BookingProvider } from '@/components/BookingContext';
import Navbar from '@/components/Navbar';
import CanvasData from '@/components/canvas/canvas';
import SitePreloader from '@/components/SitePreloader';
import TreatmentSection from '@/components/TreatmentSection';
import MethodSection from '@/components/MethodSection';
import PeelingLayersSection from '@/components/PeelingLayersSection';
import ServicesSection from '@/components/ServicesSection';
import ProofSection from '@/components/ProofSection';
import InsuranceSection from '@/components/InsuranceSection';
import FinalCTA from '@/components/FinalCTA';
import Footer from '@/components/Footer';
import ReducedMotionFallback from '@/components/ReducedMotionFallback';
import { ScrollTrigger } from '@/lib/animation';

export default function Home() {
  const [experienceReady, setExperienceReady] = useState(false);

  useEffect(() => {
    if (experienceReady) {
      const timer = setTimeout(() => {
        ScrollTrigger.refresh();
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [experienceReady]);

  return (
    <BookingProvider>
      {/* 3D Model & Assets Preloader */}
      <SitePreloader onReadyChange={setExperienceReady} />

      {/* Main Experience - Fades in once assets are ready */}
      <div
        className={`transition-opacity duration-700 ${
          experienceReady ? "opacity-100" : "opacity-0"
        }`}
      >
        {/* Sticky Site Navigation */}
        <Navbar />

        <main className="w-full">
          {/* 1. 3D Kinetic Anatomy Canvas Experience (Hero, Anatomy Engine, Joint Intelligence) */}
          <CanvasData />

          {/* Clinical Sections Layer */}
          <div className="relative w-full">
            {/* 2. What We Treat ("Your body is the story") */}
            <TreatmentSection />

            {/* 3. The FlexLab Method (Assess → Treat → Train → Return) */}
            <MethodSection />

            {/* 4. Peeling-Layers Progressive Anatomical Reveal (Muscle to Deep Bone Matrix) */}
            <PeelingLayersSection />

            {/* 5. Seven Clinical Services Interactive Sequence with Anatomical Highlights */}
            <ServicesSection />

            {/* 6. Proof & Trust (Clinical Standards & Verified Patient Record) */}
            <ProofSection />

            {/* 7. Insurance & Payment (Clean grouped coverage without logos) */}
            <InsuranceSection />

            {/* 8. Final Emotional CTA */}
            <FinalCTA />

            {/* Footer */}
            <Footer />
          </div>
        </main>

        {/* Accessibility fallback indicator */}
        <ReducedMotionFallback />
      </div>
    </BookingProvider>
  );
}

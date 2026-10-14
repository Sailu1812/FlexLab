'use client';

import React, { useEffect, useRef } from 'react';
import { ArrowRight, ChevronDown, Sparkles } from 'lucide-react';
import { BookingTriggerButton } from './BookingContext';
import { registerGsapPlugins, gsap, isPrefersReducedMotion } from '@/lib/animation';

interface FinalCTAProps {
  onOpenBooking?: () => void;
}

export default function FinalCTA({ onOpenBooking }: FinalCTAProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const leftColRef = useRef<HTMLDivElement>(null);
  const rightColRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    registerGsapPlugins();
    if (isPrefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        leftColRef.current,
        { opacity: 0, x: -35 },
        {
          opacity: 1,
          x: 0,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      gsap.fromTo(
        rightColRef.current,
        { opacity: 0, scale: 0.95 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="cta"
      className="relative py-24 sm:py-28 px-6 sm:px-10 lg:px-16 bg-[#fffaf2] border-b border-[#ead8c3] overflow-hidden"
      aria-label="Call to Action"
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Column: CTA Editorial & Booking Actions */}
        <div ref={leftColRef} className="lg:col-span-7 flex flex-col justify-center text-left relative z-40">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#fff5e8] border border-[#ead8c3] mb-6 w-fit">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--crimson)] animate-warm-pulse" />
            <span className="text-xs uppercase tracking-[0.25em] font-mono text-[var(--crimson-dark)] font-semibold">
              Begin Your Recovery
            </span>
          </div>

          <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl font-normal text-[var(--ink)] leading-[1.08] mb-6">
            Ready to move <br />
            <span className="italic font-serif text-[var(--crimson)]">forward?</span>
          </h2>

          <p className="text-base sm:text-xl text-[var(--ink)]/85 max-w-xl font-sans leading-relaxed mb-10">
            Let&apos;s understand what&apos;s limiting your movement and build a clear, measurable path back to pain-free performance.
          </p>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
            <BookingTriggerButton className="group px-9 py-4 rounded-full bg-[var(--crimson)] text-[#fffaf2] text-base font-semibold tracking-wide shadow-md hover:bg-[var(--crimson-dark)] hover:shadow-lg active:scale-[0.98] transition-all cursor-pointer flex items-center justify-center gap-2">
              <span>Book an Evaluation</span>
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </BookingTriggerButton>
            <a
              href="#services"
              className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-full border border-[#ead8c3] bg-[#fff5e8] text-[var(--ink)] text-base font-medium hover:bg-[#fbeddc] hover:border-[#a0142f]/30 transition-all"
            >
              <span>Explore our services</span>
              <ChevronDown size={15} className="text-[var(--crimson)]" />
            </a>
          </div>

          <div className="mt-10 text-xs font-mono text-[var(--taupe)] flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
            <span>Initial evaluations include a comprehensive 60-minute kinematic assessment.</span>
          </div>
        </div>

        {/* Right Column: Stage where 3D Model stands idle before footer */}
        <div ref={rightColRef} className="lg:col-span-5 relative flex justify-center items-center min-h-[460px] pointer-events-none">
          {/* Soft clinical halo backdrop framing the idle 3D model */}
          <div className="absolute inset-4 rounded-full bg-[#fbeddc] filter blur-3xl opacity-80 pointer-events-none" />

          {/* Stage guidelines */}
          <div className="relative w-full max-w-[340px] aspect-[3/4] rounded-3xl bg-[#fff5e8]/80 border border-[#ead8c3] flex flex-col justify-between p-5 pointer-events-none shadow-xs">
            <div className="flex justify-between items-center text-[10px] font-mono text-[var(--crimson-dark)]">
              <span className="px-3 py-1 rounded-full bg-[#fffaf2] border border-[#ead8c3] shadow-xs flex items-center gap-1.5 font-bold">
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--crimson)] animate-warm-pulse" />
                ACTIVE CLINICAL ENGINE
              </span>
              <span className="text-[var(--taupe)]">Ready State</span>
            </div>

            <div className="mt-auto text-center text-[11px] font-mono text-[var(--taupe)] bg-[#fffaf2]/95 py-2 px-3.5 rounded-full border border-[#ead8c3] mx-auto shadow-xs flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
              <span>Standing Posture & Functional Alignment</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

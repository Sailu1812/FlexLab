'use client';

import React, { useEffect, useRef } from 'react';
import { BookingTriggerButton } from './BookingContext';
import { registerGsapPlugins, gsap, isPrefersReducedMotion } from '@/lib/animation';
import { ArrowRight, ChevronDown, Sparkles, Activity, ShieldCheck } from 'lucide-react';

const Section1 = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const scrollPromptRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    registerGsapPlugins();
    if (isPrefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' }, delay: 0.2 });

      tl.fromTo(
        badgeRef.current,
        { opacity: 0, y: -18, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 0.8 }
      )
        .fromTo(
          titleRef.current,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 1 },
          '-=0.5'
        )
        .fromTo(
          descRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.8 },
          '-=0.6'
        )
        .fromTo(
          ctaRef.current,
          { opacity: 0, y: 20, scale: 0.98 },
          { opacity: 1, y: 0, scale: 1, duration: 0.7 },
          '-=0.5'
        )
        .fromTo(
          statsRef.current?.children ? Array.from(statsRef.current.children) : [],
          { opacity: 0, y: 15 },
          { opacity: 1, y: 0, duration: 0.6, stagger: 0.12 },
          '-=0.4'
        )
        .fromTo(
          scrollPromptRef.current,
          { opacity: 0 },
          { opacity: 1, duration: 0.8 },
          '-=0.3'
        );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      id="section1"
      ref={containerRef}
      className="w-full h-screen relative overflow-hidden bg-transparent text-[#24191b] flex flex-col justify-between px-6 sm:px-10 md:px-16 lg:px-20 py-6 pointer-events-none"
    >
      {/* Top clearance for fixed Navbar */}
      <div className="w-full h-20 sm:h-24 pointer-events-none" aria-hidden="true" />

      {/* Hero Content Section - Modernized Layout & Stagger Target */}
      <div className="max-w-2xl relative z-40 pointer-events-auto my-auto pr-4">
        {/* Clinical Badge */}
        <div
          ref={badgeRef}
          className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-[#fffaf2]/90 border border-[#ead8c3] shadow-xs backdrop-blur-md mb-6"
        >
          <span className="w-2 h-2 rounded-full bg-[var(--crimson)] animate-warm-pulse" />
          <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#a0142f] font-mono">
            PHYSICAL THERAPY & CLINICAL BIOMECHANICS
          </span>
        </div>

        {/* Hero Title */}
        <h1
          ref={titleRef}
          className="text-4xl sm:text-6xl lg:text-7xl font-serif font-normal tracking-tight leading-[1.08] text-[#24191b] mb-6 drop-shadow-xs"
        >
          Precision rehab <br />
          <span className="font-serif italic text-[var(--crimson)]">
            for the way you move.
          </span>
        </h1>

        {/* Subtitle Description */}
        <p
          ref={descRef}
          className="text-[#5d1024]/90 text-base sm:text-lg font-normal leading-relaxed max-w-xl mb-8"
        >
          A modern physical therapy clinic merging kinematic movement intelligence with hands-on clinical care. Pain relief, structural mobility, and measurable return to performance.
        </p>

        {/* Action Buttons */}
        <div ref={ctaRef} className="flex flex-wrap items-center gap-4 mb-10">
          <BookingTriggerButton className="group bg-[var(--crimson)] text-[#fffaf2] font-semibold px-7 py-3.5 rounded-full flex items-center gap-2.5 hover:bg-[var(--crimson-dark)] hover:shadow-lg transition-all duration-300 shadow-md cursor-pointer text-sm sm:text-base">
            <span>Start with an evaluation</span>
            <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
          </BookingTriggerButton>
          <a
            href="#our-method"
            className="group bg-[#fffaf2]/80 backdrop-blur-sm text-[#24191b] font-medium px-6 py-3.5 rounded-full hover:bg-[#fffaf2] hover:border-[#a0142f]/40 transition-all duration-300 border border-[#ead8c3] inline-flex items-center gap-2 text-sm sm:text-base"
          >
            <span>See the method</span>
            <ChevronDown size={15} className="text-[#a0142f] transition-transform duration-300 group-hover:translate-y-0.5" />
          </a>
        </div>

        {/* Clinical Metrics / Key Pillar Strip */}
        <div
          ref={statsRef}
          className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-6 border-t border-[#ead8c3]/60 max-w-xl"
        >
          <div className="flex items-center gap-2.5 bg-[#fffaf2]/60 backdrop-blur-xs p-2 rounded-xl border border-[#ead8c3]/50">
            <ShieldCheck size={16} className="text-[var(--crimson)] shrink-0" />
            <div className="text-[11px] leading-tight">
              <span className="font-bold text-[var(--ink)] block font-mono">1-ON-1</span>
              <span className="text-[var(--ink)]/70 text-[10px]">Doctor of PT Care</span>
            </div>
          </div>
          <div className="flex items-center gap-2.5 bg-[#fffaf2]/60 backdrop-blur-xs p-2 rounded-xl border border-[#ead8c3]/50">
            <Activity size={16} className="text-[var(--crimson)] shrink-0" />
            <div className="text-[11px] leading-tight">
              <span className="font-bold text-[var(--ink)] block font-mono">REAL-TIME</span>
              <span className="text-[var(--ink)]/70 text-[10px]">Kinematic Capture</span>
            </div>
          </div>
          <div className="col-span-2 sm:col-span-1 flex items-center gap-2.5 bg-[#fffaf2]/60 backdrop-blur-xs p-2 rounded-xl border border-[#ead8c3]/50">
            <Sparkles size={16} className="text-[var(--crimson)] shrink-0" />
            <div className="text-[11px] leading-tight">
              <span className="font-bold text-[var(--ink)] block font-mono">OBJECTIVE</span>
              <span className="text-[var(--ink)]/70 text-[10px]">Functional Progress</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Scroll Indicator */}
      <div
        ref={scrollPromptRef}
        className="w-full flex items-center justify-between pt-4 pb-2 relative z-40 pointer-events-auto text-xs text-[#5d1024] font-medium"
      >
        <a
          href="#section2"
          className="group hover:text-[#a0142f] transition-colors cursor-pointer flex items-center gap-2 font-mono text-[11px]"
        >
          <span className="tracking-wider uppercase">01 ANATOMY ENGINE</span>
          <ChevronDown size={14} className="transition-transform group-hover:translate-y-1 text-[var(--crimson)]" />
        </a>
        <div className="hidden md:flex items-center gap-2 tracking-widest uppercase font-mono text-[10px] text-[var(--taupe)]">
          <span className="w-1.5 h-1.5 rounded-full bg-[var(--crimson)] animate-pulse" />
          <span>Interactive 3D Biomechanics • Scroll to Explore</span>
        </div>
      </div>
    </div>
  );
};

export default Section1;
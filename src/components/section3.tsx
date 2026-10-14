'use client';

import React, { useEffect, useRef, useState } from 'react';
import { registerGsapPlugins, gsap, isPrefersReducedMotion } from '@/lib/animation';
import { Activity, Gauge, ArrowUpRight, ShieldCheck, Compass } from 'lucide-react';

const Section3 = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const leftContentRef = useRef<HTMLDivElement>(null);
  const hudRef = useRef<HTMLDivElement>(null);
  const [currentAngle, setCurrentAngle] = useState(118);

  useEffect(() => {
    registerGsapPlugins();
    if (isPrefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      // Animate left side content on scroll
      gsap.fromTo(
        leftContentRef.current,
        { opacity: 0, x: -35 },
        {
          opacity: 1,
          x: 0,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 75%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Animate right HUD card
      gsap.fromTo(
        hudRef.current,
        { opacity: 0, scale: 0.92, y: 30 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 75%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Scrub subtle angle adjustment based on scroll
      gsap.to(
        {},
        {
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
            onUpdate: (self) => {
              // Interpolate angle realistically between 95 and 132 degrees
              const angle = Math.round(95 + self.progress * 37);
              setCurrentAngle(angle);
            },
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      id="section3"
      ref={containerRef}
      className="w-full h-screen relative overflow-hidden text-[#24191b] flex items-center justify-between px-6 sm:px-12 md:px-16 lg:px-20 pointer-events-none bg-transparent"
    >
      {/* Left Side: Title and Description - Layered on z-40 so 3D model never overlaps */}
      <div ref={leftContentRef} className="max-w-xl relative z-40 pointer-events-auto pr-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#fffaf2]/80 border border-[#ead8c3] backdrop-blur-md mb-4">
          <span className="w-1.5 h-1.5 rounded-full bg-[var(--crimson)]" />
          <span className="text-xs uppercase tracking-widest text-[#a0142f] font-mono font-semibold">
            02 — JOINT INTELLIGENCE
          </span>
        </div>

        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-normal tracking-tight leading-[1.08] mb-6 text-[#5d1024]">
          Range of motion, <br />
          <span className="italic text-[var(--crimson)]">measured live.</span>
        </h2>

        <p className="text-[#24191b]/85 text-base sm:text-lg font-normal leading-relaxed max-w-lg mb-8">
          Every degree of excursion, rotational shear, and angular velocity is measured dynamically against your baseline and contralateral limb. Objective recovery, visualized rep by rep.
        </p>

        {/* Clinical Benchmark Badges */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#fffaf2]/90 border border-[#ead8c3] text-xs font-mono text-[#5d1024] shadow-xs">
            <Compass size={14} className="text-[var(--crimson)]" />
            <span>Target: 135° Full Flexion</span>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#fffaf2]/90 border border-[#ead8c3] text-xs font-mono text-[#5d1024] shadow-xs">
            <ShieldCheck size={14} className="text-emerald-600" />
            <span>Zero Joint Impingement</span>
          </div>
        </div>
      </div>

      {/* Right Side: High-Tech Biomechanical HUD Panel */}
      <div
        ref={hudRef}
        className="hidden md:flex flex-col gap-4 w-84 lg:w-96 relative z-40 pointer-events-auto"
      >
        <div className="bg-[#fffaf2]/95 backdrop-blur-md border border-[#a0142f]/30 rounded-3xl p-6 shadow-[0_16px_40px_rgba(160,20,47,0.1)]">
          {/* Header */}
          <div className="flex items-center justify-between pb-3 border-b border-[#ead8c3] mb-4">
            <div className="flex items-center gap-2 text-xs font-mono text-[#a0142f] font-semibold">
              <Activity size={15} className="animate-pulse" />
              <span>LIVE KINEMATIC STREAM</span>
            </div>
            <span className="flex items-center gap-1.5 text-[10px] font-mono bg-emerald-100/80 text-emerald-800 px-2.5 py-0.5 rounded-full font-bold">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-ping" />
              ONLINE 60 FPS
            </span>
          </div>

          {/* Primary ROM Metric */}
          <div className="mb-6">
            <div className="text-xs font-mono text-[var(--taupe)] uppercase tracking-wider mb-1">
              Active Articulation Angle
            </div>
            <div className="flex items-baseline justify-between">
              <div className="text-4xl sm:text-5xl font-mono font-bold text-[#5d1024] tracking-tight">
                {currentAngle}°
              </div>
              <span className="text-xs font-mono text-emerald-700 bg-emerald-50 px-2 py-1 rounded-md border border-emerald-200">
                +14° from Initial Visit
              </span>
            </div>

            {/* Dynamic Visual Progress Bar */}
            <div className="w-full bg-[#ead8c3]/60 h-2.5 rounded-full mt-3 overflow-hidden p-0.5">
              <div
                className="bg-gradient-to-r from-[var(--crimson)] to-[#de3f5d] h-full rounded-full transition-all duration-300 shadow-xs"
                style={{ width: `${Math.min(100, Math.max(10, ((currentAngle - 60) / 80) * 100))}%` }}
              />
            </div>
            <div className="flex justify-between text-[10px] font-mono text-[var(--taupe)] mt-1.5">
              <span>0° Full Ext</span>
              <span>Baseline: 90°</span>
              <span>140° Full Flex</span>
            </div>
          </div>

          {/* Secondary Telemetry Grid */}
          <div className="grid grid-cols-2 gap-3 pt-3 border-t border-[#ead8c3]">
            <div className="bg-[#fbeddc]/70 p-3 rounded-2xl border border-[#ead8c3]/60">
              <span className="text-[10px] font-mono text-[var(--taupe)] block uppercase">
                Bilateral Symmetry
              </span>
              <span className="text-base font-bold font-mono text-[#5d1024]">
                98.4%
              </span>
              <span className="text-[10px] text-emerald-700 block font-sans">
                Contralateral match
              </span>
            </div>

            <div className="bg-[#fbeddc]/70 p-3 rounded-2xl border border-[#ead8c3]/60">
              <span className="text-[10px] font-mono text-[var(--taupe)] block uppercase">
                Peak Velocity
              </span>
              <span className="text-base font-bold font-mono text-[#5d1024]">
                146°/s
              </span>
              <span className="text-[10px] text-[var(--ink)]/70 block font-sans">
                Smooth acceleration
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Section3;
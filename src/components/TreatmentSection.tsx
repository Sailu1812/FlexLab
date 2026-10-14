'use client';

import React, { useEffect, useRef } from 'react';
import { registerGsapPlugins, gsap, isPrefersReducedMotion } from '@/lib/animation';
import { ShieldCheck, Compass, Zap, Activity, Heart, Sparkles } from 'lucide-react';

export default function TreatmentSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const pillarsRef = useRef<HTMLDivElement>(null);

  const clinicalIndicators = [
    {
      title: 'MOBILITY',
      desc: 'Restoring arthrokinematic glide and unrestricted joint excursion.',
      icon: Compass,
      tag: 'Joint Excursion',
    },
    {
      title: 'STRENGTH',
      desc: 'Rebuilding muscular torque and force-generating capacity.',
      icon: Zap,
      tag: 'Torque & Power',
    },
    {
      title: 'BALANCE',
      desc: 'Recalibrating vestibular and somatosensory postural reflexes.',
      icon: Activity,
      tag: 'Proprioception',
    },
    {
      title: 'CONTROL',
      desc: 'Fine-tuning neuromuscular recruitment and movement precision.',
      icon: ShieldCheck,
      tag: 'Motor Recruitment',
    },
    {
      title: 'RECOVERY',
      desc: 'Progressive tissue remodeling and sustainable return to activity.',
      icon: Heart,
      tag: 'Tissue Resilience',
    },
  ];

  useEffect(() => {
    registerGsapPlugins();
    if (isPrefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      // Header entrance
      gsap.fromTo(
        headerRef.current,
        { opacity: 0, y: 25 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Stage frame entrance
      gsap.fromTo(
        stageRef.current,
        { opacity: 0, scale: 0.95 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Pillar cards staggered entrance
      const cards = pillarsRef.current?.children ? Array.from(pillarsRef.current.children) : [];
      gsap.fromTo(
        cards,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: pillarsRef.current,
            start: 'top 85%',
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
      id="what-we-treat"
      className="min-h-screen py-16 sm:py-20 lg:py-24 px-4 sm:px-8 lg:px-14 bg-[#fbeddc]/40 border-y border-[#ead8c3] relative flex flex-col justify-center overflow-hidden"
      aria-label="What We Treat and Clinical Philosophy"
    >
      <div className="max-w-7xl mx-auto w-full flex flex-col justify-between my-auto">
        {/* Section Header */}
        <div
          ref={headerRef}
          className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 border-b border-[#ead8c3]/80 mb-8"
        >
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#fffaf2] border border-[#ead8c3] mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--crimson)] animate-warm-pulse" />
              <span className="text-[11px] uppercase tracking-[0.25em] font-mono text-[var(--crimson-dark)] font-semibold">
                Clinical Philosophy
              </span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[var(--ink)] leading-tight">
              Your body <span className="italic font-serif text-[var(--crimson)]">is the story.</span>
            </h2>
          </div>
          <p className="text-sm sm:text-base text-[var(--ink)]/80 font-sans max-w-md leading-relaxed">
            We don&apos;t treat symptoms in isolation. We analyze whole-body kinematics, compensation pathways, and motor control deficits to rebuild lasting resilience.
          </p>
        </div>

        {/* Central Display Card */}
        <div
          id="treatment-card"
          className="relative rounded-3xl bg-[#fffaf2]/95 backdrop-blur-md border border-[#ead8c3] p-5 sm:p-6 lg:p-8 shadow-[0_12px_40px_rgba(36,25,27,0.04)] grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-center"
        >
          {/* Left Column: Designated 3D Anatomical Spotlight Stage */}
          <div
            ref={stageRef}
            id="treatment-stage"
            className="lg:col-span-5 relative flex justify-center items-center min-h-[380px] lg:min-h-[440px]"
          >
            {/* Halo backdrop framing the 3D model */}
            <div className="absolute inset-4 rounded-full bg-[#fbeddc] filter blur-3xl opacity-80 pointer-events-none" />

            {/* Stage frame bounds */}
            <div className="relative w-full max-w-[340px] aspect-[3/4] rounded-3xl bg-[#fff5e8]/85 border border-[#ead8c3] flex flex-col justify-between p-5 shadow-xs pointer-events-none">
              {/* Top datum marker */}
              <div className="flex justify-between items-center text-[10px] font-mono text-[var(--crimson-dark)]">
                <span className="px-3 py-1 rounded-full bg-[#fffaf2] border border-[#ead8c3] shadow-xs flex items-center gap-1.5 font-bold">
                  <span className="w-1.5 h-1.5 rounded-full bg-[var(--crimson)] animate-warm-pulse" />
                  3D LIVE KINEMATICS
                </span>
                <span className="text-[var(--taupe)] font-medium">Sagittal / Frontal</span>
              </div>

              {/* Center target indicator guides */}
              <div className="space-y-24 my-auto">
                <div className="flex items-center gap-2 bg-[#fffaf2]/95 border border-[#ead8c3] px-3 py-1.5 rounded-full shadow-xs text-[11px] font-mono text-[var(--ink)]/90 w-fit backdrop-blur-xs">
                  <span className="w-1.5 h-1.5 rounded-full bg-[var(--crimson)]" />
                  <span>Pelvic Alignment & Core Stability</span>
                </div>
                <div className="flex items-center gap-2 bg-[#fffaf2]/95 border border-[#ead8c3] px-3 py-1.5 rounded-full shadow-xs text-[11px] font-mono text-[var(--ink)]/90 w-fit ml-auto backdrop-blur-xs">
                  <span className="w-1.5 h-1.5 rounded-full bg-[var(--crimson)]" />
                  <span>Patellofemoral Excursion Vector</span>
                </div>
              </div>

              {/* Bottom stage badge */}
              <div className="text-center text-[11px] font-mono text-[var(--taupe)] bg-[#fffaf2]/95 py-2 px-3.5 rounded-full border border-[#ead8c3] mx-auto shadow-xs flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
                <span>Compound Squat & Kinetic Dynamics</span>
              </div>
            </div>
          </div>

          {/* Right Column: Clinical Indicators Grid */}
          <div className="lg:col-span-7 relative z-40 flex flex-col justify-center space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-[#ead8c3]">
              <span className="text-xs font-mono uppercase tracking-widest text-[var(--taupe)] font-semibold">
                Foundational Movement Pillars
              </span>
              <span className="text-xs font-mono text-[var(--crimson)] font-bold">
                5 Kinetic Tiers
              </span>
            </div>

            {/* 6 Balanced Modular Cards (5 Pillars + 1 Integrative Summary) */}
            <div ref={pillarsRef} className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {clinicalIndicators.map((ind, i) => {
                const Icon = ind.icon;
                return (
                  <div
                    key={ind.title}
                    className="group p-4 rounded-2xl bg-[#fff5e8] border border-[#ead8c3] hover:border-[var(--crimson)]/50 hover:bg-[#fffaf2] hover:shadow-sm transition-all duration-300 flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-mono text-[var(--crimson)] font-bold">
                            0{i + 1}
                          </span>
                          <h3 className="font-mono text-xs font-bold tracking-wider text-[var(--ink)]">
                            {ind.title}
                          </h3>
                        </div>
                        <Icon size={14} className="text-[var(--taupe)] group-hover:text-[var(--crimson)] transition-colors" />
                      </div>
                      <p className="text-xs text-[var(--ink)]/80 leading-relaxed font-sans mb-3">
                        {ind.desc}
                      </p>
                    </div>
                    <div className="text-[10px] font-mono text-[var(--taupe)] pt-2 border-t border-[#ead8c3]/60 group-hover:text-[var(--crimson)] transition-colors">
                      {ind.tag}
                    </div>
                  </div>
                );
              })}

              {/* 6th Slot: Integrative Kinematic Assessment */}
              <div className="p-4 rounded-2xl bg-[#fbeddc]/80 border border-[#a0142f]/30 flex flex-col justify-between hover:bg-[#fbeddc] transition-all">
                <div>
                  <div className="flex items-center justify-between text-[11px] font-mono uppercase text-[var(--taupe)] font-semibold mb-2">
                    <span>Clinical Assessment</span>
                    <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
                  </div>
                  <div className="text-sm font-serif font-bold text-[var(--crimson-dark)] leading-snug mb-2">
                    Integrative Whole-Body Kinetic Excursion
                  </div>
                  <p className="text-xs text-[var(--ink)]/75">
                    Synchronized assessment of all 5 movement tiers in dynamic functional chains.
                  </p>
                </div>
                <div className="text-[10px] font-mono text-[var(--crimson)] pt-2 border-t border-[#ead8c3]/60 font-semibold">
                  Comprehensive 60-Min Evaluation
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

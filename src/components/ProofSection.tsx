'use client';

import React, { useEffect, useRef } from 'react';
import { UserCheck, Activity, HeartHandshake, Quote, Award, Sparkles } from 'lucide-react';
import { registerGsapPlugins, gsap, isPrefersReducedMotion } from '@/lib/animation';

export default function ProofSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const reviewRef = useRef<HTMLDivElement>(null);

  const pillars = [
    {
      number: '01',
      title: 'Personalized Care',
      subtitle: 'Tailored kinematic protocols',
      description:
        'Every body carries a unique injury history and movement profile. Your evaluation dictates an individual progression plan—never generic routine exercise printouts.',
      icon: UserCheck
    },
    {
      number: '02',
      title: 'Movement-Focused Treatment',
      subtitle: 'Active functional restoration',
      description:
        'We prioritize restoring dynamic mechanical efficiency and joint confidence so you regain long-term resilience rather than temporary passive symptom relief.',
      icon: Activity
    },
    {
      number: '03',
      title: 'Dedicated One-on-One Care',
      subtitle: 'Doctor of PT session guarantee',
      description:
        'Your sessions are spent directly with your licensed physical therapist. We evaluate, treat, and adjust each rep in real time without passing you off to aides.',
      icon: HeartHandshake
    }
  ];

  useEffect(() => {
    registerGsapPlugins();
    if (isPrefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      // Header entrance
      gsap.fromTo(
        headerRef.current,
        { opacity: 0, y: 30 },
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

      // 3 Pillar cards staggered
      const cards = cardsRef.current?.children ? Array.from(cardsRef.current.children) : [];
      gsap.fromTo(
        cards,
        { opacity: 0, y: 35, scale: 0.96 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: cardsRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Review box entrance
      gsap.fromTo(
        reviewRef.current,
        { opacity: 0, y: 25 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: reviewRef.current,
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
      id="proof"
      className="py-24 sm:py-28 px-6 sm:px-10 lg:px-16 bg-[var(--cream)] border-b border-[#ead8c3] relative"
      aria-label="Clinical Standards and Verified Practice"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div ref={headerRef} className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#fffaf2] border border-[#ead8c3] mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--crimson)] animate-warm-pulse" />
            <span className="text-xs uppercase tracking-[0.25em] font-mono text-[var(--crimson-dark)] font-semibold">
              Clinical Integrity
            </span>
          </div>
          <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl font-normal text-[var(--ink)] leading-tight mb-4">
            Movement is measurable. <br />
            <span className="italic font-serif text-[var(--crimson)]">Progress is personal.</span>
          </h2>
          <p className="text-base sm:text-lg text-[var(--ink)]/80 font-sans leading-relaxed">
            Our treatment methodology is built around precision metrics and dedicated clinician attention at every phase of your recovery.
          </p>
        </div>

        {/* 3 Large Pillars Cards */}
        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mb-16">
          {pillars.map((p) => {
            const IconComponent = p.icon;
            return (
              <div
                key={p.number}
                className="rounded-3xl p-8 sm:p-10 flex flex-col justify-between bg-[#fffaf2]/95 border border-[#ead8c3] hover:border-[var(--crimson)]/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_36px_rgba(160,20,47,0.06)]"
              >
                <div>
                  <div className="flex items-center justify-between pb-6 mb-6 border-b border-[#ead8c3]">
                    <span className="font-mono text-3xl font-bold text-[var(--crimson)]">
                      {p.number}
                    </span>
                    <div className="p-2.5 rounded-2xl bg-[#fff5e8] border border-[#ead8c3] text-[var(--crimson)]">
                      <IconComponent size={20} />
                    </div>
                  </div>

                  <h3 className="font-serif text-2xl font-bold text-[var(--ink)] mb-2">
                    {p.title}
                  </h3>
                  <div className="text-xs font-mono text-[var(--crimson-dark)] mb-4 font-semibold">
                    {p.subtitle}
                  </div>
                  <p className="text-sm text-[var(--ink)]/80 leading-relaxed font-sans">
                    {p.description}
                  </p>
                </div>

                <div className="pt-6 mt-8 border-t border-[#ead8c3]/60 text-[10px] font-mono tracking-wider uppercase text-[var(--taupe)] flex items-center justify-between">
                  <span>FlexLab Clinical Standard</span>
                  <Award size={13} className="text-[var(--crimson)]" />
                </div>
              </div>
            );
          })}
        </div>

        {/* Patient Testimonial Authentic Placeholder Container */}
        <div
          ref={reviewRef}
          className="rounded-3xl bg-[#fbeddc]/70 border border-[#ead8c3] p-8 sm:p-10 relative overflow-hidden backdrop-blur-xs"
        >
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 text-xs font-mono text-[var(--taupe)] uppercase tracking-wider mb-4">
              <Quote size={16} className="text-[var(--crimson)]" />
              <span>Verified Clinical Record & Feedback</span>
            </div>

            <div className="p-6 rounded-2xl bg-[#fffaf2]/90 border border-[#ead8c3] border-dashed shadow-xs">
              <p className="font-mono text-xs sm:text-sm text-[var(--ink)]/80 italic leading-relaxed mb-4">
                &ldquo;[Patient testimonial goes here. FlexLab policies require verified, HIPAA-compliant patient feedback prior to publication.]&rdquo;
              </p>
              <div className="flex items-center justify-between text-[11px] font-mono text-[var(--taupe)] pt-3 border-t border-[#ead8c3]/60">
                <span>[Verified Patient Name, Post-Surgical Rehab]</span>
                <span className="text-[var(--crimson-dark)] font-semibold flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                  AUTHENTIC PATIENT RECORD
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

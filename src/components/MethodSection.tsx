'use client';

import React, { useEffect, useRef } from 'react';
import { registerGsapPlugins, gsap, isPrefersReducedMotion } from '@/lib/animation';
import { ArrowRight, CheckCircle2, Search, Crosshair, Dumbbell, Trophy } from 'lucide-react';

export default function MethodSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  const steps = [
    {
      number: '01',
      title: 'Assess',
      subtitle: 'Kinematic & joint diagnostics',
      icon: Search,
      points: [
        'Understand how you move.',
        'Identify the mechanical limitation.',
        'Measure what matters objectively.'
      ],
      annotation: 'Range, torque & compensatory patterns'
    },
    {
      number: '02',
      title: 'Treat',
      subtitle: 'Targeted tissue & joint release',
      icon: Crosshair,
      points: [
        'Reduce pain and inflammation.',
        'Restore arthrokinematic mobility.',
        'Address root cause mechanisms.'
      ],
      annotation: 'Hands-on manual joint mobilization'
    },
    {
      number: '03',
      title: 'Train',
      subtitle: 'Neuromuscular reprogramming',
      icon: Dumbbell,
      points: [
        'Build progressive strength.',
        'Improve multi-joint motor control.',
        'Restore psychological confidence.'
      ],
      annotation: 'Progressive biomechanical loading'
    },
    {
      number: '04',
      title: 'Return',
      subtitle: 'Sustainable functional autonomy',
      icon: Trophy,
      points: [
        'Return to sports and daily life.',
        'Long-term injury risk mitigation.',
        'Unrestricted movement freedom.'
      ],
      annotation: 'Resilient athletic & daily performance'
    }
  ];

  useEffect(() => {
    registerGsapPlugins();
    if (isPrefersReducedMotion()) return;

    const cards = cardsRef.current?.querySelectorAll('.method-step-card');
    if (!cards || cards.length === 0) return;

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

      // Cards staggered entrance
      gsap.fromTo(
        cards,
        { opacity: 0, y: 40, scale: 0.95 },
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
            toggleActions: 'play none none reverse'
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="our-method"
      className="py-24 sm:py-28 px-6 sm:px-10 lg:px-16 bg-[var(--cream)] relative overflow-hidden"
      aria-label="The FlexLab Method"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div ref={headerRef} className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#fffaf2] border border-[#ead8c3] mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--crimson)] animate-warm-pulse" />
            <span className="text-xs uppercase tracking-[0.25em] font-mono text-[var(--crimson-dark)] font-semibold">
              Clinical Pathway
            </span>
          </div>

          <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl font-normal text-[var(--ink)] leading-tight mb-4">
            The FlexLab Method
          </h2>

          <div className="inline-flex items-center justify-center gap-2 sm:gap-3 flex-wrap text-xs sm:text-sm font-mono text-[var(--taupe)] bg-[#fffaf2]/80 px-4 py-2 rounded-2xl border border-[#ead8c3]">
            <span className="text-[var(--crimson)] font-bold">01 Assess</span>
            <span className="text-[#ead8c3]">→</span>
            <span className="text-[var(--crimson)] font-bold">02 Treat</span>
            <span className="text-[#ead8c3]">→</span>
            <span className="text-[var(--crimson)] font-bold">03 Train</span>
            <span className="text-[#ead8c3]">→</span>
            <span className="text-[var(--crimson)] font-bold">04 Return</span>
          </div>
        </div>

        {/* 4 Method Cards with modern glass styling */}
        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <div
                key={step.number}
                className="method-step-card rounded-3xl p-7 sm:p-8 flex flex-col justify-between bg-[#fffaf2]/90 border border-[#ead8c3] hover:border-[var(--crimson)]/50 transition-all duration-300 group hover:-translate-y-1.5 shadow-[0_4px_24px_rgba(36,25,27,0.03)] hover:shadow-[0_12px_36px_rgba(160,20,47,0.08)] backdrop-blur-xs"
              >
                <div>
                  {/* Step Number & Line */}
                  <div className="flex items-center justify-between pb-5 mb-5 border-b border-[#ead8c3]">
                    <span className="font-mono text-3xl font-bold text-[var(--crimson)]">
                      {step.number}
                    </span>
                    <div className="w-8 h-8 rounded-full bg-[#fff5e8] border border-[#ead8c3] flex items-center justify-center text-[var(--crimson)] group-hover:bg-[var(--crimson)] group-hover:text-white transition-colors">
                      <Icon size={14} />
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="font-serif text-2xl font-bold text-[var(--ink)] mb-1">
                    {step.title}
                  </h3>
                  <div className="text-xs font-mono text-[var(--taupe)] mb-6">
                    {step.subtitle}
                  </div>

                  {/* Point lines */}
                  <ul className="space-y-3 mb-8">
                    {step.points.map((pt, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-[var(--ink)]/85">
                        <span className="w-1.5 h-1.5 rounded-full bg-[var(--crimson)] mt-1.5 shrink-0" />
                        <span className="font-sans leading-relaxed">{pt}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Annotation footer */}
                <div className="pt-4 border-t border-[#ead8c3]/60 text-[11px] font-mono text-[var(--taupe)] flex items-center justify-between">
                  <span>{step.annotation}</span>
                  <ArrowRight size={13} className="text-[var(--crimson)] opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

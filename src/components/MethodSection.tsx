'use client';

import React, { useEffect, useRef } from 'react';
import { registerGsapPlugins, gsap, isPrefersReducedMotion } from '@/lib/animation';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

export default function MethodSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  const steps = [
    {
      number: '01',
      title: 'Assess',
      subtitle: 'Kinematic & joint diagnostics',
      points: [
        'Understand how you move.',
        'Identify the limitation.',
        'Measure what matters.'
      ],
      annotation: 'Range, torque & compensatory patterns'
    },
    {
      number: '02',
      title: 'Treat',
      subtitle: 'Targeted tissue & joint release',
      points: [
        'Reduce pain.',
        'Restore mobility.',
        'Address the source.'
      ],
      annotation: 'Hands-on manual joint mobilization'
    },
    {
      number: '03',
      title: 'Train',
      subtitle: 'Neuromuscular reprogramming',
      points: [
        'Build strength.',
        'Improve control.',
        'Restore confidence.'
      ],
      annotation: 'Progressive biomechanical loading'
    },
    {
      number: '04',
      title: 'Return',
      subtitle: 'Sustainable functional autonomy',
      points: [
        'Get back to the movement',
        'that matters to you.'
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
      gsap.fromTo(
        cards,
        { opacity: 0, y: 35 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.18,
          ease: 'power2.out',
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
      className="py-28 px-6 sm:px-10 lg:px-16 bg-[var(--cream)] relative overflow-hidden"
      aria-label="The FlexLab Method"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="inline-flex items-center gap-2 mb-4">
            <span className="w-2 h-2 rounded-full bg-[var(--crimson)]" />
            <span className="text-xs uppercase tracking-[0.25em] font-mono text-[var(--crimson-dark)] font-semibold">
              Clinical Pathway
            </span>
          </div>
          <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl font-normal text-[var(--ink)] leading-tight mb-4">
            The FlexLab Method
          </h2>
          <p className="text-base sm:text-lg font-mono text-[var(--taupe)] tracking-wide flex items-center justify-center gap-2 flex-wrap">
            <span>Assessment</span>
            <span className="text-[var(--crimson)]">→</span>
            <span>Treatment</span>
            <span className="text-[var(--crimson)]">→</span>
            <span>Movement</span>
            <span className="text-[var(--crimson)]">→</span>
            <span>Progress</span>
          </p>
        </div>

        {/* 4 Method Cards */}
        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step) => (
            <div
              key={step.number}
              className="method-step-card clinical-card rounded-3xl p-8 flex flex-col justify-between hover:border-[var(--rose)] transition-all duration-300 group hover:-translate-y-1 shadow-[0_4px_24px_rgba(36,25,27,0.03)]"
            >
              <div>
                {/* Step Number & Line */}
                <div className="flex items-center justify-between pb-6 mb-6 border-b border-[#ead8c3]">
                  <span className="font-serif text-3xl font-bold text-[var(--crimson)]">
                    {step.number}
                  </span>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-[var(--taupe)]">
                    Stage {step.number}
                  </span>
                </div>

                {/* Title */}
                <h3 className="font-serif text-2xl font-bold text-[var(--ink)] mb-1">
                  {step.title}
                </h3>
                <div className="text-xs font-mono text-[var(--taupe)] mb-6">
                  {step.subtitle}
                </div>

                {/* Point lines exactly matching brief */}
                <ul className="space-y-3 mb-8">
                  {step.points.map((pt, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-sm text-[var(--ink)]/85">
                      <span className="w-1.5 h-1.5 rounded-full bg-[var(--crimson)] mt-2 shrink-0" />
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
          ))}
        </div>
      </div>
    </section>
  );
}

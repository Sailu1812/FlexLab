'use client';

import React, { useEffect, useRef } from 'react';
import { CreditCard, Check, ShieldCheck, HelpCircle } from 'lucide-react';
import { BookingTriggerButton } from './BookingContext';
import { registerGsapPlugins, gsap, isPrefersReducedMotion } from '@/lib/animation';

interface InsuranceSectionProps {
  onOpenBooking?: () => void;
}

export default function InsuranceSection({ onOpenBooking }: InsuranceSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const bannerRef = useRef<HTMLDivElement>(null);

  const insuranceGroups = [
    {
      category: 'Government Programs',
      description: 'Direct billing with federal & state health plans',
      plans: ['Medicare', 'MassHealth (Medicaid)', 'Tricare', 'GIC / Unicare']
    },
    {
      category: 'Commercial Insurers',
      description: 'In-network participation across regional & national carriers',
      plans: [
        'Blue Cross Blue Shield of MA',
        'Harvard Pilgrim Health Care',
        'Tufts Health Plan',
        'Aetna',
        'Cigna',
        'United Healthcare',
        'Fallon Health',
        'Multiplan / PHCS'
      ]
    },
    {
      category: 'Injury & Accident Claims',
      description: 'Dedicated claim coordination & legal documentation',
      plans: ["Workers' Compensation", 'Auto and PIP (Personal Injury Protection)']
    },
    {
      category: 'Self-Pay Options',
      description: 'Transparent out-of-pocket scheduling without network delays',
      plans: ['Cash Pay', 'FSA / HSA Health Savings Accounts Accepted']
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

      // Category cards staggered
      const cards = cardsRef.current?.children ? Array.from(cardsRef.current.children) : [];
      gsap.fromTo(
        cards,
        { opacity: 0, y: 35, scale: 0.96 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          stagger: 0.12,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: cardsRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Bottom banner entrance
      gsap.fromTo(
        bannerRef.current,
        { opacity: 0, y: 25 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: bannerRef.current,
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
      id="insurance"
      className="py-24 sm:py-28 px-6 sm:px-10 lg:px-16 bg-[#fbeddc]/50 border-b border-[#ead8c3] relative"
      aria-label="Insurance and Payment Information"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div ref={headerRef} className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#fffaf2] border border-[#ead8c3] mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--crimson)] animate-warm-pulse" />
            <span className="text-xs uppercase tracking-[0.25em] font-mono text-[var(--crimson-dark)] font-semibold">
              Coverage & Transparency
            </span>
          </div>
          <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl font-normal text-[var(--ink)] leading-tight mb-4">
            Insurance & Payment
          </h2>
          <p className="text-base sm:text-lg text-[var(--ink)]/80 font-sans leading-relaxed">
            We keep clinical billing transparent and hassle-free. Coverage and out-of-pocket estimates are verified before your first appointment so there are no surprises.
          </p>
        </div>

        {/* 4 Groupings in Clear Editorial Typography */}
        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 mb-12">
          {insuranceGroups.map((group) => (
            <div
              key={group.category}
              className="rounded-3xl p-8 sm:p-10 flex flex-col justify-between bg-[#fffaf2]/95 border border-[#ead8c3] hover:border-[var(--crimson)]/40 transition-all duration-300 hover:shadow-[0_12px_36px_rgba(160,20,47,0.06)]"
            >
              <div>
                <div className="flex items-center justify-between pb-4 mb-4 border-b border-[#ead8c3]">
                  <h3 className="font-serif text-2xl font-bold text-[var(--ink)]">
                    {group.category}
                  </h3>
                  <CreditCard size={18} className="text-[var(--crimson)]" />
                </div>
                <p className="text-xs font-mono text-[var(--taupe)] mb-6">
                  {group.description}
                </p>

                <ul className="space-y-3">
                  {group.plans.map((plan) => (
                    <li
                      key={plan}
                      className="flex items-center gap-3 text-sm text-[var(--ink)] font-sans"
                    >
                      <span className="w-4 h-4 rounded-full bg-[#fbeddc] border border-[#ead8c3] flex items-center justify-center shrink-0">
                        <Check size={10} className="text-[var(--crimson)]" />
                      </span>
                      <span className="font-medium">{plan}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-6 mt-6 border-t border-[#ead8c3]/60 text-[10px] font-mono text-[var(--taupe)] uppercase tracking-wider flex items-center justify-between">
                <span>Direct In-Network Processing</span>
                <ShieldCheck size={13} className="text-emerald-600" />
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Verification Note & Action */}
        <div
          ref={bannerRef}
          className="p-6 sm:p-8 rounded-3xl bg-[#fffaf2] border border-[#ead8c3] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 shadow-xs"
        >
          <div>
            <div className="flex items-center gap-2 mb-1">
              <HelpCircle size={16} className="text-[var(--crimson)]" />
              <h4 className="font-serif text-lg font-bold text-[var(--ink)]">
                Have questions about your specific deductible or copay?
              </h4>
            </div>
            <p className="text-xs sm:text-sm text-[var(--ink)]/75 font-sans">
              Our clinical administration team verifies your benefits directly with your carrier before your initial evaluation visit.
            </p>
          </div>
          <BookingTriggerButton className="px-7 py-3.5 rounded-full bg-[var(--crimson)] text-[#fffaf2] text-xs sm:text-sm font-semibold hover:bg-[var(--crimson-dark)] transition-all whitespace-nowrap cursor-pointer shrink-0 shadow-md">
            Verify Benefits & Book
          </BookingTriggerButton>
        </div>
      </div>
    </section>
  );
}

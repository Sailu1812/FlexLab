import React from 'react';
import { ArrowDown } from 'lucide-react';
import { BookingTriggerButton } from './BookingContext';

interface FinalCTAProps {
  onOpenBooking?: () => void;
}

export default function FinalCTA({ onOpenBooking }: FinalCTAProps) {
  return (
    <section
      id="cta"
      className="relative py-28 px-6 sm:px-10 lg:px-16 bg-[#fffaf2] border-b border-[#ead8c3] overflow-hidden"
      aria-label="Call to Action"
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Column: CTA Editorial & Booking Actions */}
        <div className="lg:col-span-7 flex flex-col justify-center text-left relative z-40">
          <div className="inline-flex items-center gap-2 mb-6">
            <span className="w-2 h-2 rounded-full bg-[var(--crimson)]" />
            <span className="text-xs uppercase tracking-[0.25em] font-mono text-[var(--crimson-dark)] font-semibold">
              Begin Your Recovery
            </span>
          </div>

          <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl font-normal text-[var(--ink)] leading-[1.1] mb-6">
            Ready to move <br />
            <span className="italic text-[var(--crimson)]">forward?</span>
          </h2>

          <p className="text-lg sm:text-xl text-[var(--ink)]/85 max-w-xl font-sans leading-relaxed mb-10">
            Let&apos;s understand what&apos;s limiting your movement and build a clear, measurable path back to it.
          </p>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
            <BookingTriggerButton className="px-9 py-4 rounded-full bg-[var(--crimson)] text-[#fffaf2] text-base font-semibold tracking-wide shadow-md hover:bg-[var(--crimson-dark)] active:scale-[0.98] transition-all cursor-pointer text-center">
              Book an Evaluation
            </BookingTriggerButton>
            <a
              href="#services"
              className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-full border border-[#ead8c3] bg-[#fff5e8] text-[var(--ink)] text-base font-medium hover:bg-[#fbeddc] transition-colors"
            >
              <span>Explore our services</span>
              <ArrowDown size={14} className="text-[var(--crimson)]" />
            </a>
          </div>

          <div className="mt-10 text-xs font-mono text-[var(--taupe)]">
            Initial evaluations include a comprehensive 60-minute kinematic assessment.
          </div>
        </div>

        {/* Right Column: Stage where 3D Model stands idle before footer */}
        <div className="lg:col-span-5 relative flex justify-center items-center min-h-[460px] pointer-events-none">
          {/* Soft clinical halo backdrop framing the idle 3D model */}
          <div className="absolute inset-4 rounded-full bg-[#fbeddc] filter blur-3xl opacity-75 pointer-events-none" />

          {/* Stage guidelines */}
          <div className="relative w-full max-w-[320px] aspect-[3/4] flex flex-col justify-between p-4 pointer-events-none">
            <div className="flex justify-between items-center text-[10px] font-mono text-[var(--crimson-dark)]">
              <span className="px-2.5 py-1 rounded-full bg-[#fff5e8] border border-[#ead8c3] shadow-sm flex items-center gap-1.5 font-bold">
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--crimson)] animate-warm-pulse" />
                ACTIVE CLINICAL ENGINE
              </span>
              <span className="text-[var(--taupe)]">Ready State</span>
            </div>

            <div className="mt-auto text-center text-[10px] font-mono text-[var(--taupe)] bg-[#fff5e8]/90 py-1 px-3 rounded-full border border-[#ead8c3] mx-auto">
              Standing Posture & Functional Alignment
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

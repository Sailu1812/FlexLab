import React from 'react';
import Image from 'next/image';
import { ArrowDown } from 'lucide-react';
import { BookingTriggerButton } from './BookingContext';

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-[92vh] lg:min-h-screen flex items-center pt-28 pb-16 px-6 sm:px-8 lg:px-12 overflow-hidden bg-[var(--cream)]"
      aria-label="FlexLab Introduction"
    >
      {/* Background subtle radial warmth */}
      <div
        className="absolute inset-0 pointer-events-none opacity-40 bg-[radial-gradient(circle_at_70%_45%,#fbeddc_0%,transparent_65%)]"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center relative z-10">
        {/* Left Editorial Content - Semantic HTML rendered purely on server without JS */}
        <div className="lg:col-span-6 xl:col-span-7 flex flex-col justify-center text-left">
          <div className="inline-flex items-center gap-2 mb-6">
            <span className="w-2 h-2 rounded-full bg-[var(--crimson)]" />
            <span className="text-xs uppercase tracking-[0.25em] font-mono text-[var(--crimson-dark)] font-semibold">
              FlexLab Clinical Practice
            </span>
          </div>

          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-normal tracking-tight text-[var(--ink)] leading-[1.08] mb-6">
            Physical therapy <br />
            for getting back <br />
            <span className="italic font-serif text-[var(--crimson)]">to movement.</span>
          </h1>

          <p className="text-lg sm:text-xl text-[var(--ink)]/80 max-w-xl leading-relaxed mb-8 font-sans">
            Your body is built to move. Our job is to help you move with confidence again.
          </p>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mb-12">
            <BookingTriggerButton className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-[var(--crimson)] text-[#fffaf2] text-base font-medium tracking-wide shadow-md hover:bg-[var(--crimson-dark)] active:scale-[0.98] transition-all focus-visible:outline-2 focus-visible:outline-[var(--crimson-dark)] cursor-pointer">
              Book an evaluation
            </BookingTriggerButton>
            <a
              href="#what-we-treat"
              className="inline-flex items-center justify-center px-6 py-4 rounded-full border border-[#ead8c3] bg-[#fffaf2]/80 hover:bg-[#fffaf2] text-[var(--ink)] text-base font-medium transition-colors"
            >
              Clinical Philosophy
            </a>
          </div>

          {/* Scroll Prompt */}
          <div className="flex items-center gap-3 text-xs tracking-wider uppercase font-mono text-[var(--taupe)]">
            <span className="w-6 h-[1px] bg-[var(--taupe)]/60" />
            <span>Scroll to explore</span>
            <ArrowDown size={14} className="animate-bounce text-[var(--crimson)]" />
          </div>
        </div>

        {/* Right Anatomical Hero Visual - Works immediately without JS, decorative */}
        <div
          className="lg:col-span-6 xl:col-span-5 relative flex justify-center items-center"
          aria-hidden="true"
        >
          <div className="relative w-full max-w-[420px] lg:max-w-[480px] aspect-[3/4] flex items-center justify-center">
            {/* Soft clinical halo backdrop */}
            <div className="absolute inset-0 rounded-full bg-[#fbeddc]/70 filter blur-3xl scale-90 pointer-events-none" />

            {/* High-priority preloaded ecorché image */}
            <Image
              src="/images/hero-anatomy.webp"
              alt=""
              width={768}
              height={1024}
              priority
              quality={90}
              className="relative z-10 w-full h-full object-contain filter drop-shadow-[0_12px_32px_rgba(93,16,36,0.08)] select-none pointer-events-none transition-transform duration-700 hover:scale-[1.02]"
            />

            {/* Subtle anatomical datum markers */}
            <div className="absolute top-[22%] -left-4 sm:-left-6 hidden sm:flex items-center gap-2 bg-[#fffaf2]/90 border border-[#ead8c3] px-3 py-1.5 rounded-full shadow-sm text-[11px] font-mono text-[var(--ink)]/80">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--crimson)] animate-warm-pulse" />
              <span>Shoulder Girdle</span>
            </div>

            <div className="absolute top-[48%] -right-2 sm:-right-4 hidden sm:flex items-center gap-2 bg-[#fffaf2]/90 border border-[#ead8c3] px-3 py-1.5 rounded-full shadow-sm text-[11px] font-mono text-[var(--ink)]/80">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--crimson)] animate-warm-pulse" />
              <span>Pelvic Stability</span>
            </div>

            <div className="absolute bottom-[24%] -left-3 sm:-left-5 hidden sm:flex items-center gap-2 bg-[#fffaf2]/90 border border-[#ead8c3] px-3 py-1.5 rounded-full shadow-sm text-[11px] font-mono text-[var(--ink)]/80">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--crimson)] animate-warm-pulse" />
              <span>Patellofemoral Axis</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

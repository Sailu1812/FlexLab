'use client';

import React, { useState, useEffect, useRef } from 'react';
import { SERVICES, ServiceItem } from '@/lib/services';
import { registerGsapPlugins, gsap, ScrollTrigger, isPrefersReducedMotion } from '@/lib/animation';
import { ChevronRight, Target, Camera, Activity, RotateCw } from 'lucide-react';
import { useBooking } from './BookingContext';

interface ServicesSectionProps {
  onOpenBooking?: () => void;
}

export default function ServicesSection({ onOpenBooking }: ServicesSectionProps) {
  const { openBooking } = useBooking();
  const handleBooking = onOpenBooking || openBooking;
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const isReducedMotion = useRef(false);

  const activeService: ServiceItem = SERVICES[activeIndex];

  const handleSelectDiscipline = (index: number) => {
    setActiveIndex(index);
  };

  useEffect(() => {
    const s = SERVICES[activeIndex];
    if (s && typeof window !== 'undefined') {
      window.dispatchEvent(
        new CustomEvent('flexlab-discipline-select', {
          detail: { index: activeIndex, cameraAngle: s.cameraAngle }
        })
      );
    }
  }, [activeIndex]);

  // Helper for anatomical highlight position and pulsing indicator on body (matched to Demo)
  const getHighlightDetails = (region: ServiceItem['highlightRegion']) => {
    switch (region) {
      case 'knee-hip-shoulder':
        return {
          label: 'Knee & Shoulder Girdle Complex',
          points: [
            { top: '24%', left: '46%', label: 'Shoulder Joint' },
            { top: '48%', left: '44%', label: 'Femoroacetabular Joint' },
            { top: '72%', left: '46%', label: 'Tibiofemoral Joint' }
          ]
        };
      case 'calf-hamstring-ankle':
        return {
          label: 'Posterior Kinetic Chain & Achillodynia',
          points: [
            { top: '60%', left: '48%', label: 'Hamstring Origin' },
            { top: '80%', left: '49%', label: 'Gastrocnemius-Soleus' },
            { top: '91%', left: '49%', label: 'Talocrural Axis' }
          ]
        };
      case 'spine':
        return {
          label: 'Spinal Column (Cervical, Thoracic & Lumbar)',
          points: [
            { top: '22%', left: '50%', label: 'Cervical Segment' },
            { top: '38%', left: '50%', label: 'Thoracic Kyphosis' },
            { top: '50%', left: '50%', label: 'Lumbar Lordosis (L1-S1)' }
          ]
        };
      case 'joint-tissue':
        return {
          label: 'Myofascial Sheaths & Synovial Capsule',
          points: [
            { top: '35%', left: '52%', label: 'Glenohumeral Capsule' },
            { top: '70%', left: '48%', label: 'Sub-patellar Bursa' }
          ]
        };
      case 'quad-glute':
        return {
          label: 'Quadriceps Femoris & Gluteal Muscle Bellies',
          points: [
            { top: '56%', left: '43%', label: 'Rectus Femoris' },
            { top: '59%', left: '53%', label: 'Vastus Lateralis' }
          ]
        };
      case 'core-balance':
        return {
          label: 'Deep Core Cylinders & Lower Extremity Mechanoreceptors',
          points: [
            { top: '45%', left: '50%', label: 'Transversus Abdominis' },
            { top: '88%', left: '46%', label: 'Ankle Mortise' }
          ]
        };
      case 'neck-upperback':
        return {
          label: 'Craniocervical Junction & Upper Trapezius',
          points: [
            { top: '18%', left: '50%', label: 'Suboccipital Spine' },
            { top: '26%', left: '46%', label: 'Upper Trapezius Sheath' }
          ]
        };
      default:
        return { label: 'General Movement Anatomy', points: [] };
    }
  };

  const highlight = getHighlightDetails(activeService.highlightRegion);

  useEffect(() => {
    registerGsapPlugins();
    if (isPrefersReducedMotion()) return;

    const container = containerRef.current;
    if (!container) return;

    const ctx = gsap.context(() => {
      // Pin Services section so model is stuck in Orthopedic Rehab visual frame
      // while scrolling, the 3D model spins 360° with 3D joint markings and labels!
      ScrollTrigger.create({
        trigger: container,
        start: 'top top',
        end: '+=1800',
        pin: true,
        scrub: 1,
        anticipatePin: 1,
        onEnter: () => {
          window.dispatchEvent(new CustomEvent('flexlab-ortho-active', { detail: { active: true } }));
        },
        onLeave: () => {
          window.dispatchEvent(new CustomEvent('flexlab-ortho-active', { detail: { active: false } }));
        },
        onEnterBack: () => {
          window.dispatchEvent(new CustomEvent('flexlab-ortho-active', { detail: { active: true } }));
        },
        onLeaveBack: () => {
          window.dispatchEvent(new CustomEvent('flexlab-ortho-active', { detail: { active: false } }));
        },
      });
    }, container);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="services"
      ref={containerRef}
      className="min-h-screen lg:h-screen lg:max-h-[960px] py-4 sm:py-6 lg:py-5 px-4 sm:px-8 lg:px-12 bg-[#fffaf2] border-b border-[#ead8c3] relative flex flex-col justify-between overflow-hidden"
      aria-label="Clinical Services"
    >
      <div className="max-w-7xl mx-auto w-full h-full flex flex-col justify-between">
        {/* Compact Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 pb-2 border-b border-[#ead8c3]/60">
          <div>
            <div className="inline-flex items-center gap-2 mb-1">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--crimson)] animate-pulse" />
              <span className="text-[11px] uppercase tracking-[0.25em] font-mono text-[var(--crimson-dark)] font-semibold">
                Specialized Care • 7 Kinetic Tiers
              </span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl lg:text-3xl font-normal text-[var(--ink)] leading-tight">
              Seven clinical disciplines, <span className="italic text-[var(--crimson)]">one unified body.</span>
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-[var(--ink)]/75 font-sans max-w-md hidden md:block">
            Each discipline targets a specific kinetic tier. Explore how our therapists examine, mobilize, and strengthen your musculoskeletal system.
          </p>
        </div>

        {/* 7-Discipline Kinetic Tier Strip (All visible on desktop, no vertical bloat) */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-1.5 my-2" role="tablist">
          {SERVICES.map((s, index) => {
            const isActive = index === activeIndex;
            return (
              <button
                key={s.id}
                role="tab"
                aria-selected={isActive}
                onClick={() => handleSelectDiscipline(index)}
                className={`group relative px-2.5 py-2 rounded-xl text-left transition-all duration-200 cursor-pointer border ${
                  isActive
                    ? 'bg-[var(--crimson)] text-[#fffaf2] border-[var(--crimson)] shadow-sm'
                    : 'bg-[#fff5e8] text-[var(--ink)]/75 border-[#ead8c3] hover:border-[var(--rose)] hover:bg-[#faefe2]'
                }`}
              >
                <div className="flex items-center justify-between text-[10px] font-mono mb-0.5">
                  <span className={`font-bold ${isActive ? 'text-[#fffaf2]/90' : 'text-[var(--crimson)]'}`}>
                    {s.number}
                  </span>
                  <span
                    className={`w-1.5 h-1.5 rounded-full transition-colors ${
                      isActive ? 'bg-[#fffaf2]' : 'bg-[var(--crimson)]/30 group-hover:bg-[var(--crimson)]'
                    }`}
                  />
                </div>
                <div className="text-xs font-semibold truncate leading-tight">
                  {s.title}
                </div>
              </button>
            );
          })}
        </div>

        {/* Main Console Card (Matched with Demo's 2-column balanced structure) */}
        <div className="flex-1 min-h-0 grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-8 items-center rounded-2xl lg:rounded-3xl bg-[#fff5e8] border border-[#ead8c3] p-4 sm:p-5 lg:p-6 shadow-[0_8px_32px_rgba(36,25,27,0.03)] overflow-hidden">
          {/* Left Column: Discipline Profile & Clinical Specifications */}
          <div className="lg:col-span-6 flex flex-col justify-between h-full space-y-3">
            <div>
              {/* Profile Header Meta */}
              <div className="flex items-center justify-between pb-2.5 border-b border-[#ead8c3]">
                <div className="flex items-center gap-2">
                  <span className="font-serif text-3xl font-bold text-[var(--crimson)] leading-none">
                    {activeService.number}
                  </span>
                  <span className="w-1.5 h-1.5 rounded-full bg-[var(--crimson)]" />
                  <span className="text-xs font-mono uppercase tracking-widest text-[var(--taupe)]">
                    Discipline Profile
                  </span>
                </div>
                <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#fbeddc] border border-[#ead8c3] text-[11px] font-mono text-[var(--ink)]/80">
                  <Camera size={12} className="text-[var(--crimson)]" />
                  <span>Perspective: {activeService.cameraAngle}</span>
                </div>
              </div>

              {/* Title & Tagline */}
              <div className="mt-2.5 mb-2">
                <h3 className="font-serif text-2xl sm:text-3xl font-normal text-[var(--ink)] leading-tight">
                  {activeService.title}
                </h3>
                <p className="text-xs sm:text-sm font-mono text-[var(--crimson-dark)] mt-0.5">
                  {activeService.tagline}
                </p>
              </div>

              {/* Description */}
              <p className="text-xs sm:text-sm text-[var(--ink)]/85 leading-relaxed font-sans mb-3 line-clamp-3 sm:line-clamp-none">
                {activeService.description}
              </p>

              {/* 2-Column Clinical Details: Focus & Indications */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-2.5">
                {/* Primary Anatomical Focus */}
                <div className="p-3 rounded-xl bg-[#fffaf2]/80 border border-[#ead8c3]/90 flex flex-col justify-between">
                  <div className="text-[11px] font-mono uppercase tracking-wider text-[var(--taupe)] mb-1.5 flex items-center gap-1.5">
                    <Target size={12} className="text-[var(--crimson)]" />
                    <span>Primary Focus</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {activeService.focusJoints.map((joint) => (
                      <span
                        key={joint}
                        className="px-2 py-1 rounded-lg bg-[#fff5e8] border border-[#ead8c3] text-[11px] font-mono text-[var(--ink)] font-semibold"
                      >
                        {joint}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Clinical Indications Checklist */}
                <div className="p-3 rounded-xl bg-[#fffaf2]/80 border border-[#ead8c3]/90">
                  <div className="text-[11px] font-mono uppercase tracking-wider text-[var(--taupe)] mb-1.5 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[var(--crimson)]" />
                    <span>Key Pathologies</span>
                  </div>
                  <div className="space-y-1">
                    {activeService.indications.slice(0, 3).map((ind, i) => (
                      <div
                        key={i}
                        className="flex items-start gap-1.5 text-[11px] text-[var(--ink)]/85 leading-tight"
                      >
                        <span className="w-1 h-1 rounded-full bg-[var(--crimson)] mt-1.5 shrink-0" />
                        <span className="truncate">{ind}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Clinical Protocol Standard */}
              <div className="px-3 py-2 rounded-xl bg-[#fbeddc] border border-[#ead8c3] text-xs font-mono text-[var(--crimson-dark)] flex items-center gap-2.5">
                <Activity size={14} className="text-[var(--crimson)] shrink-0" />
                <div className="truncate">
                  <span className="font-bold uppercase tracking-wider text-[10px] text-[var(--taupe)] mr-2">
                    Standard:
                  </span>
                  <span>{activeService.clinicalNote}</span>
                </div>
              </div>
            </div>

            {/* Bottom Actions & Pagination Row */}
            <div className="pt-3 border-t border-[#ead8c3] flex items-center justify-between">
              <button
                type="button"
                onClick={handleBooking}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[var(--crimson)] text-[#fffaf2] text-xs font-semibold hover:bg-[var(--crimson-dark)] transition-colors cursor-pointer shadow-xs"
              >
                <span>Book for {activeService.title}</span>
                <ChevronRight size={14} />
              </button>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  disabled={activeIndex === 0}
                  onClick={() => handleSelectDiscipline(Math.max(0, activeIndex - 1))}
                  className="w-8 h-8 rounded-full border border-[#ead8c3] bg-[#fffaf2] text-[var(--ink)] text-xs disabled:opacity-30 disabled:cursor-not-allowed hover:border-[var(--crimson)] flex items-center justify-center transition-colors cursor-pointer"
                  aria-label="Previous Service"
                >
                  ←
                </button>
                <span className="text-xs font-mono text-[var(--taupe)] px-1">
                  {activeIndex + 1} / {SERVICES.length}
                </span>
                <button
                  type="button"
                  disabled={activeIndex === SERVICES.length - 1}
                  onClick={() => handleSelectDiscipline(Math.min(SERVICES.length - 1, activeIndex + 1))}
                  className="w-8 h-8 rounded-full border border-[#ead8c3] bg-[#fffaf2] text-[var(--ink)] text-xs disabled:opacity-30 disabled:cursor-not-allowed hover:border-[var(--crimson)] flex items-center justify-center transition-colors cursor-pointer"
                  aria-label="Next Service"
                >
                  →
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: Anatomical Figure Highlight System (Matched to Demo structure) */}
          <div className="lg:col-span-6 relative flex flex-col items-center justify-center h-full">
            {/* Perspective & Focus Banner (from Demo) */}
            <div className="w-full max-w-[360px] sm:max-w-[400px] flex items-center justify-between text-xs font-mono text-[var(--taupe)] pb-2 mb-2 border-b border-[#ead8c3]">
              <span className="text-[var(--crimson-dark)] font-bold">
                {highlight.label}
              </span>
              <span>Anatomical Projection</span>
            </div>

            {/* Visual Frame - 3:4 Aspect Ratio Frame matching Demo where 3D Muscular Model is centered */}
            <div
              id="services-stage-card"
              className="relative w-full max-w-[360px] sm:max-w-[400px] aspect-[3/4] rounded-2xl lg:rounded-3xl overflow-hidden bg-[#fffaf2]/90 border border-[#ead8c3] shadow-md flex items-center justify-center"
            >
              {/* Soft warm halo backdrop */}
              <div className="absolute inset-0 rounded-full bg-[#fbeddc] filter blur-3xl scale-90 pointer-events-none" />

              {/* Status Header HUD */}
              <div className="absolute top-3 left-3 right-3 z-40 pointer-events-none flex items-center justify-between">
                <span className="px-2.5 py-0.5 rounded-full bg-[#fffaf2]/95 backdrop-blur-sm border border-[#ead8c3] text-[10px] font-mono text-[var(--crimson-dark)] font-bold shadow-xs flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[var(--crimson)] animate-pulse" />
                  {activeService.title.toUpperCase()} • 3D
                </span>
                <span className="text-[10px] font-mono font-bold text-[var(--crimson-dark)] px-2.5 py-0.5 rounded-full bg-[#fffaf2]/95 backdrop-blur-sm border border-[#ead8c3] shadow-xs">
                  {activeService.cameraAngle} View
                </span>
              </div>

              {/* Pulsing Anatomical Highlight Points (Placed on top of 3D Model with z-50) */}
              {highlight.points.map((pt, idx) => (
                <div
                  key={idx}
                  className="absolute z-50 flex items-center gap-2 transition-all duration-500 group pointer-events-none -translate-y-1/2 -translate-x-1.5"
                  style={{ top: pt.top, left: pt.left, zIndex: 50 }}
                >
                  <div className="relative flex items-center justify-center">
                    <span className="w-4 h-4 rounded-full bg-[var(--crimson)]/30 animate-ping absolute" />
                    <span className="w-2.5 h-2.5 rounded-full bg-[var(--crimson)] border border-[#fffaf2] shadow-md relative z-50" />
                  </div>
                  <div className="bg-[#fffaf2]/95 backdrop-blur-sm border border-[#ead8c3] px-2.5 py-1 rounded-lg shadow-sm text-[10px] font-mono text-[var(--ink)] font-semibold whitespace-nowrap pointer-events-none relative z-50">
                    {pt.label}
                  </div>
                </div>
              ))}
            </div>

            {/* Bottom Camera / Rotation Status (from Demo) */}
            <div className="w-full max-w-[360px] sm:max-w-[400px] mt-2.5 p-2.5 rounded-2xl bg-[#fffaf2] border border-[#ead8c3] flex items-center justify-between text-xs font-mono text-[var(--ink)]/80">
              <span className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--crimson)]" />
                <span>Targeted Tissue Focus</span>
              </span>
              <span className="text-[var(--crimson)] font-bold">
                {activeService.cameraAngle} Alignment
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

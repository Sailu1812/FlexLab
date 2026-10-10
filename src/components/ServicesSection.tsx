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
  const [orthoProgress, setOrthoProgress] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const isReducedMotion = useRef(false);

  const activeService: ServiceItem = SERVICES[activeIndex];

  const handleSelectDiscipline = (index: number) => {
    setActiveIndex(index);
    const s = SERVICES[index];
    if (s && typeof window !== 'undefined') {
      window.dispatchEvent(
        new CustomEvent('flexlab-discipline-select', {
          detail: { index, cameraAngle: s.cameraAngle }
        })
      );
    }
  };

  // Helper for anatomical highlight position and pulsing indicator on body
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
        onUpdate: (self) => {
          const p = self.progress;
          setOrthoProgress(p);
          window.dispatchEvent(
            new CustomEvent('flexlab-ortho-sync', {
              detail: { progress: p }
            })
          );
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

        {/* Main Console Card (Fits within viewport height) */}
        <div className="flex-1 min-h-0 grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-6 items-center rounded-2xl lg:rounded-3xl bg-[#fff5e8] border border-[#ead8c3] p-4 sm:p-5 lg:p-6 shadow-[0_8px_32px_rgba(36,25,27,0.03)] overflow-hidden">
          {/* Left Column: Discipline Profile & Clinical Specifications */}
          <div className="lg:col-span-7 flex flex-col justify-between h-full space-y-3">
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

              {/* Targeted Anatomical Axis / Beacons in DISCIPLINE PROFILE card */}
              <div className="p-2.5 rounded-xl bg-[#fffaf2]/90 border border-[#ead8c3] mb-2.5">
                <div className="text-[10px] font-mono uppercase tracking-wider text-[var(--taupe)] mb-1.5 flex items-center justify-between">
                  <span className="flex items-center gap-1.5">
                    <Target size={12} className="text-[var(--crimson)]" />
                    <span>Targeted Anatomical Axis (Body Beacons)</span>
                  </span>
                  <span className="text-[var(--crimson-dark)] font-bold text-[10px]">
                    {highlight.points.length} Anatomical Targets
                  </span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {highlight.points.map((pt, idx) => (
                    <div
                      key={idx}
                      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#fff5e8] border border-[#ead8c3] text-[11px] font-mono text-[var(--ink)] font-semibold shadow-2xs"
                    >
                      <span className="w-4 h-4 rounded-full bg-[var(--crimson)] text-[#fffaf2] text-[9px] flex items-center justify-center font-bold">
                        {idx + 1}
                      </span>
                      <span>{pt.label}</span>
                    </div>
                  ))}
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

          {/* Right Column: Visual Stage / 3D Model Framing */}
          <div className="lg:col-span-5 relative flex flex-col items-center justify-center h-full">
            {/* Visual Frame HUD (Image removed so 3D muscular model is fully visible) */}
            <div className="relative w-full max-w-[340px] sm:max-w-[380px] aspect-[3/4] max-h-[360px] lg:max-h-[390px] rounded-2xl overflow-hidden bg-[#fffaf2]/80 border border-[#ead8c3] p-3 shadow-xs flex items-center justify-center">
              {/* Soft warm halo backdrop */}
              <div className="absolute inset-0 rounded-full bg-[#fbeddc] filter blur-2xl scale-90 pointer-events-none" />

              {/* Status Header HUD */}
              <div className="absolute top-3 left-3 right-3 z-20 pointer-events-none flex items-center justify-between">
                <span className="px-2.5 py-1 rounded-full bg-[#fffaf2]/95 backdrop-blur-sm border border-[#ead8c3] text-[9px] font-mono text-[var(--crimson-dark)] font-bold shadow-xs flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[var(--crimson)] animate-pulse" />
                  {activeService.title.toUpperCase()} • 3D
                </span>
                <span className="text-[10px] font-mono font-bold text-[var(--crimson)] px-2 py-0.5 rounded-full bg-[#fffaf2]/90 border border-[#ead8c3]">
                  {Math.round(orthoProgress * 720)}° ROTATION
                </span>
              </div>

              {/* Pulsing Target Points & Anatomical Labels on 3D Model */}
              {highlight.points.map((pt, idx) => {
                const isLeft = parseInt(pt.left) < 48;
                return (
                  <div
                    key={idx}
                    className={`absolute z-30 flex items-center gap-1.5 transition-all duration-500 pointer-events-none ${
                      isLeft ? 'flex-row-reverse' : 'flex-row'
                    }`}
                    style={{
                      top: pt.top,
                      left: pt.left,
                      transform: isLeft ? 'translate(-100%, -50%)' : 'translate(0, -50%)',
                    }}
                  >
                    {/* Target Pin Node */}
                    <div className="relative flex items-center justify-center shrink-0">
                      <span className="w-4 h-4 rounded-full bg-[var(--crimson)]/35 animate-ping absolute" />
                      <span className="w-2.5 h-2.5 rounded-full bg-[var(--crimson)] border border-[#fffaf2] shadow-sm relative z-10" />
                    </div>

                    {/* Connecting Tick Line */}
                    <div className="w-2.5 h-[1.5px] bg-[var(--crimson)] shrink-0" />

                    {/* Label Badge with Number and Full Anatomical Label */}
                    <div className="bg-[#fffaf2]/95 backdrop-blur-md border border-[#ead8c3] px-2 py-0.5 rounded-md shadow-xs flex items-center gap-1.5 shrink-0">
                      <span className="w-3.5 h-3.5 rounded-full bg-[var(--crimson)] text-[#fffaf2] text-[8px] flex items-center justify-center font-bold shrink-0">
                        {idx + 1}
                      </span>
                      <span className="text-[10px] font-mono font-bold text-[var(--ink)] leading-tight whitespace-nowrap">
                        {pt.label}
                      </span>
                    </div>
                  </div>
                );
              })}

              {/* Frame Footer Datum HUD */}
              <div className="absolute bottom-3 left-3 right-3 flex justify-between items-center text-[9px] font-mono text-[var(--taupe)] pointer-events-none z-20">
                <span className="flex items-center gap-1">
                  <RotateCw size={10} className="text-[var(--crimson)]" />
                  Perspective: {activeService.cameraAngle}
                </span>
                <span className="text-[var(--crimson-dark)] font-bold">
                  Interactive 3D Active
                </span>
              </div>
            </div>

            {/* Anatomical Labels Card on Right Side */}
            <div className="w-full max-w-[340px] sm:max-w-[380px] mt-2 px-3 py-2 rounded-xl bg-[#fffaf2] border border-[#ead8c3] shadow-xs">
              <div className="text-[10px] font-mono uppercase tracking-wider text-[var(--taupe)] mb-1.5 flex items-center justify-between">
                <span className="flex items-center gap-1.5">
                  <Target size={11} className="text-[var(--crimson)]" />
                  <span>Targeted Point Labels</span>
                </span>
                <span className="text-[var(--crimson-dark)] font-bold text-[9px]">{highlight.points.length} Active Nodes</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {highlight.points.map((pt, idx) => (
                  <div
                    key={idx}
                    className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-[#fff5e8] border border-[#ead8c3] text-[10px] font-mono text-[var(--ink)] font-semibold shadow-2xs"
                  >
                    <span className="w-3.5 h-3.5 rounded-full bg-[var(--crimson)] text-[#fffaf2] text-[8px] flex items-center justify-center font-bold">
                      {idx + 1}
                    </span>
                    <span className="truncate">{pt.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom Compact Rotation Status Bar */}
            <div className="w-full max-w-[340px] sm:max-w-[380px] mt-1.5 px-3 py-1.5 rounded-xl bg-[#fffaf2] border border-[#ead8c3] flex items-center justify-between text-[11px] font-mono text-[var(--ink)]/80">
              <span className="flex items-center gap-1.5 truncate">
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--crimson)] shrink-0" />
                <span className="truncate">
                  3D Muscular Model • Scroll to spin 2 rounds (720°)
                </span>
              </span>
              <span className="text-[var(--crimson)] font-bold shrink-0 ml-2">
                {Math.round(orthoProgress * 720)}°
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

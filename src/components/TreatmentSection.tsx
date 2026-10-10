import React from 'react';

export default function TreatmentSection() {
  const clinicalIndicators = [
    {
      title: 'MOBILITY',
      desc: 'Restoring arthrokinematic glide and unrestricted joint excursion.',
    },
    {
      title: 'STRENGTH',
      desc: 'Rebuilding muscular torque and force-generating capacity.',
    },
    {
      title: 'BALANCE',
      desc: 'Recalibrating vestibular and somatosensory postural reflexes.',
    },
    {
      title: 'CONTROL',
      desc: 'Fine-tuning neuromuscular recruitment and movement precision.',
    },
    {
      title: 'RECOVERY',
      desc: 'Progressive tissue remodeling and sustainable return to activity.',
    }
  ];

  return (
    <section
      id="what-we-treat"
      className="min-h-screen lg:h-screen lg:max-h-[920px] py-4 sm:py-6 lg:py-5 px-4 sm:px-8 lg:px-12 bg-[#fbeddc]/40 border-y border-[#ead8c3] relative flex flex-col justify-between overflow-hidden"
      aria-label="What We Treat and Clinical Philosophy"
    >
      <div className="max-w-7xl mx-auto w-full h-full flex flex-col justify-between my-auto">
        {/* Compact Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 pb-2.5 border-b border-[#ead8c3]/70">
          <div>
            <div className="inline-flex items-center gap-2 mb-0.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--crimson)]" />
              <span className="text-[10px] uppercase tracking-[0.25em] font-mono text-[var(--crimson-dark)] font-semibold">
                Clinical Philosophy
              </span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl lg:text-3xl font-normal text-[var(--ink)] leading-tight">
              Your body <span className="italic text-[var(--crimson)]">is the story.</span>
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-[var(--ink)]/80 font-sans max-w-md leading-relaxed hidden sm:block">
            We don&apos;t treat symptoms in isolation. We look at how your body moves, where it compensates, and what needs to change to get you moving confidently again.
          </p>
        </div>

        {/* Central Display Card - Screen-fitted */}
        <div
          id="treatment-card"
          className="relative rounded-3xl bg-[#fffaf2]/90 backdrop-blur-sm border border-[#ead8c3] p-4 sm:p-5 lg:p-6 shadow-[0_4px_30px_rgba(36,25,27,0.03)] grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-8 items-center my-auto"
        >
          {/* Left Column: Designated 3D Anatomical Spotlight Stage */}
          <div id="treatment-stage" className="lg:col-span-5 relative flex justify-center items-center min-h-[380px] lg:min-h-[420px]">
            {/* Soft clinical halo backdrop framing the 3D model */}
            <div className="absolute inset-4 rounded-full bg-[#fbeddc] filter blur-3xl opacity-80 pointer-events-none" />

            {/* Stage frame bounds */}
            <div className="relative w-full max-w-[320px] sm:max-w-[340px] aspect-[3/4] rounded-3xl bg-[#fff5e8]/80 border border-[#ead8c3] flex flex-col justify-between p-4 shadow-xs pointer-events-none">
              {/* Top datum marker */}
              <div className="flex justify-between items-center text-[10px] font-mono text-[var(--crimson-dark)]">
                <span className="px-2.5 py-1 rounded-full bg-[#fffaf2] border border-[#ead8c3] shadow-xs flex items-center gap-1.5 font-bold">
                  <span className="w-1.5 h-1.5 rounded-full bg-[var(--crimson)] animate-warm-pulse" />
                  3D LIVE KINEMATICS
                </span>
                <span className="text-[var(--taupe)] font-medium">Sagittal / Frontal</span>
              </div>

              {/* Center target indicator guides */}
              <div className="space-y-20 my-auto">
                <div className="flex items-center gap-1.5 bg-[#fffaf2]/95 border border-[#ead8c3] px-2.5 py-1 rounded-full shadow-xs text-[10px] font-mono text-[var(--ink)]/80 w-fit">
                  <span className="w-1.5 h-1.5 rounded-full bg-[var(--crimson)]" />
                  <span>Pelvic Alignment & Core</span>
                </div>
                <div className="flex items-center gap-1.5 bg-[#fffaf2]/95 border border-[#ead8c3] px-2.5 py-1 rounded-full shadow-xs text-[10px] font-mono text-[var(--ink)]/80 w-fit ml-auto">
                  <span className="w-1.5 h-1.5 rounded-full bg-[var(--crimson)]" />
                  <span>Patellofemoral Excursion</span>
                </div>
              </div>

              {/* Bottom stage badge */}
              <div className="text-center text-[10px] font-mono text-[var(--taupe)] bg-[#fffaf2]/90 py-1.5 px-3 rounded-full border border-[#ead8c3] mx-auto shadow-xs flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                <span>Compound Squat & Kinetic Chain Dynamics</span>
              </div>
            </div>
          </div>

          {/* Right Column: Clinical Indicators Grid - Balanced 2x3 Grid */}
          <div className="lg:col-span-7 relative z-40 flex flex-col justify-center space-y-3.5">
            <div className="flex items-center justify-between pb-1.5 border-b border-[#ead8c3]">
              <span className="text-[11px] font-mono uppercase tracking-widest text-[var(--taupe)] font-semibold">
                Foundational Movement Pillars
              </span>
              <span className="text-[10px] font-mono text-[var(--crimson)] font-bold">
                5 Kinetic Tiers
              </span>
            </div>

            {/* 6 Balanced Modular Cards (5 Pillars + 1 Integrative Summary) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {clinicalIndicators.map((ind, i) => (
                <div
                  key={ind.title}
                  className="p-3 sm:p-3.5 rounded-2xl bg-[#fff5e8] border border-[#ead8c3] hover:border-[var(--rose)] transition-colors flex flex-col justify-between"
                >
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[11px] font-mono text-[var(--crimson)] font-bold">
                      0{i + 1}
                    </span>
                    <span className="w-1.5 h-1.5 rounded-full bg-[var(--crimson)]" />
                    <h3 className="font-mono text-xs font-bold tracking-wider text-[var(--ink)]">
                      {ind.title}
                    </h3>
                  </div>
                  <p className="text-[11px] text-[var(--ink)]/75 leading-relaxed font-sans">
                    {ind.desc}
                  </p>
                </div>
              ))}

              {/* 6th Slot: Integrative Kinematic Assessment */}
              <div className="p-3 sm:p-3.5 rounded-2xl bg-[#fbeddc] border border-[#ead8c3] flex flex-col justify-between">
                <div className="flex items-center justify-between text-[10px] font-mono uppercase text-[var(--taupe)] font-semibold mb-1">
                  <span>Clinical Assessment</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse" />
                </div>
                <div className="text-xs font-mono font-bold text-[var(--crimson-dark)] leading-tight">
                  Integrative Whole-Body Kinetic Excursion
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

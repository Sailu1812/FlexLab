import React from 'react';
import { UserCheck, Activity, HeartHandshake, Quote } from 'lucide-react';

export default function ProofSection() {
  const pillars = [
    {
      number: '01',
      title: 'Personalized care',
      subtitle: 'Tailored kinematic protocols',
      description:
        'Every body carries a unique injury history and movement profile. Your evaluation dictates an individual progression plan—never generic routine exercise printouts.',
      icon: UserCheck
    },
    {
      number: '02',
      title: 'Movement-focused treatment',
      subtitle: 'Active functional restoration',
      description:
        'We prioritize restoring dynamic mechanical efficiency and joint confidence so you regain long-term resilience rather than temporary passive symptom relief.',
      icon: Activity
    },
    {
      number: '03',
      title: 'One-on-one attention',
      subtitle: 'Dedicated clinician time',
      description:
        'Your sessions are spent directly with your licensed physical therapist. We evaluate, treat, and adjust each rep in real time without passing you off to aides.',
      icon: HeartHandshake
    }
  ];

  return (
    <section
      id="proof"
      className="py-28 px-6 sm:px-10 lg:px-16 bg-[var(--cream)] border-b border-[#ead8c3] relative"
      aria-label="Clinical Standards and Verified Practice"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 mb-4">
            <span className="w-2 h-2 rounded-full bg-[var(--crimson)]" />
            <span className="text-xs uppercase tracking-[0.25em] font-mono text-[var(--crimson-dark)] font-semibold">
              Clinical Integrity
            </span>
          </div>
          <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl font-normal text-[var(--ink)] leading-tight mb-4">
            Movement is measurable. <br />
            <span className="italic text-[var(--crimson)]">Progress is personal.</span>
          </h2>
          <p className="text-base sm:text-lg text-[var(--ink)]/80 font-sans leading-relaxed">
            Our treatment methodology is built around precision metrics and dedicated clinician attention at every phase of your recovery.
          </p>
        </div>

        {/* 3 Large Pillars Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {pillars.map((p) => {
            const IconComponent = p.icon;
            return (
              <div
                key={p.number}
                className="clinical-card rounded-3xl p-8 sm:p-10 flex flex-col justify-between hover:border-[var(--rose)] transition-all duration-300"
              >
                <div>
                  <div className="flex items-center justify-between pb-6 mb-6 border-b border-[#ead8c3]">
                    <span className="font-serif text-3xl font-bold text-[var(--crimson)]">
                      {p.number}
                    </span>
                    <div className="p-2 rounded-xl bg-[#fbeddc] border border-[#ead8c3]">
                      <IconComponent size={18} className="text-[var(--crimson-dark)]" />
                    </div>
                  </div>

                  <h3 className="font-serif text-2xl font-bold text-[var(--ink)] mb-2">
                    {p.title}
                  </h3>
                  <div className="text-xs font-mono text-[var(--crimson-dark)] mb-4">
                    {p.subtitle}
                  </div>
                  <p className="text-sm text-[var(--ink)]/80 leading-relaxed font-sans">
                    {p.description}
                  </p>
                </div>

                <div className="pt-6 mt-8 border-t border-[#ead8c3]/60 text-[10px] font-mono tracking-wider uppercase text-[var(--taupe)]">
                  FlexLab Patient Standard
                </div>
              </div>
            );
          })}
        </div>

        {/* Patient Testimonial Authentic Placeholder Container (Strictly adherence to Section 18 & 35) */}
        <div className="rounded-3xl bg-[#fbeddc]/60 border border-[#ead8c3] p-8 sm:p-10 relative overflow-hidden">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 text-xs font-mono text-[var(--taupe)] uppercase tracking-wider mb-4">
              <Quote size={16} className="text-[var(--crimson)]" />
              <span>Verified Patient Review Section</span>
            </div>

            <div className="p-6 rounded-2xl bg-[#fffaf2] border border-[#ead8c3] border-dashed">
              <p className="font-mono text-xs sm:text-sm text-[var(--ink)]/70 italic leading-relaxed mb-4">
                &ldquo;[Patient testimonial goes here. FlexLab policies require verified, HIPAA-compliant patient feedback prior to publication.]&rdquo;
              </p>
              <div className="flex items-center justify-between text-[11px] font-mono text-[var(--taupe)] pt-2 border-t border-[#ead8c3]/60">
                <span>[Verified Patient Name, Post-Surgical Rehab]</span>
                <span className="text-[var(--crimson-dark)] font-semibold">AUTHENTIC PATIENT RECORD</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

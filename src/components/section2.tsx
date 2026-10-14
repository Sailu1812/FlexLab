'use client';

import React, { useState, useEffect, useRef } from 'react';
import { registerGsapPlugins, gsap, isPrefersReducedMotion } from '@/lib/animation';
import { Layers, Activity, Bone, Sparkles, ChevronRight } from 'lucide-react';

const Section2 = () => {
  const [activeCard, setActiveCard] = useState<number>(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const leftContentRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  const anatomicalLayers = [
    {
      id: '01',
      tag: '01 SKELETON',
      title: 'Osteological Matrix',
      desc: '206 articulated bones providing load distribution, rotational axes, and structural levers.',
      stat: '206 Bones Articulated',
      icon: Bone,
    },
    {
      id: '02',
      tag: '02 MUSCULATURE',
      title: 'Myofascial Engines',
      desc: 'Primary kinetic drivers and stabilizers layered to illustrate muscle firing lines and strain vectors.',
      stat: '640+ Muscle Segments',
      icon: Layers,
    },
    {
      id: '03',
      tag: '03 JOINTS',
      title: 'Arthrokinematic Axes',
      desc: 'Synovial gliding, translation, and rotational degrees of freedom tracked with clinical precision.',
      stat: '360° Kinematic Capture',
      icon: Activity,
    },
  ];

  useEffect(() => {
    registerGsapPlugins();
    if (isPrefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      // Entrance animation triggered when scrolling into Section 2
      gsap.fromTo(
        leftContentRef.current,
        { opacity: 0, x: -40 },
        {
          opacity: 1,
          x: 0,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 75%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      const cards = cardsRef.current?.children ? Array.from(cardsRef.current.children) : [];
      gsap.fromTo(
        cards,
        { opacity: 0, x: 40, scale: 0.96 },
        {
          opacity: 1,
          x: 0,
          scale: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 75%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      id="section2"
      ref={containerRef}
      className="w-full h-screen relative overflow-hidden text-[#24191b] flex items-center justify-between px-6 sm:px-12 md:px-16 lg:px-20 pointer-events-none bg-transparent"
    >
      {/* Left Side: Title and Description - Layered on z-40 so 3D model never overlaps */}
      <div ref={leftContentRef} className="max-w-xl relative z-40 pointer-events-auto pr-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#fffaf2]/80 border border-[#ead8c3] backdrop-blur-md mb-4">
          <span className="w-1.5 h-1.5 rounded-full bg-[var(--crimson)]" />
          <span className="text-xs uppercase tracking-widest text-[#a0142f] font-mono font-semibold">
            01 — ANATOMY ENGINE
          </span>
        </div>

        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-normal tracking-tight leading-[1.08] mb-6 text-[#5d1024]">
          See the body <br />
          the way <br />
          <span className="italic text-[var(--crimson)]">clinicians do.</span>
        </h2>

        <p className="text-[#24191b]/85 text-base sm:text-lg font-normal leading-relaxed max-w-lg mb-8">
          A layered, articulated digital twin of the human musculoskeletal system. Bones, force vectors, and deep fascial layers rendered in real time—so every diagnostic insight has a precise visual reference.
        </p>

        {/* Live System Telemetry Strip */}
        <div className="flex items-center gap-4 text-xs font-mono text-[#a0142f] bg-[#fffaf2]/90 border border-[#ead8c3] px-4 py-2.5 rounded-2xl w-fit shadow-xs backdrop-blur-md">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>Active Dual Layer: Musculoskeletal & Kinematic Rig</span>
        </div>
      </div>

      {/* Right Side: Interactive Anatomical Layers Stack */}
      <div
        ref={cardsRef}
        className="flex flex-col gap-3.5 w-80 lg:w-96 relative z-40 pointer-events-auto"
      >
        {anatomicalLayers.map((layer, idx) => {
          const isActive = activeCard === idx;
          const IconComponent = layer.icon;

          return (
            <div
              key={layer.id}
              onClick={() => setActiveCard(idx)}
              className={`cursor-pointer rounded-2xl p-4 sm:p-5 transition-all duration-300 backdrop-blur-md border ${
                isActive
                  ? 'bg-[#fbeddc]/95 border-[#a0142f] shadow-[0_12px_32px_rgba(160,20,47,0.12)] scale-[1.02]'
                  : 'bg-[#fffaf2]/85 border-[#ead8c3] hover:border-[#a0142f]/40 hover:bg-[#fffaf2]'
              }`}
            >
              <div className="flex items-center justify-between text-xs font-mono mb-2">
                <span className={`font-semibold flex items-center gap-1.5 ${isActive ? 'text-[#a0142f]' : 'text-[#b99378]'}`}>
                  <IconComponent size={14} className={isActive ? 'text-[#a0142f]' : 'text-[#b99378]'} />
                  {layer.tag}
                </span>
                {isActive ? (
                  <span className="w-2 h-2 rounded-full bg-[#a0142f] animate-pulse" />
                ) : (
                  <span className="text-[10px] text-[#b99378]">Click to inspect</span>
                )}
              </div>

              <h3 className="text-base font-medium text-[#5d1024] mb-1 font-serif">
                {layer.title}
              </h3>

              <p className="text-xs text-[#24191b]/80 leading-relaxed mb-3">
                {layer.desc}
              </p>

              <div className="flex items-center justify-between text-[11px] font-mono pt-2 border-t border-[#ead8c3]/60 text-[#a0142f]">
                <span>{layer.stat}</span>
                <ChevronRight size={13} className={`transition-transform ${isActive ? 'translate-x-1 text-[#a0142f]' : 'text-[#b99378]'}`} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Section2;
'use client';

import React from 'react';

interface ClinicalReadoutProps {
  region?: string;
  movement?: string;
  angle?: number;
  effort?: number;
  metricLabel?: string;
  side?: string;
  className?: string;
}

export default function ClinicalReadout({
  region = 'LEFT KNEE',
  movement = 'Flexion Angle',
  angle = 83,
  effort = 83,
  metricLabel = 'ACTIVE QUADRICEPS RECRUITMENT',
  side = 'Sagittal Plane View',
  className = ''
}: ClinicalReadoutProps) {
  return (
    <div
      className={`clinical-panel rounded-2xl p-6 shadow-[0_8px_30px_rgba(36,25,27,0.06)] border border-[#ead8c3] max-w-xs transition-all duration-300 ${className}`}
      role="region"
      aria-label="Clinical Joint Measurement Readout"
    >
      {/* Header */}
      <div className="flex items-center justify-between pb-3 mb-3 border-b border-[#ead8c3]/80">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[var(--crimson)] animate-warm-pulse" />
          <span className="text-xs font-mono font-bold tracking-widest text-[var(--crimson-dark)]">
            {region}
          </span>
        </div>
        <span className="text-[10px] font-mono uppercase text-[var(--taupe)] tracking-wider">
          {side}
        </span>
      </div>

      {/* Primary Angle Metric */}
      <div className="mb-4">
        <div className="text-[11px] font-mono uppercase tracking-wider text-[var(--ink)]/60 mb-1">
          {movement}
        </div>
        <div className="flex items-baseline gap-1">
          <span className="font-serif text-5xl font-bold tracking-tight text-[var(--ink)] tabular-nums">
            {Math.round(angle)}
          </span>
          <span className="text-2xl font-serif text-[var(--crimson)]">°</span>
        </div>
      </div>

      {/* Progress / Effort Bar */}
      <div className="space-y-1.5 pt-2 border-t border-[#ead8c3]/60">
        <div className="flex justify-between items-center text-[10px] font-mono tracking-wider">
          <span className="text-[var(--ink)]/70 uppercase">Effort Index</span>
          <span className="text-[var(--crimson-dark)] font-bold tabular-nums">
            {Math.round(effort)}%
          </span>
        </div>
        <div className="w-full h-1.5 bg-[#ead8c3]/50 rounded-full overflow-hidden">
          <div
            className="h-full bg-[var(--crimson)] rounded-full transition-all duration-300 ease-out"
            style={{ width: `${Math.min(100, Math.max(0, effort))}%` }}
          />
        </div>
      </div>

      {/* Footer label */}
      <div className="mt-3 pt-2 text-[9px] font-mono tracking-widest uppercase text-[var(--taupe)] flex items-center justify-between">
        <span>{metricLabel}</span>
        <span className="text-[var(--crimson)] font-semibold">CALIBRATED</span>
      </div>
    </div>
  );
}

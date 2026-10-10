import React from 'react';
import { CreditCard, Check } from 'lucide-react';
import { BookingTriggerButton } from './BookingContext';

interface InsuranceSectionProps {
  onOpenBooking?: () => void;
}

export default function InsuranceSection({ onOpenBooking }: InsuranceSectionProps) {
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

  return (
    <section
      id="insurance"
      className="py-28 px-6 sm:px-10 lg:px-16 bg-[#fbeddc]/50 border-b border-[#ead8c3] relative"
      aria-label="Insurance and Payment Information"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 mb-4">
            <span className="w-2 h-2 rounded-full bg-[var(--crimson)]" />
            <span className="text-xs uppercase tracking-[0.25em] font-mono text-[var(--crimson-dark)] font-semibold">
              Coverage & Transparency
            </span>
          </div>
          <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl font-normal text-[var(--ink)] leading-tight mb-4">
            Insurance & Payment
          </h2>
          <p className="text-lg text-[var(--ink)]/80 font-sans leading-relaxed">
            We keep payment straightforward.
          </p>
          <p className="text-sm text-[var(--taupe)] font-mono mt-2">
            Coverage is verified prior to your first appointment so there are no unexpected bills.
          </p>
        </div>

        {/* 4 Groupings in Clear Editorial Typography (Strictly NO LOGOS per Section 19) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {insuranceGroups.map((group) => (
            <div
              key={group.category}
              className="clinical-card rounded-3xl p-8 sm:p-10 flex flex-col justify-between"
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

              <div className="pt-6 mt-6 border-t border-[#ead8c3]/60 text-[10px] font-mono text-[var(--taupe)] uppercase tracking-wider">
                Direct In-Network Processing
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Verification Note & Action */}
        <div className="p-6 sm:p-8 rounded-3xl bg-[#fffaf2] border border-[#ead8c3] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div>
            <h4 className="font-serif text-lg font-bold text-[var(--ink)] mb-1">
              Have questions about your specific deductible or copay?
            </h4>
            <p className="text-xs sm:text-sm text-[var(--ink)]/75 font-sans">
              Our administrative staff verifies your out-of-pocket benefits directly with your insurer before your initial evaluation.
            </p>
          </div>
          <BookingTriggerButton className="px-6 py-3 rounded-full bg-[var(--crimson)] text-[#fffaf2] text-xs font-semibold hover:bg-[var(--crimson-dark)] transition-colors whitespace-nowrap cursor-pointer shrink-0">
            Verify Benefits & Book
          </BookingTriggerButton>
        </div>
      </div>
    </section>
  );
}

import React from 'react';
import { Repeat, Lock, Eye, FileSearch, TriangleAlert, Zap } from 'lucide-react';

const risks = [
  { icon: Repeat, title: 'Hidden auto-renewals', desc: 'Detect evergreen clauses & 90-day notice windows.' },
  { icon: Lock, title: 'Liability caps', desc: 'Flag unlimited indemnity & one-sided risk transfer.' },
  { icon: Eye, title: 'Non-compete traps', desc: 'Surface scope, geography & duration restrictions.' },
  { icon: FileSearch, title: 'IP assignment', desc: 'Identify work-for-hire & background IP clauses.' },
  { icon: TriangleAlert, title: 'Termination penalties', desc: 'Spot kill fees, claw-backs & exit barriers.' },
  { icon: Zap, title: 'Payment ambiguity', desc: 'Net-90 schedules, late-fee gaps, scope creep.' },
];

export default function Features() {
  return (
    <section id="features" className="relative mx-auto max-w-7xl px-6 py-24">
      <div className="mb-14 text-center">
        <div className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-pink-500">What it catches</div>
        <h2 className="text-4xl font-bold tracking-tight sm:text-5xl text-white">
          Risks that hide in <span className="bg-gradient-to-r from-cyan-400 via-pink-500 to-amber-400 bg-clip-text text-transparent">plain sight</span>
        </h2>
      </div>

      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {risks.map((risk, idx) => (
          <div key={idx} className="group relative h-full rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.04] to-transparent p-6 transition hover:border-white/20">
            <risk.icon className="h-6 w-6 text-cyan-400 transition group-hover:text-pink-500" />
            <h3 className="mt-4 font-semibold text-white">{risk.title}</h3>
            <p className="mt-1.5 text-sm text-gray-400">{risk.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
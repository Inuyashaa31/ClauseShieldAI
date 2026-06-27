import React from 'react';
import { Briefcase, Users, Building2 } from 'lucide-react';

const audiences = [
  {
    icon: Briefcase,
    gradient: 'from-purple-600 to-pink-500',
    title: 'Freelancers',
    desc: 'Skim every SOW before you sign. Catch silent auto-renewals that lock you in.',
  },
  {
    icon: Users,
    gradient: 'from-pink-500 to-amber-500',
    title: 'Small Agencies',
    desc: 'Review client MSAs at scale. Negotiate liability caps with data, not vibes.',
  },
  {
    icon: Building2,
    gradient: 'from-cyan-500 to-purple-600',
    title: 'Consultants',
    desc: 'Surface non-compete traps & IP assignment clauses in seconds.',
  },
];

export default function TargetAudience() {
  return (
    <section id="who" className="relative mx-auto max-w-7xl px-6 py-24">
      <div className="mb-14 text-center">
        <div className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-cyan-400">Built for</div>
        <h2 className="text-4xl font-bold tracking-tight sm:text-5xl text-white">
          Freelancers, agencies &amp; <br className="hidden sm:block" />
          <span className="bg-gradient-to-r from-cyan-400 via-pink-500 to-amber-400 bg-clip-text text-transparent">
            independent consultants
          </span>
        </h2>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {audiences.map((aud, idx) => (
          <div key={idx} className="group relative h-full overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] p-8 backdrop-blur-xl transition hover:border-white/20">
            <div className={`absolute -right-12 -top-12 h-40 w-40 rounded-full bg-gradient-to-br ${aud.gradient} opacity-20 blur-2xl transition group-hover:opacity-40`}></div>
            <div className={`relative mb-5 inline-grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br ${aud.gradient} shadow-lg text-white`}>
              <aud.icon className="h-6 w-6" />
            </div>
            <h3 className="relative text-xl font-semibold text-white">{aud.title}</h3>
            <p className="relative mt-2 text-sm text-gray-400">{aud.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
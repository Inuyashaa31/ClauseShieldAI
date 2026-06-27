import React from 'react';

const steps = [
  { num: '01', title: 'Upload PDF', desc: 'Drop your freelance or business contract. We extract clean text.' },
  { num: '02', title: 'AI scan', desc: 'Gemini parses clauses against a schema-constrained risk taxonomy.' },
  { num: '03', title: 'Risk report', desc: 'Colour-coded JSON: severity, location, suggested redlines.' },
];

export default function HowItWorks() {
  return (
    <section id="how" className="relative mx-auto max-w-7xl px-6 py-24">
      <h2 className="mb-14 text-center text-4xl font-bold tracking-tight sm:text-5xl text-white">
        Three steps. <span className="bg-gradient-to-r from-cyan-400 via-pink-500 to-amber-400 bg-clip-text text-transparent">Zero legalese.</span>
      </h2>

      <div className="grid gap-6 md:grid-cols-3">
        {steps.map((step, idx) => (
          <div key={idx} className="relative rounded-3xl border border-white/10 bg-white/[0.03] p-8 backdrop-blur-xl">
            <div className="text-6xl font-bold bg-gradient-to-r from-cyan-400 via-pink-500 to-amber-400 bg-clip-text text-transparent opacity-90 font-sans">
              {step.num}
            </div>
            <h3 className="mt-4 text-xl font-semibold text-white">{step.title}</h3>
            <p className="mt-2 text-sm text-gray-400">{step.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
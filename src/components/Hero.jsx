import React from 'react';
import { Sparkles, ArrowRight, TriangleAlert, Lock, Eye } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative mx-auto max-w-7xl px-6 pt-16 pb-32 sm:pt-24 text-center">
      <div className="mx-auto mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs text-gray-400 backdrop-blur">
        <Sparkles className="h-3.5 w-3.5 text-amber-400" />
        Powered by Gemini 2.5 · Schema-constrained risk JSON
      </div>

      <h1 className="mx-auto max-w-5xl text-5xl font-bold leading-[1.05] tracking-tight sm:text-7xl md:text-8xl text-white">
        AI Contract <br />
        <span className="bg-gradient-to-r from-cyan-400 via-pink-500 to-amber-400 bg-clip-text text-transparent">
          Risk Scanner
        </span>
      </h1>

      <p className="mx-auto mt-8 max-w-2xl text-lg text-gray-400 sm:text-xl">
        Identify hidden{' '}
        <span className="text-pink-500 font-medium">auto-renewals</span>,{' '}
        <span className="text-cyan-400 font-medium">liability caps</span>, and{' '}
        <span className="text-amber-400 font-medium">non-compete clauses</span> — without expensive legal fees.
      </p>

      <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
        <a href="#scan" className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-gradient-to-r from-purple-600 via-pink-500 to-amber-500 px-7 py-3.5 text-sm font-semibold text-white transition hover:scale-[1.03]">
          Scan a contract free
          <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
        </a>
        <a href="#how" className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-7 py-3.5 text-sm font-semibold text-white backdrop-blur transition hover:bg-white/10">
          See how it works
        </a>
      </div>

      {/* Visual Interactive Dashboard Preview */}
      <div className="relative mx-auto mt-20 max-w-4xl">
        <div className="absolute -inset-4 rounded-3xl bg-gradient-to-r from-purple-600 via-pink-500 to-cyan-400 opacity-30 blur-2xl"></div>
        <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-black/40 p-8 backdrop-blur-xl shadow-2xl">
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <div className="flex items-center gap-2">
              <div className="h-2.5 w-2.5 rounded-full bg-red-500/70"></div>
              <div className="h-2.5 w-2.5 rounded-full bg-yellow-500/70"></div>
              <div className="h-2.5 w-2.5 rounded-full bg-green-500/70"></div>
            </div>
            <span className="font-mono text-xs text-gray-500">contract_v3.pdf</span>
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-3 text-left">
            {/* Box 1 */}
            <div className="rounded-2xl border border-white/10 bg-black/30 p-5">
              <TriangleAlert className="h-5 w-5 text-pink-500" />
              <div className="mt-3 text-sm text-gray-400">Auto-renewal</div>
              <div className="mt-1 font-mono text-xs font-semibold text-white">HIGH RISK</div>
              <div className="mt-3 h-1 w-full bg-white/5 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-pink-500 to-amber-500" style={{ width: '85%' }}></div>
              </div>
            </div>
            {/* Box 2 */}
            <div className="rounded-2xl border border-white/10 bg-black/30 p-5">
              <Lock className="h-5 w-5 text-amber-400" />
              <div className="mt-3 text-sm text-gray-400">Liability cap</div>
              <div className="mt-1 font-mono text-xs font-semibold text-white">MED RISK</div>
              <div className="mt-3 h-1 w-full bg-white/5 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-cyan-400 to-purple-500" style={{ width: '55%' }}></div>
              </div>
            </div>
            {/* Box 3 */}
            <div className="rounded-2xl border border-white/10 bg-black/30 p-5">
              <Eye className="h-5 w-5 text-cyan-400" />
              <div className="mt-3 text-sm text-gray-400">Non-compete</div>
              <div className="mt-1 font-mono text-xs font-semibold text-white">HIGH RISK</div>
              <div className="mt-3 h-1 w-full bg-white/5 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-pink-500 to-amber-500" style={{ width: '85%' }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
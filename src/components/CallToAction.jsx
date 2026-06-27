import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom'; // 1. Import Link for internal routing

// 2. Accept the username prop right here
export default function CallToAction({ username = "" }) {
  return (
    <section id="scan" className="relative mx-auto max-w-5xl px-6 py-24">
      <div className="relative overflow-hidden rounded-[2rem] border border-white/10 p-12 text-center sm:p-16">
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-purple-900/30 via-pink-900/20 to-cyan-900/30"></div>
        <div className="absolute -top-24 left-1/2 -z-10 h-64 w-64 -translate-x-1/2 rounded-full bg-pink-500/20 blur-3xl"></div>
        
        <h2 className="text-4xl font-bold tracking-tight sm:text-5xl text-white">
          Stop signing <span className="bg-gradient-to-r from-cyan-400 via-pink-500 to-amber-400 bg-clip-text text-transparent">blind.</span>
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-gray-400">Scan your first contract free. No card. No lawyer. Just clarity.</p>
        
        {/* 3. Conditional Link: Point to /workspace if logged in, otherwise go to /login */}
        <Link 
          to={username ? "/workspace" : "/login"} 
          className="mt-8 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-purple-600 via-pink-500 to-amber-500 px-8 py-4 text-sm font-semibold text-white transition hover:scale-[1.03]"
        >
          {username ? "Go to Workspace" : "Launch ClauseShield"}
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </section>
  );
}
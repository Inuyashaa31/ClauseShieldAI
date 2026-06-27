import React from 'react';
import { Link, useLocation } from 'react-router-dom';
export default function LoginWelcomePanel() {
  const location = useLocation();
  return (
    <div className="relative flex h-full flex-col justify-between p-10 lg:p-14 overflow-hidden">
      {/* Aurora mesh background layer nested locally */}
      <div className="absolute inset-0 -z-10 bg-[#0d0e12]">
        <div className="absolute -inset-[10px] bg-gradient-to-tr from-purple-900/40 via-pink-600/20 to-cyan-500/30 opacity-70 blur-3xl"></div>
        {/* Dynamic sweeping wave effect to mimic image gradient paths */}
        <div className="absolute top-[-20%] right-[-10%] h-[140%] w-[80%] rounded-full bg-gradient-to-b from-amber-500/10 via-pink-500/10 to-transparent blur-[100px] transform rotate-12"></div>
      </div>

      {/* Sub-navigation inside panel */}
      <nav className="flex items-center justify-end gap-6 text-xs font-medium text-gray-300/80">
        <a href="#" className="hover:text-white transition">ABOUT</a>
        <a href="#" className="hover:text-white transition">PRICING</a>
        <button className="rounded-full bg-white/10 px-4 py-1.5 border border-white/10 backdrop-blur-md text-white transition hover:bg-white/20">
          SIGN IN
        </button>
      </nav>

      {/* Branding Splash text */}
      <div className="max-w-md text-left pb-6">
        <h2 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
          Welcome.
        </h2>
        <p className="mt-3 text-xs leading-relaxed text-gray-400">
          Access automated risk validation powered by schema-constrained execution taxonomies. Run deep-scan contract structures seamlessly without friction.
        </p>
        {location.pathname !== '/signup' && (
        <div className="mt-6 text-xs text-gray-400">
          Not a member?{' '}
          <a href="/signup" className="font-semibold text-cyan-400 hover:underline">
            Sign up now
          </a>
        </div>
        )}
      </div>
    </div>
  );
}
import React from 'react';
import SignUpForm from '../components/SignUpForm';
import LoginWelcomePanel from '../components/login/LoginWelcomePanel';

export default function SignUpLayout() {
  return (
    <div className="relative flex min-h-screen items-center justify-center bg-[#07080a] p-4 sm:p-6 lg:p-8">
      {/* Background Matrix Grid Overlay */}
      <div 
        className="pointer-events-none fixed inset-0 opacity-[0.03]" 
        style={{
          backgroundImage: `linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
        }}
      ></div>

      {/* Main Container Card Split frame */}
      <div className="relative grid w-full max-w-5xl overflow-hidden rounded-3xl border border-white/10 shadow-2xl md:grid-cols-5 min-h-[580px]">
        {/* Registration form inputs column control */}
        <div className="md:col-span-2">
          <SignUpForm />
        </div>

        {/* Brand Splash visual wave artwork gradient background side panel */}
        <div className="hidden md:block md:col-span-3">
          <LoginWelcomePanel />
        </div>
      </div>
    </div>
  );
}
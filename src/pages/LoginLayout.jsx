import React from 'react';
import LoginForm from '../components/login/LoginForm';
import LoginWelcomePanel from '../components/login/LoginWelcomePanel';
import CursorBlob from '../components/CursorBlob';

function LoginLayout() {
  return (
    <div className="relative flex min-h-screen items-center justify-center bg-[#07080a] p-4 sm:p-6 lg:p-8">
      {/* Background grids matching standard workspace theme */}
      <div 
        className="pointer-events-none fixed inset-0 opacity-[0.03]" 
        style={{
          backgroundImage: `linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
        }}
      ></div>

      {/* Double Split-Panel Card Frame */}
      <div className="relative grid w-full max-w-5xl overflow-hidden rounded-3xl border border-white/10 shadow-2xl md:grid-cols-5 min-h-[580px]">
        {/* Left Side Controller Panel (2/5 size ratio) */}
        <div className="md:col-span-2">
          <LoginForm />
        </div>

        {/* Right Side Visual Banner Panel (3/5 size ratio) */}
        <div className="hidden md:block md:col-span-3">
          <LoginWelcomePanel />
        </div>
      </div>
      <CursorBlob/>
    </div>
  );
}

export default LoginLayout
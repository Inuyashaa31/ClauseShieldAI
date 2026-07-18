import React from 'react';
import { ShieldCheck } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="relative border-t border-white/5 bg-black/20">
      <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-4 px-6 py-10 sm:flex-row sm:items-center">
        <div className="flex items-center gap-2 text-sm text-gray-400">
          <ShieldCheck className="h-4 w-4 text-purple-500" />
          ClauseShield AI · Demonstration project · Not legal advice
          <p>
            <div>
              &copy; {new Date().getFullYear()} <span className="text-white hover:text-indigo-400 transition-colors duration-200 cursor-pointer">Mohit Rathod</span> Productions. All rights reserved.
            </div>
          </p>
        </div>
        <div className="flex gap-6 text-sm text-gray-400">
          <a href="#" className="hover:text-white transition">Security</a>
          <a href="#" className="hover:text-white transition">No-Training</a>
          <a href="#" className="hover:text-white transition">Docs</a>
        </div>
      </div>
    </footer>
  );
}
import React from 'react';
import { ShieldCheck, Coins, LogOut, User } from 'lucide-react'; 
import { Link, useNavigate } from 'react-router-dom';     
import { auth } from '../firebase';                        
import { signOut } from 'firebase/auth';

// Added username parameter prop with a default empty string configuration
export default function Header({ isWorkspace = false, credits = 0, onRefillClick, username = "" }) {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/'); // Securely bounce them out to the landing page
    } catch (error) {
      console.error("Error signing out: ", error);
    }
  };

  return (
    <header className="relative z-20 mx-auto flex max-w-7xl w-full items-center justify-between px-6 py-6">
      {/* Brand Logo */}
      <Link to="/" className="flex items-center gap-2.5 hover:opacity-90 transition">
        <div className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-purple-600 to-pink-500 shadow-lg">
          <ShieldCheck className="h-5 w-5 text-white" />
        </div>
        <span className="text-lg font-bold tracking-tight text-white">ClauseShield AI</span>
      </Link>

      {isWorkspace ? (
        <div className="flex items-center gap-4">
          <div className="hidden sm:flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="text-xs font-medium text-zinc-300">Gemini 2.5 Active</span>
          </div>

          {/* Fixed responsive breakdown query values to accurately target 320px structures */}
          <div className="flex flex-row max-[320px]:flex-col items-center max-[320px]:items-stretch gap-3 bg-zinc-900 border border-zinc-800 px-3 py-1.5 rounded-xl">
            <div className="flex items-center gap-3">
              <Coins className="h-4.5 w-4.5 text-amber-400 shrink-0" />
              <div className="text-left">
                <span className="block text-[10px] uppercase font-semibold text-zinc-500 tracking-wider">Remaining Balance</span>
                <span className="text-sm font-bold text-white">{credits} Credits</span>
              </div>
            </div>
            <button 
              onClick={onRefillClick}
              className="ml-1.5 max-[320px]:ml-0 max-[320px]:mt-1 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-zinc-950 font-bold px-2.5 py-1.5 rounded-lg text-xs transition duration-200 shadow-md shadow-amber-500/10 hover:shadow-amber-500/20 cursor-pointer w-full min-[321px]:w-auto text-center"
            >
              Refill
            </button>
          </div>

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            title="Log Out Account"
            className="flex items-center justify-center h-9 w-9 rounded-xl border border-white/10 bg-white/5 text-zinc-400 hover:text-red-400 hover:bg-red-500/10 hover:border-red-500/20 transition duration-200 cursor-pointer"
          >
            <LogOut className="h-4 w-4" />
          </button>
        </div>
      ) : (
        <div className="flex items-center gap-8">
          <nav className="hidden items-center gap-8 text-sm text-gray-400 md:flex">
            <a href="#features" className="hover:text-white transition">Features</a>
            <a href="#who" className="hover:text-white transition">Who it's for</a>
            <a href="#how" className="hover:text-white transition">How it works</a>
          </nav>
          
          {/* Conditional Landing Greeting: Switches logic layout dynamically if state username value is verified */}
          {username ? (
            <Link 
              to="/workspace" 
              className="flex items-center gap-2 rounded-full border border-purple-500/30 bg-purple-500/10 px-4 py-2 text-sm font-medium text-purple-300 backdrop-blur transition hover:bg-purple-500/20 shadow-[0_0_15px_rgba(168,85,247,0.1)]"
            >
              <User className="h-3.5 w-3.5 text-purple-400" />
              Hi, {username}
            </Link>
          ) : (
            <Link to="/login" className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-white backdrop-blur transition hover:bg-white/10">
              Launch app
            </Link>
          )}
        </div>
      )}
    </header>
  );
}
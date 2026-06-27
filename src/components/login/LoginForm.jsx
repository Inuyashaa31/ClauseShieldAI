import React, { useState } from 'react';
import { User, Lock, ShieldCheck } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

// Import our central Firebase configuration reference objects
import { auth, db } from '../../firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setIsLoading(true);

    try {
      // 1. Fire credentials into the secure Firebase Auth engine
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const authenticatedUser = userCredential.user;

      // 2. Fetch credit configurations dynamically using user authentication UID
      const userDocRef = doc(db, "users", authenticatedUser.uid);
      const userDocSnap = await getDoc(userDocRef);

      if (userDocSnap.exists()) {
        // Successful authentication and document balance matching completed
        navigate('/workspace');
      } else {
        setErrorMessage("User record discovered in Auth, but missing matching Firestore database entry.");
      }
    } catch (error) {
      console.error("Login verification breakdown:", error);
      // Format technical message values into readable warning responses
      if (error.code === 'auth/invalid-credential') {
        setErrorMessage("Invalid email account or password provided. Please verify entries.");
      } else if (error.code === 'auth/invalid-email') {
        setErrorMessage("Please input a structurally valid email address syntax format.");
      } else {
        setErrorMessage(error.message.replace("Firebase: ", ""));
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex h-full flex-col justify-between bg-[#13151a] p-10 lg:p-14">
      {/* Top Brand Logo */}
      <Link to='/'>
      <div className="flex items-center gap-2">
        <div className="grid h-7 w-7 place-items-center rounded-lg bg-gradient-to-br from-purple-600 to-pink-500">
          <ShieldCheck className="h-4 w-4 text-white" />
        </div>
        <span className="text-sm font-bold tracking-tight text-white">ClauseShield AI</span>
      </div>
      </Link>

      {/* Center Form Section */}
      <div className="mx-auto w-full max-w-sm py-8 text-center">
        {/* User Icon Avatar */}
        <div className="mx-auto mb-6 grid h-16 w-16 place-items-center rounded-full border border-white/10 bg-white/5 text-gray-400">
          <User className="h-8 w-8" />
        </div>

        {/* Dynamic Warning Notification Card banner */}
        {errorMessage && (
          <div className="mb-4 rounded-xl border border-red-500/20 bg-red-500/10 p-3 text-xs text-red-400 text-left font-medium">
            {errorMessage}
          </div>
        )}

        <form onSubmit={handleLoginSubmit} className="space-y-4">
          {/* Email Input (Replaced raw username with email for Firebase Auth alignment) */}
          <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-gray-500">
              <User className="h-4 w-4" />
            </span>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="EMAIL ADDRESS"
              className="w-full rounded-full border border-white/10 bg-black/20 py-3 pl-11 pr-4 font-sans text-xs font-semibold uppercase tracking-wider text-white placeholder-gray-500 outline-none transition focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/50"
            />
          </div>

          {/* Password Input */}
          <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-gray-500">
              <Lock className="h-4 w-4" />
            </span>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full rounded-full border border-white/10 bg-black/20 py-3 pl-11 pr-4 font-sans text-xs font-semibold tracking-wider text-white placeholder-gray-500 outline-none transition focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/50"
            />
          </div>

          {/* Login Button Button - Removed <Link> wrapping to allow onSubmit async validation */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full rounded-full bg-gradient-to-r from-purple-600 to-pink-500 py-3 text-xs font-bold uppercase tracking-widest text-white shadow-lg transition hover:opacity-90 active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? "Authenticating..." : "Login"}
          </button>
        </form>

        {/* Form Options footer */}
        <div className="mt-4 flex items-center justify-between px-2 text-[11px] font-medium text-gray-400">
        </div>
      </div>
    </div>
  );
}
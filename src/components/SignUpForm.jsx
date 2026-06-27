import React, { useState } from 'react';
import { User, Lock, Mail, ShieldCheck } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';

// Import our configuration instances
import { auth, db } from '../firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';

export default function SignUpForm() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleSignUpSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setIsLoading(true);

    try {
      // 1. Register account inside Firebase Authentication engine
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const newlyCreatedUser = userCredential.user;

      // 2. Set up the custom document inside Cloud Firestore mapped to that new UID
      const userDocRef = doc(db, "users", newlyCreatedUser.uid);
      
      // Provision 4 Credits automatically into the document fields
      await setDoc(userDocRef, {
        username: username,
        email: email.toLowerCase().trim(),
        credits: 4 // Provisioned balance granted here automatically
      });

      // Redirect into workspace dashboard cleanly
      navigate('/workspace');
    } catch (error) {
      console.error("Signup process failed:", error);
      if (error.code === 'auth/email-already-in-use') {
        setErrorMessage("This email account is already registered. Try logging in.");
      } else if (error.code === 'auth/weak-password') {
        setErrorMessage("Password safety low. Provide at least 6 characters.");
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
      <div className="flex items-center gap-2">
        <div className="grid h-7 w-7 place-items-center rounded-lg bg-gradient-to-br from-purple-600 to-pink-500">
          <ShieldCheck className="h-4 w-4 text-white" />
        </div>
        <span className="text-sm font-bold tracking-tight text-white">ClauseShield AI</span>
      </div>

      {/* Center Form Section */}
      <div className="mx-auto w-full max-w-sm py-8 text-center">
        <div className="mx-auto mb-4 grid h-14 w-14 place-items-center rounded-full border border-white/10 bg-white/5 text-purple-400 shadow-md">
          <ShieldCheck className="h-6 w-6" />
        </div>

        <h2 className="text-xl font-bold text-white mb-1">Create free account</h2>
        <p className="text-xs text-gray-500 mb-6">Get 4 transaction tokens added instantly.</p>

        {errorMessage && (
          <div className="mb-4 rounded-xl border border-red-500/20 bg-red-500/10 p-3 text-xs text-red-400 text-left font-medium">
            {errorMessage}
          </div>
        )}

        <form onSubmit={handleSignUpSubmit} className="space-y-4">
          {/* Public Alias Username Field */}
          <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-gray-500">
              <User className="h-4 w-4" />
            </span>
            <input
              type="text"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="DISPLAY NAME"
              className="w-full rounded-full border border-white/10 bg-black/20 py-3 pl-11 pr-4 font-sans text-xs font-semibold uppercase tracking-wider text-white placeholder-gray-500 outline-none transition focus:border-purple-500/50"
            />
          </div>

          {/* Email Identity Input */}
          <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-gray-500">
              <Mail className="h-4 w-4" />
            </span>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="EMAIL ADDRESS"
              className="w-full rounded-full border border-white/10 bg-black/20 py-3 pl-11 pr-4 font-sans text-xs font-semibold uppercase tracking-wider text-white placeholder-gray-500 outline-none transition focus:border-purple-500/50"
            />
          </div>

          {/* Secure Access Password Input */}
          <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-gray-500">
              <Lock className="h-4 w-4" />
            </span>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="CREATE PASSWORD"
              className="w-full rounded-full border border-white/10 bg-black/20 py-3 pl-11 pr-4 font-sans text-xs font-semibold tracking-wider text-white placeholder-gray-500 outline-none transition focus:border-purple-500/50"
            />
          </div>

          {/* Registration Activation submission trigger button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full rounded-full bg-gradient-to-r from-purple-600 to-pink-500 py-3 text-xs font-bold uppercase tracking-widest text-white shadow-lg transition hover:opacity-90 active:scale-[0.99] disabled:opacity-50"
          >
            {isLoading ? "Provisioning..." : "Claim My 4 Free Credits"}
          </button>
        </form>

        <div className="mt-5 text-[11px] text-gray-500">
          Already registered?{' '}
          <Link to="/login" className="font-semibold text-cyan-400 hover:underline">
            Log in here
          </Link>
        </div>
      </div>

      {/* Structural Spacer */}
      <div className="h-6"></div>
    </div>
  );
}
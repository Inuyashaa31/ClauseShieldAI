import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Hero from '../components/Hero';
import TargetAudience from '../components/TargetAudience';
import Features from '../components/Features';
import HowItWorks from '../components/HowItWorks';
import CallToAction from '../components/CallToAction';
import Footer from '../components/Footer';
import CursorBlob from '../components/CursorBlob';

// Import Firebase tools to check authentication state and read profiles
import { auth, db } from '../firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';

function LandingPage() {
  const [username, setUsername] = useState("");

  // Track if a user session exists and fetch their username configuration profile
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          const userDocRef = doc(db, "users", user.uid);
          const userDocSnap = await getDoc(userDocRef);
          
          if (userDocSnap.exists()) {
            // Assign username to display custom greeting button
            setUsername(userDocSnap.data().username || "User");
          }
        } catch (error) {
          console.error("Failed to parse user profile context info:", error);
        }
      } else {
        // Fall back to clean default if explicit session doesn't exist
        setUsername("");
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="relative min-h-screen bg-[#0d0e12] overflow-x-hidden selection:bg-pink-500/30 selection:text-white">
      {/* Dynamic Background Mesh Effect */}
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div 
          className="absolute inset-0 opacity-[0.04]" 
          style={{
            backgroundImage: `linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)`,
            backgroundSize: '60px 60px'
          }}
        ></div>
        <div className="absolute inset-0 bg-radial-gradient"></div>
        <div className="absolute -top-32 -left-20 h-[480px] w-[480px] rounded-full bg-purple-600/10 blur-[120px]"></div>
        <div className="absolute top-1/3 -right-32 h-[520px] w-[520px] rounded-full bg-pink-500/10 blur-[140px]"></div>
        <div className="absolute bottom-0 left-1/3 h-[460px] w-[460px] rounded-full bg-cyan-500/10 blur-[120px]"></div>
      </div>
      
      <CursorBlob />
      
      {/* Sent the current logged-in username into the header property slot */}
      <Header isWorkspace={false} username={username} />
      
      <main>
        <Hero />
        <TargetAudience />
        <Features />
        <HowItWorks />
        <CallToAction username={username}/>
      </main>
      <Footer />
    </div>
  );
}

export default LandingPage;
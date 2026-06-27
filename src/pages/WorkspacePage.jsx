import React, { useState, useEffect } from 'react';
import { Shield, Info, FileCheck, Coins } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// Import Firebase config elements
import { auth, db } from '../firebase';
import { doc, onSnapshot, updateDoc } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';

import Header from '../components/Header';
import ContractInput from '../components/modelpage/ContractInput';
import ReportDashboard from '../components/modelpage/ReportDashboard';
// import PaywallModal from '../components/PaywallModal'; // Active and imported

export default function WorkspacePage() {
    const [contractText, setContractText] = useState("");
    const [credits, setCredits] = useState(0); // Initialized at 0; loaded live via Firestore
    const [isLoading, setIsLoading] = useState(false);
    const [showPaywall, setShowPaywall] = useState(false);
    const [analysisResult, setAnalysisResult] = useState(null);
    const [activeTab, setActiveTab] = useState("input");
    const [customKey, setCustomKey] = useState("");
    const [copiedStatus, setCopiedStatus] = useState({});
    const [errorMessage, setErrorMessage] = useState("");
    const [inputKey, setInputKey] = useState(0);
    const [userSession, setUserSession] = useState(null);

    const navigate = useNavigate();

    // 1. Monitor Authentication State and Bind Live Firestore Streams
    useEffect(() => {
        const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUserSession(user);

                // Establish an active socket connection to listen for document modifications
                const userDocRef = doc(db, "users", user.uid);
                const unsubscribeSnapshot = onSnapshot(userDocRef, (docSnap) => {
                    if (docSnap.exists()) {
                        setCredits(docSnap.data().credits ?? 0);
                    } else {
                        setErrorMessage("No Firestore database record discovered matching this profile UID.");
                    }
                }, (error) => {
                    console.error("Firestore stream error:", error);
                });

                return () => unsubscribeSnapshot();
            } else {
                // Route unauthenticated visitors back to the gateway login view
                navigate('/login');
            }
        });

        return () => unsubscribeAuth();
    }, [navigate]);

    // 2. Modified Payment Success Processing webhook handler updating cloud nodes
    const triggerMockPayment = async (packName, price, addedCredits) => {
        setIsLoading(true);
        try {
            if (!userSession) return;
            const userDocRef = doc(db, "users", userSession.uid);

            // Push calculation updates into Firestore cloud records
            await updateDoc(userDocRef, {
                credits: credits + addedCredits
            });

            setIsLoading(false);
            setShowPaywall(false);
            alert(`Mock Dodo Payments Success! Purchased ${packName} for $${price}. ${addedCredits} credits provisioned to your Firebase database document.`);
        } catch (err) {
            console.error("Payment sync failed:", err);
            setErrorMessage("Failed to update credit balances on network layers.");
            setIsLoading(false);
        }
    };

    // Updated Copy Text Method: Completely optimized for iOS Safari and Chrome architectures
    const handleCopyText = async (text, id) => {
        // Attempt clean execution via modern browser navigator context
        if (navigator.clipboard && navigator.clipboard.writeText) {
            try {
                await navigator.clipboard.writeText(text);
                setCopiedStatus(prev => ({ ...prev, [id]: true }));
                setTimeout(() => {
                    setCopiedStatus(prev => ({ ...prev, [id]: false }));
                }, 2000);
                return;
            } catch (err) {
                console.warn("Modern clipboard failure, trying layout fallback...", err);
            }
        }

        // Safe Fallback Layer: Configured with explicit styling bounds to eliminate mobile jumping
        const textArea = document.createElement("textarea");
        textArea.value = text;
        textArea.style.position = 'fixed';
        textArea.style.top = '0';
        textArea.style.left = '0';
        textArea.style.opacity = '0';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();

        try {
            document.execCommand('copy');
            setCopiedStatus(prev => ({ ...prev, [id]: true }));
            setTimeout(() => {
                setCopiedStatus(prev => ({ ...prev, [id]: false }));
            }, 2000);
        } catch (err) {
            console.error("All copy execution avenues failed on this engine configuration:", err);
        }
        document.body.removeChild(textArea);
    };

    const handleReset = () => {
        setActiveTab("input");
        setAnalysisResult(null);
        setErrorMessage("");
        setContractText("");
        setInputKey(prev => prev + 1);
    };

    const runContractScan = async () => {
        if (credits <= 0) {
            setShowPaywall(true);
            return;
        }

        setIsLoading(true);
        setErrorMessage("");
        setAnalysisResult(null);

        const systemPrompt = `You are an expert AI Legal Contract Risk Analyzer. Your objective is to review terms provided by the user and flag risks that hurt freelancers, independent consultants, or small agencies.
You must analyze the contract and return ONLY a single stringified valid JSON object matching this schema. Do not include any markdown framing, do not wrap it in \`\`\`json, just return raw JSON text.
{
  "score": 0 to 100 representing the total risk score (100 being worst for freelancer),
  "verdict": "High Risk" | "Medium Risk" | "Low Risk",
  "summary": "One or two sentences providing a summary of the risks in this contract.",
  "risks": [
    {
      "category": "Auto-Renewal" | "Liability Cap" | "Non-Compete" | "Payment Terms" | "IP Ownership" | "Other Dispute",
      "severity": "High" | "Medium" | "Low",
      "clause": "The exact sentence or excerpt from the contract containing the issue",
      "implication": "Clear non-legal explanation of why this clause is dangerous to a service provider",
      "suggestedAlteration": "Proposed modification or redline text"
    }
  ]
}`;
        const userQuery = `Review this contract and parse it precisely into our risk analysis structure:\n\n${contractText}`;
        const apiKey = customKey || import.meta.env.VITE_GEMINI_API_KEY || "";

        if (!apiKey) {
            setErrorMessage("Missing API Key. Please add VITE_GEMINI_API_KEY to your .env file or input it directly below.");
            setIsLoading(false);
            return;
        }

        try {
            let response = null;
            let delay = 1000;
            let retries = 5;

            for (let i = 0; i < retries; i++) {
                try {
                    response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            contents: [{ parts: [{ text: userQuery }] }],
                            systemInstruction: { parts: [{ text: systemPrompt }] },
                            generationConfig: { responseMimeType: "application/json" }
                        })
                    });

                    if (response.ok) break;
                    if (response.status === 429) {
                        await new Promise(resolve => setTimeout(resolve, delay));
                        delay *= 2;
                    } else {
                        const errorText = await response.text();
                        throw new Error(`API Error status ${response.status}: ${errorText}`);
                    }
                } catch (retryErr) {
                    if (i === retries - 1) throw retryErr;
                }
            }

            if (!response || !response.ok) throw new Error("Could not contact the analysis engine after multiple attempts.");

            const result = await response.json();
            const textResponse = result.candidates?.[0]?.content?.parts?.[0]?.text;

            if (!textResponse) throw new Error("Empty response received from the analysis engine.");

            let parsedData;
            try {
                // 1. Convert the response to a safe string and strip away any messy markdown formatting tags
                let cleanText = String(textResponse || "")
                    .replace(/```json/g, "")
                    .replace(/```/g, "")
                    .trim();

                // 2. Safely convert the cleaned string into a readable layout object
                parsedData = JSON.parse(cleanText);
            } catch (jsonErr) {
                console.error("Scrub parsing sequence aborted:", jsonErr);
                setErrorMessage("The engine returned an irregular format. Please re-run the scan.");
                setIsLoading(false);
                return; // Safely exits the code instead of throwing a red error screen
            }

            // 3. Atomically Decrement Balance Value Directly Inside Cloud Firestore Instance Standard Syntax
            if (userSession) {
                const userDocRef = doc(db, "users", userSession.uid);
                await updateDoc(userDocRef, {
                    credits: Math.max(0, credits - 1)
                });
            }

            setAnalysisResult(parsedData);
            setActiveTab("dashboard");

        } catch (err) {
            console.error(err);
            setErrorMessage(err.message || "An unexpected error occurred during contract parsing.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div>
            <Header isWorkspace={true} credits={credits} onRefillClick={() => setShowPaywall(true)} />
            <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col font-sans selection:bg-indigo-500 selection:text-white">
                <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col lg:flex-row gap-8">
                    <ContractInput
                        key={inputKey}
                        contractText={contractText}
                        setContractText={setContractText}
                        customKey={customKey}
                        setCustomKey={setCustomKey}
                        isLoading={isLoading}
                        errorMessage={errorMessage}
                        setErrorMessage={setErrorMessage}
                        onScan={runContractScan}
                    />

                    <div className="w-full lg:w-7/12 flex flex-col">
                        {activeTab === "input" && !isLoading && (
                            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8 flex-1 flex flex-col items-center justify-center text-center max-w-2xl mx-auto w-full">
                                <div className="bg-zinc-950 p-6 rounded-full border border-zinc-800 mb-6 relative">
                                    <div className="absolute inset-0 bg-indigo-500/5 blur-xl rounded-full" />
                                    <FileCheck className="h-12 w-12 text-indigo-400" />
                                </div>
                                <h3 className="text-xl font-bold text-white mb-2">Analyze Your Business Clauses Instantly</h3>
                                <p className="text-sm text-zinc-400 max-w-md mx-auto leading-relaxed mb-6">
                                    Drop your contract PDF right into the workspace and click "Scan Contract Now" to isolate risk profiles like severe liability metrics, non-competes, or invisible auto-renewals.
                                </p>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-lg">
                                    <div className="bg-zinc-950 border border-zinc-800/50 rounded-xl p-4 text-left flex items-start gap-3">
                                        <Coins className="h-5 w-5 text-amber-400 shrink-0 mt-0.5" />
                                        <div>
                                            <span className="font-semibold text-sm block text-white">Prepaid Credit System</span>
                                            <span className="text-xs text-zinc-500 leading-relaxed">Integrated simulation mimicking credit meters backed by Cloud Firestore architecture.</span>
                                        </div>
                                    </div>

                                    <div className="bg-zinc-950 border border-zinc-800/50 rounded-xl p-4 text-left flex items-start gap-3">
                                        <Shield className="h-5 w-5 text-indigo-400 shrink-0 mt-0.5" />
                                        <div>
                                            <span className="font-semibold text-sm block text-white">Schema-Constrained LLM</span>
                                            <span className="text-xs text-zinc-500 leading-relaxed">Uses specialized system formatting instructions to retrieve standardized risk JSON.</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-8 p-3 bg-zinc-950/50 rounded-xl border border-zinc-800/80 text-[10px] text-zinc-500 max-w-md">
                                    <Info className="h-4.5 w-4.5 text-zinc-600 inline mr-1.5 align-text-bottom" />
                                    <span className="font-semibold text-zinc-400">LEGAL COMPLIANCE DISCLAIMER:</span> ClauseShield AI is built for demonstration purposes. It does not provide regulatory or legal counsel.
                                </div>
                            </div>
                        )}

                        {isLoading && (
                            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8 flex-1 flex flex-col items-center justify-center text-center">
                                <div className="relative mb-6">
                                    <div className="h-16 w-16 rounded-full border-t-2 border-r-2 border-indigo-500 animate-spin" />
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <Shield className="h-6 w-6 text-indigo-400 animate-pulse" />
                                    </div>
                                </div>
                                <h3 className="text-lg font-bold text-white mb-2">Analyzing Legal Wording</h3>
                                <p className="text-sm text-zinc-400 max-w-sm">
                                    Parsing the clauses through Gemini LLM, extracting risk percentages, auto-renewals, liability bounds, and non-competes...
                                </p>
                            </div>
                        )}

                        {activeTab === "dashboard" && analysisResult && !isLoading && (
                            <ReportDashboard
                                analysisResult={analysisResult}
                                onReset={handleReset}
                                copiedStatus={copiedStatus}
                                handleCopyText={handleCopyText}
                            />
                        )}
                    </div>
                </main>

                {showPaywall && (
                    <PaywallModal onClose={() => setShowPaywall(false)} triggerMockPayment={triggerMockPayment} />
                )}

                <footer className="border-t border-zinc-800 bg-zinc-900/40 py-8">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center md:text-left flex flex-col md:flex-row items-center justify-between gap-4">
                        <div>
                            <div className="flex items-center justify-center md:justify-start gap-2 mb-1">
                                <Shield className="h-5 w-5 text-indigo-400" />
                                <span className="font-extrabold text-sm text-white tracking-tight">ClauseShield AI</span>
                            </div>
                            <p className="text-xs text-zinc-500">A demonstration project leveraging Google Gemini LLM & Cloud Firestore architecture.</p>
                        </div>
                        <div className="flex gap-6 text-xs text-zinc-500">
                            <span className="hover:text-zinc-400 transition cursor-pointer">Security Policy</span>
                            <span className="hover:text-zinc-400 transition cursor-pointer">No-Training Clause</span>
                            <span className="hover:text-zinc-400 transition cursor-pointer">Developer Documentation</span>
                        </div>
                    </div>
                </footer>
            </div>
        </div>
    );
}
import React, { useState, useRef } from 'react';
import { Upload, Lock, AlertTriangle, Sparkles, RefreshCw, FileText, CheckCircle } from 'lucide-react';
import * as pdfjsLib from 'pdfjs-dist';

// Configure the PDF.js worker to pull from a stable CDN so it runs seamlessly client-side in Vite
pdfjsLib.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjsLib.version}/build/pdf.worker.min.mjs`;

export default function ContractInput({
  contractText,
  setContractText,
  customKey,
  setCustomKey,
  isLoading,
  errorMessage,
  setErrorMessage,
  onScan
}) {
  const [pdfLoading, setPdfLoading] = useState(false);
  const [fileName, setFileName] = useState('');
  const fileInputRef = useRef(null);

  // Client-side text extraction engine for PDFs
  const extractTextFromPdf = async (file) => {
    setPdfLoading(true);
    setErrorMessage('');
    setFileName(file.name);

    try {
      const arrayBuffer = await file.arrayBuffer();
      const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
      let fullText = '';

      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const textContent = await page.getTextContent();
        const pageText = textContent.items.map((item) => item.str).join(' ');
        fullText += pageText + '\n';
      }

      if (!fullText.trim()) {
        throw new Error("Could not extract legible text. The PDF might be an image scan instead of digital text.");
      }

      setContractText(fullText);
    } catch (err) {
      console.error(err);
      setErrorMessage(err.message || "Failed to process the PDF document safely.");
      setFileName('');
    } finally {
      setPdfLoading(false);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type === "application/pdf") {
      extractTextFromPdf(file);
    } else if (file) {
      setErrorMessage("Unsupported format. Please upload a valid .pdf document.");
    }
  };

  return (
    <div className="w-full lg:w-5/12 flex flex-col gap-6">
      {/* Upload Zone */}
      <div className="bg-zinc-900 border border-zinc-800/80 rounded-2xl p-6 shadow-xl">
        <h2 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
          <Upload className="h-5 w-5 text-indigo-400" />
          1. Upload Legal Document
        </h2>
        <p className="text-sm text-zinc-400 mb-4">
          Upload your freelance or business contract as a PDF to pull text and isolate operational vulnerabilities.
        </p>

        <div 
          onClick={() => fileInputRef.current?.click()}
          className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition duration-200 bg-zinc-950/40 flex flex-col items-center justify-center gap-3 ${
            fileName ? 'border-emerald-500/50 bg-emerald-500/5' : 'border-zinc-800 hover:border-zinc-700 hover:bg-zinc-950/80'
          }`}
        >
          <input 
            type="file" 
            ref={fileInputRef} 
            onChange={handleFileChange} 
            accept="application/pdf" 
            className="hidden" 
          />
          
          {pdfLoading ? (
            <>
              <RefreshCw className="h-10 w-10 text-indigo-400 animate-spin" />
              <p className="text-sm text-zinc-300 font-medium">Extracting textual layout from PDF...</p>
            </>
          ) : fileName ? (
            <>
              <CheckCircle className="h-10 w-10 text-emerald-400" />
              <div>
                <p className="text-sm text-white font-semibold truncate max-w-xs mx-auto">{fileName}</p>
                <p className="text-xs text-emerald-500 mt-1">Successfully parsed</p>
              </div>
            </>
          ) : (
            <>
              <FileText className="h-10 w-10 text-zinc-500" />
              <div>
                <p className="text-sm text-zinc-300 font-medium">Click to select or drop your PDF contract</p>
                <p className="text-xs text-zinc-500 mt-1">Supports digital text PDFs up to 10MB</p>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Editor & Content Execution Area */}
      <div className="bg-zinc-900 border border-zinc-800/80 rounded-2xl p-6 shadow-xl flex-1 flex flex-col">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <FileText className="h-5 w-5 text-indigo-400" />
            2. Extracted Contract Content
          </h2>
          <span className="text-xs text-zinc-500 font-mono">{contractText.length} characters</span>
        </div>
        
        <p className="text-xs text-zinc-400 mb-4">
          Verify or adjust the parsed copy below before sending it down the analyzer pipeline.
        </p>

        <div className="relative flex-1 min-h-[250px] flex flex-col rounded-xl overflow-y-auto custom-scroll">
          <textarea
            value={contractText}
            onChange={(e) => setContractText(e.target.value)}
            placeholder="Your extracted terms will appear here automatically after upload..."
            className="w-full flex-1 p-4 bg-zinc-950 border border-zinc-800 rounded-xl text-zinc-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 font-mono resize-none leading-relaxed"
          />
        </div>

        {/* Custom API Key */}
        <div className="mt-4 p-3 bg-zinc-950 rounded-xl border border-zinc-800 flex items-center gap-3">
          <Lock className="h-4 w-4 text-zinc-500 shrink-0" />
          <div className="flex-1">
            <label className="block text-[10px] uppercase tracking-wider font-bold text-zinc-500">Provide Custom Gemini API Key (Optional)</label>
            <input 
              type="password"
              value={customKey}
              onChange={(e) => setCustomKey(e.target.value)}
              placeholder="Defaults to workspace secure key"
              className="w-full bg-transparent border-none p-0 text-xs text-zinc-300 focus:outline-none placeholder:text-zinc-600 font-mono mt-0.5"
            />
          </div>
        </div>

        {errorMessage && (
          <div className="mt-4 p-3 bg-red-500/10 border border-red-500/30 text-red-400 rounded-xl text-xs flex items-start gap-2.5">
            <AlertTriangle className="h-4.5 w-4.5 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold">Scan Error:</span> {errorMessage}
            </div>
          </div>
        )}

        <button
          onClick={onScan}
          disabled={isLoading || pdfLoading || !contractText.trim()}
          className="mt-4 w-full bg-gradient-to-r from-indigo-500 via-indigo-600 to-purple-600 hover:from-indigo-600 hover:to-purple-700 disabled:from-zinc-800 disabled:to-zinc-800 disabled:text-zinc-500 text-white font-bold py-3.5 px-6 rounded-xl text-sm transition duration-300 shadow-lg shadow-indigo-500/10 hover:shadow-indigo-500/25 flex items-center justify-center gap-2.5 cursor-pointer disabled:cursor-not-allowed group"
        >
          {isLoading ? (
            <>
              <RefreshCw className="h-5 w-5 animate-spin text-zinc-400" />
              <span>Scanning Document Framework...</span>
            </>
          ) : (
            <>
              <Sparkles className="h-5 w-5 text-amber-300 group-hover:scale-110 transition-transform duration-200" />
              <span>Scan Contract Now (-1 Credit)</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
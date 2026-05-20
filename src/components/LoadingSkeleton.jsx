import React, { useState, useEffect } from 'react';
import { Sparkles, Globe } from 'lucide-react';

const LOADING_QUOTES = [
  "Gemini is busy mapping out local hidden gems...",
  "Finding the best local culinary spots just for you...",
  "Designing daily routes to minimize travel time...",
  "Curating the perfect blend of adventure and relaxation...",
  "Estimating budgets and finding the best accommodation value...",
  "Packing tip: Roll your clothes instead of folding them to save space!",
  "Travel fact: The shortest commercial flight in the world lasts just 57 seconds in Scotland."
];

export default function LoadingSkeleton() {
  const [quoteIndex, setQuoteIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setQuoteIndex(prev => (prev + 1) % LOADING_QUOTES.length);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 select-none space-y-8">
      {/* Dynamic Status message card */}
      <div className="glass-panel rounded-2xl p-6 text-center border border-indigo-500/20 shadow-xl max-w-2xl mx-auto">
        <div className="relative inline-block mb-4">
          <Globe className="w-10 h-10 text-indigo-400 animate-spin" style={{ animationDuration: '8s' }} />
          <Sparkles className="w-5 h-5 text-purple-400 absolute -top-1 -right-1 animate-bounce" />
        </div>
        <h3 className="text-lg font-bold text-slate-100 mb-1">Architecting your custom journey...</h3>
        <p className="text-sm text-indigo-300 transition-all duration-500 min-h-[40px] flex items-center justify-center px-4 italic">
          "{LOADING_QUOTES[quoteIndex]}"
        </p>
      </div>

      {/* Main Skeleton Blocks */}
      <div className="space-y-6 opacity-60">
        {/* Header Block */}
        <div className="glass-panel rounded-2xl p-6 space-y-4 animate-pulse">
          <div className="h-7 bg-slate-800 rounded-lg w-1/3" />
          <div className="h-4 bg-slate-800 rounded-lg w-2/3" />
          <div className="flex gap-4">
            <div className="h-6 bg-slate-800 rounded-md w-24" />
            <div className="h-6 bg-slate-800 rounded-md w-32" />
          </div>
        </div>

        {/* Highlight Block */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="glass-panel rounded-2xl p-6 space-y-3 animate-pulse">
            <div className="h-5 bg-slate-800 rounded-lg w-1/4" />
            <div className="h-4 bg-slate-800 rounded-lg w-5/6" />
            <div className="h-4 bg-slate-800 rounded-lg w-4/5" />
            <div className="h-4 bg-slate-800 rounded-lg w-3/4" />
          </div>
          <div className="glass-panel rounded-2xl p-6 space-y-3 animate-pulse">
            <div className="h-5 bg-slate-800 rounded-lg w-1/4" />
            <div className="h-4 bg-slate-800 rounded-lg w-5/6" />
            <div className="h-4 bg-slate-800 rounded-lg w-4/5" />
          </div>
        </div>

        {/* Day cards */}
        <div className="space-y-4">
          {[1, 2].map((i) => (
            <div key={i} className="glass-panel rounded-2xl p-6 space-y-4 animate-pulse border border-slate-800/40">
              <div className="flex justify-between items-center">
                <div className="h-6 bg-slate-800 rounded-lg w-28" />
                <div className="h-5 bg-slate-800 rounded-lg w-36" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2 p-3 bg-slate-900/40 rounded-xl">
                  <div className="h-3.5 bg-slate-800 rounded w-16" />
                  <div className="h-4.5 bg-slate-800 rounded w-3/4" />
                  <div className="h-3 bg-slate-800 rounded w-full" />
                </div>
                <div className="space-y-2 p-3 bg-slate-900/40 rounded-xl">
                  <div className="h-3.5 bg-slate-800 rounded w-16" />
                  <div className="h-4.5 bg-slate-800 rounded w-2/3" />
                  <div className="h-3 bg-slate-800 rounded w-5/6" />
                </div>
                <div className="space-y-2 p-3 bg-slate-900/40 rounded-xl">
                  <div className="h-3.5 bg-slate-800 rounded w-16" />
                  <div className="h-4.5 bg-slate-800 rounded w-3/4" />
                  <div className="h-3 bg-slate-800 rounded w-full" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

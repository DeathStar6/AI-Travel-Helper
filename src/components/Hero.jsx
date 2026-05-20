import React from 'react';
import { Compass, Sparkles, ArrowRight } from 'lucide-react';

export default function Hero({ onStartClick }) {
  return (
    <div className="relative overflow-hidden pt-12 pb-10 md:pt-24 md:pb-16">
      {/* Background glow effects */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 md:w-[600px] md:h-[600px] rounded-full bg-indigo-600/10 blur-[80px] md:blur-[120px] pointer-events-none -z-10" />
      <div className="absolute top-1/3 left-1/3 w-60 h-60 rounded-full bg-purple-600/10 blur-[60px] md:blur-[100px] pointer-events-none -z-10" />

      <div className="max-w-4xl mx-auto px-4 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/25 text-indigo-300 text-xs md:text-sm font-medium mb-6 select-none">
          <Sparkles className="w-4 h-4 text-indigo-400 animate-pulse" />
          <span>Next-Gen AI Travel planner</span>
        </div>

        {/* Heading */}
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6 font-display leading-tight select-none">
          Your Next Adventure, <br />
          <span className="text-gradient-purple-cyan font-extrabold">Designed by Intelligence</span>
        </h1>

        {/* Description */}
        <p className="text-base md:text-xl text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed font-sans">
          Say goodbye to hours of planning. TripGenius AI crafts personalized itineraries, local food suggestions, and budget breakdowns tailored exactly to your style.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button
            onClick={onStartClick}
            className="group px-8 py-4 rounded-xl font-semibold bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-600/20 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] flex items-center gap-2 select-none"
          >
            Start Planning Free 
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
          
          <a
            href="#saved-trips"
            className="px-8 py-4 rounded-xl font-semibold bg-slate-900/60 border border-slate-800 text-slate-300 hover:text-white hover:bg-slate-900 hover:border-indigo-500/35 transition-all duration-300 flex items-center gap-2 select-none"
          >
            <Compass className="w-5 h-5 text-indigo-400" />
            View Saved Trips
          </a>
        </div>
      </div>
    </div>
  );
}

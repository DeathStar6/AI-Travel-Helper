import React, { useState } from 'react';
import { ChevronDown, ChevronUp, MapPin, Coffee, Sun, Moon, Hotel, Info, Clock } from 'lucide-react';
import { getMapsLink } from '../utils/helpers';

export default function DayCard({ dayData, destination, defaultOpen = false }) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  const { day, theme, morning, afternoon, evening, accommodation } = dayData;

  const sections = [
    { key: 'morning', label: 'Morning', icon: Coffee, data: morning, color: 'text-amber-400 bg-amber-500/10' },
    { key: 'afternoon', label: 'Afternoon', icon: Sun, data: afternoon, color: 'text-orange-400 bg-orange-500/10' },
    { key: 'evening', label: 'Evening', icon: Moon, data: evening, color: 'text-indigo-400 bg-indigo-500/10' }
  ];

  return (
    <div className="glass-panel rounded-2xl overflow-hidden border border-slate-800/80 transition-all duration-300">
      {/* Header */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-5 text-left bg-slate-900/40 hover:bg-slate-900/60 transition-colors"
      >
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-indigo-400">Day {day}</span>
          <h3 className="text-base md:text-lg font-bold text-slate-100 font-display mt-0.5">
            {theme || `Exploring ${destination}`}
          </h3>
        </div>
        <div>
          {isOpen ? (
            <ChevronUp className="w-5 h-5 text-slate-400" />
          ) : (
            <ChevronDown className="w-5 h-5 text-slate-400" />
          )}
        </div>
      </button>

      {/* Content */}
      {isOpen && (
        <div className="p-5 border-t border-slate-800/50 space-y-6">
          <div className="relative border-l border-slate-805 ml-3 pl-6 space-y-6">
            {sections.map(({ label, icon: Icon, data, color }) => {
              if (!data || !data.activity) return null;
              return (
                <div key={label} className="relative">
                  {/* Timeline bullet */}
                  <span className={`absolute -left-[35px] top-0.5 p-1 rounded-full border border-slate-850 flex items-center justify-center ${color}`}>
                    <Icon className="w-3.5 h-3.5" />
                  </span>

                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">{label}</span>
                      {data.duration && (
                        <span className="inline-flex items-center gap-1 text-[10px] bg-slate-900 text-slate-400 px-1.5 py-0.5 rounded border border-slate-800">
                          <Clock className="w-3 h-3 text-indigo-450" /> {data.duration}
                        </span>
                      )}
                    </div>

                    <h4 className="text-sm md:text-base font-semibold text-slate-100 mt-1">{data.activity}</h4>

                    {data.place && (
                      <div className="mt-1.5 flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
                        <a
                          href={getMapsLink(data.place, destination)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs md:text-sm text-indigo-300 hover:text-indigo-200 underline decoration-indigo-500/50 hover:decoration-indigo-300 transition-colors font-medium"
                        >
                          {data.place}
                        </a>
                      </div>
                    )}

                    {data.tip && (
                      <div className="mt-2.5 p-3 rounded-lg bg-slate-950/40 border border-slate-900 text-xs text-slate-400 leading-relaxed flex items-start gap-2">
                        <Info className="w-4 h-4 text-indigo-400/80 shrink-0 mt-0.5" />
                        <span><strong className="text-slate-350">Tip:</strong> {data.tip}</span>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Accommodation Info */}
          {accommodation && accommodation.name && (
            <div className="pt-4 border-t border-slate-800/60 flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-xl bg-slate-900/25 border border-slate-850">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 shrink-0">
                  <Hotel className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold tracking-wider text-slate-500 block leading-none mb-1">Night stay recommendation</span>
                  <span className="text-sm font-semibold text-slate-200">{accommodation.name}</span>
                  {accommodation.type && (
                    <span className="text-[11px] text-slate-400 ml-2 px-1.5 py-0.5 rounded bg-slate-900 border border-slate-800">
                      {accommodation.type}
                    </span>
                  )}
                </div>
              </div>
              {accommodation.priceRange && (
                <div className="text-left sm:text-right text-xs">
                  <span className="text-slate-500 block">Est. Cost Range</span>
                  <span className="font-semibold font-mono text-emerald-400">{accommodation.priceRange}</span>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

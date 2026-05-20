import React, { useState } from 'react';
import { Bookmark, BookmarkCheck, Copy, Check, MapPin, AlertCircle, ShoppingBag, Lightbulb, Phone, Sparkles } from 'lucide-react';
import DayCard from './DayCard';
import BudgetBreakdown from './BudgetBreakdown';
import { getMapsLink } from '../utils/helpers';

export default function ItineraryCard({ itineraryData, formData, onSave, isSaved }) {
  const [copied, setCopied] = useState(false);

  const handleCopySummary = () => {
    const text = `✈️ TRIPGENIUS AI ITINERARY: ${formData.destination.toUpperCase()}
📅 Duration: ${formData.numDays} Days (${formData.month})
👤 Style: ${formData.travelStyle} | 💰 Budget: ${formData.budgetType}

🌟 Trip Summary:
${itineraryData.tripSummary}

🏛️ Top Attractions:
${itineraryData.topAttractions.map(a => `- ${a.name}: ${a.description} (Entry: ${a.entryFee})`).join('\n')}

🍜 Local Food Suggestions:
${itineraryData.foodSuggestions.map(f => `- ${f.dish} (Try at: ${f.where})`).join('\n')}

💵 Total Estimated Budget:
₹${itineraryData.budgetBreakdown.total} INR
`.trim();

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2050);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-8 select-none">
      {/* Header Panel */}
      <div className="glass-panel rounded-3xl p-6 md:p-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/5 rounded-full blur-2xl pointer-events-none" />
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-semibold mb-3">
              <Sparkles className="w-3 h-3 text-indigo-400" />
              <span>Itinerary Generated</span>
            </div>
            <h2 className="text-3xl font-extrabold text-slate-100 font-display">
              {formData.destination}
            </h2>
            <p className="text-sm text-slate-400 mt-1">
              Starting from <strong className="text-slate-350">{formData.startingCity || 'your starting point'}</strong> &bull; {formData.numDays} Days in {formData.month}
            </p>
            
            {/* Meta Tags */}
            <div className="flex flex-wrap gap-2 mt-4">
              <span className="px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800 text-xs font-semibold text-slate-300">
                👤 {formData.travelStyle}
              </span>
              <span className="px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800 text-xs font-semibold text-slate-300">
                💰 {formData.budgetType}
              </span>
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              onClick={onSave}
              disabled={isSaved}
              className={`px-5 py-3 rounded-xl text-sm font-semibold border flex items-center gap-2 transition-all duration-300 ${
                isSaved
                  ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-450 cursor-not-allowed'
                  : 'bg-indigo-650 hover:bg-indigo-600 border-indigo-500 text-white shadow-lg shadow-indigo-600/15 active:scale-95'
              }`}
            >
              {isSaved ? (
                <>
                  <BookmarkCheck className="w-4 h-4 text-emerald-450" />
                  Saved to Library
                </>
              ) : (
                <>
                  <Bookmark className="w-4 h-4" />
                  Save Itinerary
                </>
              )}
            </button>

            <button
              onClick={handleCopySummary}
              className="px-5 py-3 rounded-xl text-sm font-semibold bg-slate-905 border border-slate-800 text-slate-300 hover:text-slate-100 hover:border-slate-700 transition-all duration-300 active:scale-95 flex items-center gap-2"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-emerald-400" />
                  Copied!
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  Copy Summary
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Summary, Highlights & Best Time */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 glass-panel rounded-2xl p-6 border border-slate-800/80 flex flex-col justify-between">
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 mb-2">Trip Overview</h3>
            <p className="text-sm md:text-base text-slate-300 leading-relaxed font-sans">{itineraryData.tripSummary}</p>
          </div>
          {itineraryData.bestTimeToVisit && (
            <div className="mt-4 pt-4 border-t border-slate-800/50 flex items-center gap-2 text-xs md:text-sm text-indigo-300">
              <AlertCircle className="w-4 h-4 shrink-0 text-indigo-400" />
              <span><strong>Best Time to Visit:</strong> {itineraryData.bestTimeToVisit}</span>
            </div>
          )}
        </div>

        <div className="glass-panel rounded-2xl p-6 border border-slate-800/80">
          <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 mb-3">Highlights</h3>
          <ul className="space-y-2">
            {itineraryData.highlights?.map((hl, index) => (
              <li key={index} className="text-xs md:text-sm text-slate-300 flex items-start gap-2">
                <span className="text-indigo-400 mt-0.5">&bull;</span>
                <span>{hl}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Daily Itinerary */}
      <div className="space-y-4">
        <h3 className="text-lg font-bold text-slate-100 font-display pl-1">Daily Plan</h3>
        <div className="space-y-4">
          {itineraryData.itinerary?.map((dayPlan) => (
            <DayCard
              key={dayPlan.day}
              dayData={dayPlan}
              destination={formData.destination}
              defaultOpen={dayPlan.day === 1}
            />
          ))}
        </div>
      </div>

      {/* Attractions & Local Food Suggestions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Attractions */}
        <div className="glass-panel rounded-2xl p-6 border border-slate-800/80 space-y-4">
          <h3 className="text-base font-bold text-slate-100 font-display border-b border-slate-800 pb-3 flex items-center gap-2">
            🏛️ Top Attractions
          </h3>
          <div className="space-y-4 max-h-[350px] overflow-y-auto pr-1">
            {itineraryData.topAttractions?.map((attr, index) => (
              <div key={index} className="space-y-1">
                <div className="flex items-center justify-between gap-2">
                  <a
                    href={getMapsLink(attr.name, formData.destination)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-bold text-indigo-300 hover:text-indigo-200 underline decoration-indigo-500/30 font-display flex items-center gap-1.5"
                  >
                    <MapPin className="w-3.5 h-3.5" />
                    {attr.name}
                  </a>
                  <span className="text-[10px] bg-slate-900 border border-slate-800 rounded px-1.5 py-0.5 text-slate-400 font-mono">
                    {attr.entryFee}
                  </span>
                </div>
                <p className="text-xs text-slate-400 leading-normal">{attr.description}</p>
                {attr.bestTime && (
                  <span className="text-[10px] text-indigo-400 block font-medium">🕒 Best time: {attr.bestTime}</span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Local Food Suggestions */}
        <div className="glass-panel rounded-2xl p-6 border border-slate-800/80 space-y-4">
          <h3 className="text-base font-bold text-slate-100 font-display border-b border-slate-800 pb-3 flex items-center gap-2">
            🍜 Food Suggestions
          </h3>
          <div className="space-y-4 max-h-[350px] overflow-y-auto pr-1">
            {itineraryData.foodSuggestions?.map((food, index) => (
              <div key={index} className="p-3 rounded-xl bg-slate-900/35 border border-slate-850 flex items-center justify-between gap-4">
                <div>
                  <span className="text-sm font-bold text-slate-200 block">{food.dish}</span>
                  <span className="text-xs text-slate-450">Recommended: <strong className="text-slate-350">{food.where}</strong></span>
                </div>
                <span className="text-[10px] bg-slate-900 border border-slate-800 rounded px-1.5 py-0.5 text-emerald-400 font-semibold uppercase">
                  {food.priceRange}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Budget Breakdown */}
      {itineraryData.budgetBreakdown && (
        <BudgetBreakdown budgetData={itineraryData.budgetBreakdown} />
      )}

      {/* Packing, Tips & Contacts */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Packing List */}
        <div className="glass-panel rounded-2xl p-6 border border-slate-800/80">
          <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-1.5">
            <ShoppingBag className="w-4 h-4 text-indigo-400" />
            Packing List
          </h3>
          <ul className="space-y-2">
            {itineraryData.packingList?.map((item, index) => (
              <li key={index} className="text-xs text-slate-300 flex items-start gap-2">
                <span className="text-emerald-500 font-bold">✓</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Travel Tips */}
        <div className="glass-panel rounded-2xl p-6 border border-slate-800/80">
          <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-1.5">
            <Lightbulb className="w-4 h-4 text-amber-400" />
            Travel Tips
          </h3>
          <ul className="space-y-2">
            {itineraryData.travelTips?.map((tip, index) => (
              <li key={index} className="text-xs text-slate-300 flex items-start gap-2">
                <span className="text-indigo-400 font-bold">&bull;</span>
                <span>{tip}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Emergency Contacts */}
        <div className="glass-panel rounded-2xl p-6 border border-slate-800/80">
          <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-1.5">
            <Phone className="w-4 h-4 text-rose-455" />
            Emergency Contacts
          </h3>
          {itineraryData.emergencyContacts && (
            <div className="space-y-3 font-mono text-xs">
              <div className="flex justify-between py-1.5 border-b border-slate-800/50">
                <span className="text-slate-500">Police</span>
                <span className="text-slate-200 font-semibold">{itineraryData.emergencyContacts.police || '100'}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-slate-800/50">
                <span className="text-slate-500">Ambulance</span>
                <span className="text-slate-200 font-semibold">{itineraryData.emergencyContacts.ambulance || '102'}</span>
              </div>
              <div className="flex justify-between py-1.5">
                <span className="text-slate-500">Tourist Help</span>
                <span className="text-slate-200 font-semibold">{itineraryData.emergencyContacts.touristHelpline || 'N/A'}</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

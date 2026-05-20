import React, { useState } from 'react';
import { Compass, Trash2, Eye, Copy, Check, Calendar } from 'lucide-react';

export default function SavedTrips({ trips, onSelectTrip, onDeleteTrip, activeTripId }) {
  const [copiedId, setCopiedId] = useState(null);

  const handleCopySummary = (trip) => {
    const { destination, formData, itineraryData } = trip;
    const text = `✈️ TRIPGENIUS AI ITINERARY: ${destination.toUpperCase()}
📅 Duration: ${formData.numDays} Days (${formData.month})
👤 Style: ${formData.travelStyle} | 💰 Budget: ${formData.budgetType}

🌟 Trip Summary:
${itineraryData.tripSummary}

🏛️ Top Attractions:
${itineraryData.topAttractions?.map(a => `- ${a.name}: ${a.description} (Entry: ${a.entryFee})`).join('\n')}

🍜 Local Food Suggestions:
${itineraryData.foodSuggestions?.map(f => `- ${f.dish} (Try at: ${f.where})`).join('\n')}

💵 Total Estimated Budget:
₹${itineraryData.budgetBreakdown?.total} INR
`.trim();

    navigator.clipboard.writeText(text);
    setCopiedId(trip.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div id="saved-trips" className="glass-panel rounded-3xl p-6 md:p-8 max-w-4xl mx-auto shadow-xl select-none scroll-mt-24">
      <div className="flex items-center gap-2 mb-6 border-b border-slate-800/80 pb-4">
        <Compass className="w-5 h-5 text-indigo-400" />
        <h3 className="text-lg font-bold text-slate-100 font-display">Your Saved Itineraries</h3>
        <span className="text-xs bg-slate-900 border border-slate-800 rounded-full px-2.5 py-0.5 text-indigo-305 font-bold ml-auto font-mono">
          {trips.length}
        </span>
      </div>

      {trips.length === 0 ? (
        <div className="py-10 text-center border-2 border-dashed border-slate-800/80 rounded-2xl">
          <p className="text-sm text-slate-400">No saved itineraries yet. Plan a new trip to get started!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {trips.map((trip) => {
            const dateStr = new Date(trip.createdAt).toLocaleDateString(undefined, {
              month: 'short',
              day: 'numeric',
              year: 'numeric'
            });
            const isActive = activeTripId === trip.id;
            return (
              <div
                key={trip.id}
                className={`p-5 rounded-2xl border transition-all duration-300 flex flex-col justify-between gap-4 ${
                  isActive
                    ? 'bg-indigo-600/10 border-indigo-505 shadow-md shadow-indigo-600/5'
                    : 'bg-slate-900/40 border-slate-800/80 hover:border-slate-705 hover:bg-slate-900/60'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <h4 className="text-base font-bold text-slate-100 truncate max-w-[180px] md:max-w-[210px]">{trip.destination}</h4>
                    <span className="text-[10px] text-slate-500 font-mono flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-slate-500" />
                      {dateStr}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 mt-1">
                    {trip.formData.numDays} Days &bull; {trip.formData.budgetType} &bull; {trip.formData.month}
                  </p>
                </div>

                <div className="flex items-center justify-end gap-2 border-t border-slate-800/50 pt-3">
                  <button
                    onClick={() => onSelectTrip(trip)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors ${
                      isActive
                        ? 'bg-indigo-600 text-white'
                        : 'bg-slate-900 border border-slate-800 text-indigo-300 hover:text-indigo-200 hover:bg-slate-850'
                    }`}
                  >
                    <Eye className="w-3.5 h-3.5" />
                    {isActive ? 'Viewing' : 'View'}
                  </button>

                  <button
                    onClick={() => handleCopySummary(trip)}
                    className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-900 border border-slate-800 text-slate-300 hover:text-slate-100 hover:bg-slate-850 transition-colors flex items-center gap-1.5"
                  >
                    {copiedId === trip.id ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-450" />
                        Copied
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        Copy
                      </>
                    )}
                  </button>

                  <button
                    onClick={() => onDeleteTrip(trip.id)}
                    className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-900 border border-slate-800 text-rose-450 hover:text-rose-350 hover:bg-rose-500/10 hover:border-rose-500/30 transition-colors flex items-center gap-1.5 ml-auto"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    Delete
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

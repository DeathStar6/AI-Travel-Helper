import React, { useState } from 'react';
import { MapPin, Calendar, DollarSign, Users, Sparkles, ChevronRight, HelpCircle } from 'lucide-react';
import { MONTHS, INTEREST_LABELS } from '../utils/helpers';

export default function TripForm({ onSubmit, isLoading }) {
  const [formData, setFormData] = useState({
    destination: '',
    startingCity: '',
    numDays: 3,
    budgetType: 'Mid-range',
    budgetAmount: 25000,
    travelStyle: 'Solo',
    interests: [],
    month: MONTHS[new Date().getMonth()]
  });

  const travelStyles = [
    { value: 'Solo', label: 'Solo 🧘' },
    { value: 'Couple', label: 'Couple 💑' },
    { value: 'Family', label: 'Family 👨‍👩‍👧‍👦' },
    { value: 'Friends', label: 'Friends 👥' },
    { value: 'Business', label: 'Business 💼' }
  ];

  const budgetTypes = [
    { value: 'Budget', label: 'Budget 🪙', desc: 'Backpacker style, hostels, public transit' },
    { value: 'Mid-range', label: 'Mid-range 💳', desc: 'Comfort hotels, nice cafes, local transport' },
    { value: 'Luxury', label: 'Luxury 💎', desc: '5-star resorts, private transfers, fine dining' }
  ];

  // Helper to adjust approximate budget dynamically when type or days change
  const adjustBudget = (days, type) => {
    let multiplier = 5000;
    if (type === 'Budget') multiplier = 2500;
    if (type === 'Luxury') multiplier = 15000;
    return multiplier * days;
  };

  const handleBudgetTypeChange = (type) => {
    setFormData(prev => ({
      ...prev,
      budgetType: type,
      budgetAmount: adjustBudget(prev.numDays, type)
    }));
  };

  const handleDaysChange = (val) => {
    const days = parseInt(val, 10) || 1;
    const clampedDays = Math.max(1, Math.min(14, days));
    setFormData(prev => ({
      ...prev,
      numDays: clampedDays,
      budgetAmount: adjustBudget(clampedDays, prev.budgetType)
    }));
  };

  const toggleInterest = (interestKey) => {
    setFormData(prev => {
      const current = prev.interests;
      const updated = current.includes(interestKey)
        ? current.filter(item => item !== interestKey)
        : [...current, interestKey];
      return { ...prev, interests: updated };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.destination.trim()) return;
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="glass-panel rounded-3xl p-6 md:p-10 max-w-4xl mx-auto shadow-2xl space-y-8 select-none">
      <div className="border-b border-slate-800/80 pb-5">
        <h2 className="text-xl md:text-2xl font-bold text-slate-100 flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-indigo-400" />
          Plan Your Adventure
        </h2>
        <p className="text-sm text-slate-400 mt-1">Provide details and let our AI generate a curated plan.</p>
      </div>

      {/* Destination & Starting Point */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-semibold text-slate-300 mb-2 flex items-center gap-1.5">
            <MapPin className="w-4 h-4 text-indigo-400" />
            Where do you want to go? *
          </label>
          <input
            type="text"
            required
            value={formData.destination}
            onChange={(e) => setFormData(prev => ({ ...prev, destination: e.target.value }))}
            placeholder="e.g. Paris, Tokyo, Goa"
            className="w-full bg-slate-900 border border-slate-800 focus:border-indigo-500 rounded-xl px-4 py-3 text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all duration-300"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-300 mb-2 flex items-center gap-1.5">
            <MapPin className="w-4 h-4 text-emerald-400" />
            Starting City
          </label>
          <input
            type="text"
            value={formData.startingCity}
            onChange={(e) => setFormData(prev => ({ ...prev, startingCity: e.target.value }))}
            placeholder="e.g. Mumbai, New York"
            className="w-full bg-slate-900 border border-slate-800 focus:border-indigo-500 rounded-xl px-4 py-3 text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all duration-300"
          />
        </div>
      </div>

      {/* Duration & Month */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-semibold text-slate-300 mb-2 flex items-center gap-1.5">
            <Calendar className="w-4 h-4 text-indigo-400" />
            Duration (1 - 14 Days)
          </label>
          <div className="flex items-center gap-3">
            <input
              type="range"
              min="1"
              max="14"
              value={formData.numDays}
              onChange={(e) => handleDaysChange(e.target.value)}
              className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-500"
            />
            <span className="w-16 text-center bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 rounded-lg px-2.5 py-1 text-sm font-semibold">
              {formData.numDays} {formData.numDays === 1 ? 'Day' : 'Days'}
            </span>
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-300 mb-2 flex items-center gap-1.5">
            <Calendar className="w-4 h-4 text-purple-400" />
            Month of Travel
          </label>
          <select
            value={formData.month}
            onChange={(e) => setFormData(prev => ({ ...prev, month: e.target.value }))}
            className="w-full bg-slate-900 border border-slate-800 focus:border-indigo-500 rounded-xl px-4 py-3 text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all duration-300"
          >
            {MONTHS.map(m => (
              <option key={m} value={m} className="bg-slate-900 text-slate-100">{m}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Travel Style */}
      <div>
        <label className="block text-sm font-semibold text-slate-300 mb-3 flex items-center gap-1.5">
          <Users className="w-4 h-4 text-indigo-400" />
          Who are you traveling with?
        </label>
        <div className="flex flex-wrap gap-2">
          {travelStyles.map((style) => (
            <button
              key={style.value}
              type="button"
              onClick={() => setFormData(prev => ({ ...prev, travelStyle: style.value }))}
              className={`px-5 py-2.5 rounded-xl border text-sm font-medium transition-all duration-300 ${
                formData.travelStyle === style.value
                  ? 'bg-indigo-600 border-indigo-500 text-white shadow-md shadow-indigo-600/15'
                  : 'bg-slate-900 border-slate-800/80 text-slate-400 hover:border-slate-700 hover:text-slate-200'
              }`}
            >
              {style.label}
            </button>
          ))}
        </div>
      </div>

      {/* Budget Selector */}
      <div>
        <label className="block text-sm font-semibold text-slate-300 mb-3 flex items-center gap-1.5">
          <DollarSign className="w-4 h-4 text-indigo-400" />
          Select Budget Style
        </label>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {budgetTypes.map((type) => (
            <button
              key={type.value}
              type="button"
              onClick={() => handleBudgetTypeChange(type.value)}
              className={`p-4 rounded-xl border text-left transition-all duration-300 flex flex-col justify-between ${
                formData.budgetType === type.value
                  ? 'bg-indigo-600/15 border-indigo-500 text-slate-100 shadow-md'
                  : 'bg-slate-900/60 border-slate-800/80 text-slate-400 hover:border-slate-700/80'
              }`}
            >
              <span className="font-bold text-slate-100 text-sm">{type.label}</span>
              <span className="text-xs text-slate-400 mt-1 leading-normal">{type.desc}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Target Budget Amount */}
      <div>
        <label className="block text-sm font-semibold text-slate-300 mb-2 flex items-center justify-between">
          <span className="flex items-center gap-1.5">
            <DollarSign className="w-4 h-4 text-emerald-400" />
            Approx Total Budget (INR)
          </span>
          <span className="text-xs text-slate-400 italic">Adjust if needed</span>
        </label>
        <div className="relative">
          <span className="absolute left-4 top-3 text-slate-500 font-semibold font-mono">₹</span>
          <input
            type="number"
            min="1000"
            step="1000"
            value={formData.budgetAmount}
            onChange={(e) => setFormData(prev => ({ ...prev, budgetAmount: parseInt(e.target.value, 10) || 0 }))}
            className="w-full bg-slate-900 border border-slate-800 focus:border-indigo-500 rounded-xl pl-8 pr-4 py-3 text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all duration-300 font-mono"
          />
        </div>
      </div>

      {/* Interests */}
      <div>
        <label className="block text-sm font-semibold text-slate-300 mb-3 flex items-center gap-1.5">
          <Sparkles className="w-4 h-4 text-indigo-400" />
          Select Interests (Select all that apply)
        </label>
        <div className="flex flex-wrap gap-2.5">
          {Object.entries(INTEREST_LABELS).map(([key, label]) => {
            const isSelected = formData.interests.includes(key);
            return (
              <button
                key={key}
                type="button"
                onClick={() => toggleInterest(key)}
                className={`px-4 py-2 rounded-lg border text-xs md:text-sm font-medium transition-all duration-300 ${
                  isSelected
                    ? 'bg-gradient-to-r from-indigo-600 to-purple-600 border-indigo-500 text-white shadow-md shadow-indigo-600/15'
                    : 'bg-slate-900 border-slate-800/80 text-slate-400 hover:border-slate-700 hover:text-slate-200'
                }`}
              >
                {label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Submit Button */}
      <div className="pt-2">
        <button
          type="submit"
          disabled={isLoading}
          className={`w-full py-4 px-6 rounded-xl font-bold bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-600/15 transition-all duration-300 hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center gap-2 ${
            isLoading ? 'opacity-70 cursor-not-allowed' : ''
          }`}
        >
          {isLoading ? (
            <>
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              <span>Generating Travel Plan...</span>
            </>
          ) : (
            <>
              <span>Generate Travel Itinerary</span>
              <ChevronRight className="w-5 h-5" />
            </>
          )}
        </button>
      </div>
    </form>
  );
}

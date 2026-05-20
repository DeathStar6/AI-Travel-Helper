import React, { useState, useEffect, useRef } from 'react';
import { Sparkles, Key, Settings, AlertTriangle, Check, Info, Heart, Compass } from 'lucide-react';
import Hero from './components/Hero';
import TripForm from './components/TripForm';
import LoadingSkeleton from './components/LoadingSkeleton';
import ItineraryCard from './components/ItineraryCard';
import SavedTrips from './components/SavedTrips';
import { useTrips } from './hooks/useTrips';
import { generateTravelItinerary } from './utils/gemini';

export default function App() {
  const [apiKey, setApiKey] = useState(
    () => localStorage.getItem('tripgenius_api_key') || import.meta.env.VITE_GEMINI_API_KEY || ''
  );
  const [showKeyInput, setShowKeyInput] = useState(false);
  const [keyInputValue, setKeyInputValue] = useState(apiKey);
  
  const [activeItinerary, setActiveItinerary] = useState(null);
  const [activeTripId, setActiveTripId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [toastMessage, setToastMessage] = useState(null);
  
  const formRef = useRef(null);
  const itineraryRef = useRef(null);

  const { trips, saveTrip, deleteTrip } = useTrips();

  // Scroll helpers
  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToItinerary = () => {
    setTimeout(() => {
      itineraryRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  // Toast Helper
  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleSaveApiKey = (e) => {
    e.preventDefault();
    const cleanKey = keyInputValue.trim();
    setApiKey(cleanKey);
    localStorage.setItem('tripgenius_api_key', cleanKey);
    setShowKeyInput(false);
    showToast("API Key updated successfully!");
    if (error === 'API_KEY_MISSING' && cleanKey) {
      setError(null);
    }
  };

  const handleFormSubmit = async (formData) => {
    setIsLoading(true);
    setError(null);
    setActiveItinerary(null);
    setActiveTripId(null);
    
    // Auto scroll to loading screen
    scrollToItinerary();

    try {
      const data = await generateTravelItinerary(formData, apiKey);
      setActiveItinerary({ formData, itineraryData: data });
      scrollToItinerary();
    } catch (err) {
      console.error(err);
      setError(err.message || 'NETWORK_OR_API_ERROR');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveItinerary = () => {
    if (!activeItinerary) return;
    const { formData, itineraryData } = activeItinerary;
    const saved = saveTrip(formData.destination, formData, itineraryData);
    setActiveTripId(saved.id);
    showToast("Itinerary saved to library!");
  };

  const handleSelectTrip = (trip) => {
    setActiveItinerary({
      formData: trip.formData,
      itineraryData: trip.itineraryData
    });
    setActiveTripId(trip.id);
    setError(null);
    scrollToItinerary();
  };

  const handleDeleteTrip = (id) => {
    deleteTrip(id);
    if (activeTripId === id) {
      setActiveItinerary(null);
      setActiveTripId(null);
    }
    showToast("Itinerary removed from library.");
  };

  const checkIfSaved = () => {
    if (!activeItinerary) return false;
    // Check if matching destination, days, and month in trips
    return trips.some(
      (t) =>
        t.destination.toLowerCase() === activeItinerary.formData.destination.toLowerCase() &&
        t.formData.numDays === activeItinerary.formData.numDays &&
        t.formData.month === activeItinerary.formData.month
    );
  };

  return (
    <div className="min-h-screen flex flex-col font-sans bg-slate-950 text-slate-100 selection:bg-indigo-500/30">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-5 right-5 z-50 flex items-center gap-2 px-4 py-3 rounded-xl bg-slate-900 border border-emerald-500/30 text-emerald-400 font-semibold shadow-2xl text-xs md:text-sm animate-slide-up">
          <Check className="w-4 h-4" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Navigation Header */}
      <header className="sticky top-0 z-40 w-full border-b border-slate-900/80 bg-slate-950/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2.5 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center font-bold text-white shadow-md shadow-indigo-650/20 font-display">
              T
            </div>
            <span className="text-lg font-bold font-display tracking-tight text-white flex items-center gap-1.5">
              TripGenius <span className="text-indigo-400 font-medium">AI</span>
            </span>
          </div>

          <div className="flex items-center gap-3">
            {!apiKey && (
              <span className="hidden sm:inline-flex items-center gap-1 text-[11px] font-semibold text-rose-455 bg-rose-500/10 border border-rose-500/20 px-2.5 py-1 rounded-lg">
                <AlertTriangle className="w-3.5 h-3.5" />
                Missing API Key
              </span>
            )}
            
            <button
              onClick={() => setShowKeyInput(!showKeyInput)}
              className={`p-2.5 rounded-xl border transition-all duration-300 flex items-center justify-center ${
                apiKey
                  ? 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-205 hover:border-slate-700'
                  : 'bg-rose-500/15 border-rose-500/30 text-rose-400 hover:bg-rose-500/20'
              }`}
              title="Configure API Key"
            >
              <Key className="w-4.5 h-4.5" />
            </button>
          </div>
        </div>

        {/* API Key Dropdown panel */}
        {showKeyInput && (
          <div className="border-b border-slate-800/80 bg-slate-900/60 p-4 animate-fade-in">
            <div className="max-w-lg mx-auto">
              <form onSubmit={handleSaveApiKey} className="space-y-3">
                <div className="flex items-center justify-between">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1">
                    <Key className="w-3.5 h-3.5 text-indigo-400" />
                    Google Gemini API Key
                  </label>
                  <a
                    href="https://aistudio.google.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[11px] text-indigo-405 hover:underline font-medium"
                  >
                    Get Free Key &rarr;
                  </a>
                </div>
                <div className="flex gap-2">
                  <input
                    type="password"
                    placeholder="AIzaSy..."
                    value={keyInputValue}
                    onChange={(e) => setKeyInputValue(e.target.value)}
                    className="flex-1 bg-slate-950 border border-slate-800 focus:border-indigo-500 rounded-lg px-3.5 py-2 text-xs md:text-sm text-slate-100 placeholder-slate-600 focus:outline-none"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 font-semibold text-xs md:text-sm text-white"
                  >
                    Save
                  </button>
                </div>
                <p className="text-[10px] text-slate-500 leading-normal">
                  Saved locally in your browser cache. Never uploaded to servers.
                </p>
              </form>
            </div>
          </div>
        )}
      </header>

      {/* Main Container */}
      <main className="flex-1 max-w-7xl mx-auto px-4 w-full py-6 space-y-12 pb-16">
        {/* Banner if key is missing */}
        {!apiKey && (
          <div className="glass-panel border-rose-500/20 bg-rose-500/5 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4 max-w-4xl mx-auto animate-fade-in select-none">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-rose-500/10 rounded-lg text-rose-400 border border-rose-500/20">
                <AlertTriangle className="w-5 h-5 animate-pulse" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-205">Gemini API Key Required</h4>
                <p className="text-xs text-slate-400 mt-0.5">Please add your Google Gemini API Key to enable itinerary planning.</p>
              </div>
            </div>
            <button
              onClick={() => setShowKeyInput(true)}
              className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-semibold text-xs transition-colors shrink-0"
            >
              Configure Key
            </button>
          </div>
        )}

        {/* Hero Section */}
        <Hero onStartClick={scrollToForm} />

        {/* Trip Form Block */}
        <div ref={formRef} className="scroll-mt-20">
          <TripForm onSubmit={handleFormSubmit} isLoading={isLoading} />
        </div>

        {/* Dynamic Display Area (Itinerary / Loader / Error) */}
        <div ref={itineraryRef} className="scroll-mt-20">
          {isLoading && <LoadingSkeleton />}

          {error && (
            <div className="max-w-2xl mx-auto glass-panel border-rose-550/20 rounded-2xl p-6 text-center space-y-4">
              <AlertTriangle className="w-12 h-12 text-rose-500 mx-auto animate-bounce" />
              <div>
                <h3 className="text-lg font-bold text-slate-100">Planning Failed</h3>
                <p className="text-sm text-slate-400 mt-2 font-medium">
                  {error === 'API_KEY_MISSING' && "Google Gemini API Key is missing or invalid. Please check your settings."}
                  {error === 'INVALID_JSON_RESPONSE' && "The AI engine generated an invalid itinerary layout. Please try planning again."}
                  {error === 'NETWORK_OR_API_ERROR' && "A network error or API limit failure occurred. Please verify your API Key and internet connection."}
                  {!['API_KEY_MISSING', 'INVALID_JSON_RESPONSE', 'NETWORK_OR_API_ERROR'].includes(error) && error}
                </p>
              </div>
              <div className="pt-2">
                <button
                  onClick={() => {
                    setError(null);
                    scrollToForm();
                  }}
                  className="px-5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white transition-colors text-xs font-semibold"
                >
                  Adjust Form & Retry
                </button>
              </div>
            </div>
          )}

          {activeItinerary && !isLoading && !error && (
            <ItineraryCard
              itineraryData={activeItinerary.itineraryData}
              formData={activeItinerary.formData}
              onSave={handleSaveItinerary}
              isSaved={checkIfSaved()}
            />
          )}
        </div>

        {/* Saved Trips Section */}
        <div className="pt-6 border-t border-slate-900/60">
          <SavedTrips
            trips={trips}
            onSelectTrip={handleSelectTrip}
            onDeleteTrip={handleDeleteTrip}
            activeTripId={activeTripId}
          />
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full border-t border-slate-900/60 bg-slate-950 py-6 select-none mt-auto">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex items-center gap-1">
            <span>Powered by</span>
            <span className="text-slate-400 font-semibold flex items-center gap-0.5">
              Google Gemini AI 🚀
            </span>
          </div>
          <div>
            &copy; {new Date().getFullYear()} TripGenius AI. All rights reserved.
          </div>
          <div className="flex items-center gap-1 text-[11px]">
            Made with <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" /> for Travelers.
          </div>
        </div>
      </footer>
    </div>
  );
}

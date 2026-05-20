import { useState, useEffect } from 'react';

/**
 * Custom hook to manage saved itineraries in localStorage
 */
export const useTrips = () => {
  const [trips, setTrips] = useState([]);

  // Load saved trips from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('tripgenius_saved_trips');
    if (saved) {
      try {
        setTrips(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse saved trips from localStorage", e);
        setTrips([]);
      }
    }
  }, []);

  // Save trips to state and localStorage
  const saveTripsList = (updatedTrips) => {
    setTrips(updatedTrips);
    localStorage.setItem('tripgenius_saved_trips', JSON.stringify(updatedTrips));
  };

  /**
   * Save a generated trip itinerary
   * @param {string} destination - Trip destination name
   * @param {Object} formData - Details used to generate the trip
   * @param {Object} itineraryData - The actual Gemini JSON response
   */
  const saveTrip = (destination, formData, itineraryData) => {
    const newTrip = {
      id: crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(36).substring(2, 11),
      createdAt: new Date().toISOString(),
      destination,
      formData,
      itineraryData
    };
    
    // Add to top of the list
    const updated = [newTrip, ...trips];
    saveTripsList(updated);
    return newTrip;
  };

  /**
   * Delete a saved trip by ID
   * @param {string} id - The trip ID to remove
   */
  const deleteTrip = (id) => {
    const updated = trips.filter(trip => trip.id !== id);
    saveTripsList(updated);
  };

  return {
    trips,
    saveTrip,
    deleteTrip
  };
};

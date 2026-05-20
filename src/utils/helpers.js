/**
 * Capitalizes each word in a string (title case)
 * @param {string} str - The string to capitalize
 * @returns {string} Title-cased string
 */
export const capitalize = (str) => {
  if (!str) return '';
  return str.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' ');
};

/**
 * Generates a Google Maps search URL for a given place and destination
 * @param {string} place - The place or attraction name
 * @param {string} destination - The city or country of the trip
 * @returns {string} Google Maps search URL
 */
export const getMapsLink = (place, destination) => {
  if (!place) return '';
  const query = `${place} ${destination || ''}`.trim();
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
};

/**
 * Generates a Google Maps embed URL for iframe previews
 * @param {string} place - The place or attraction name
 * @param {string} destination - The city or country of the trip
 * @returns {string} Google Maps embed URL
 */
export const getGoogleMapsEmbedUrl = (place, destination = '') => {
  if (!place) return '';
  const query = encodeURIComponent(`${place} ${destination}`.trim());
  return `https://www.google.com/maps?q=${query}&output=embed`;
};

/**
 * Formats a budget number into the specified currency
 * @param {number} amount - The amount to format
 * @param {string} currency - The currency code (default: INR)
 * @returns {string} Formatted currency string
 */
export const formatCurrency = (amount, currency = 'INR') => {
  if (amount === undefined || amount === null || isNaN(amount)) return '';
  try {
    return new Intl.NumberFormat(currency === 'INR' ? 'en-IN' : 'en-US', {
      style: 'currency',
      currency: currency,
      maximumFractionDigits: 0
    }).format(amount);
  } catch (e) {
    return `${currency} ${amount}`;
  }
};

/**
 * Simple interest label mapping
 */
export const INTEREST_LABELS = {
  adventure: 'Adventure 🧗',
  culture: 'Culture 🏛️',
  food: 'Food & Culinary 🍜',
  nature: 'Nature & Parks 🌳',
  shopping: 'Shopping 🛍️',
  nightlife: 'Nightlife 🌌',
  wellness: 'Wellness & Spa 🧘'
};

/**
 * Month mappings
 */
export const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

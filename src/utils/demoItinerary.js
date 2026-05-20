/**
 * A realistic demo itinerary for Jaipur (3 days, Mid-range, Couple).
 * Used as a graceful fallback when all Gemini models are unavailable.
 */
export const DEMO_FORM_DATA = {
  destination: "Jaipur",
  startingCity: "Delhi",
  numDays: 3,
  budgetType: "Mid-range",
  budgetAmount: 25000,
  travelStyle: "Couple",
  interests: ["Culture", "Food", "Shopping"],
  month: "October",
};

export const DEMO_ITINERARY = {
  tripSummary:
    "Jaipur, the Pink City, offers a magical blend of royal palaces, vibrant bazaars, and Rajasthani culinary traditions — perfect for a romantic mid-range getaway focused on culture, food, and shopping.",
  highlights: [
    "Explore the iconic Amber Fort with panoramic views of Maota Lake",
    "Stroll through the colorful lanes of Johari Bazaar for traditional jewelry",
    "Savour authentic Dal Baati Churma at a rooftop restaurant overlooking Hawa Mahal",
  ],
  bestTimeToVisit:
    "October to March — pleasant weather (18–28 °C), ideal for walking tours and outdoor sightseeing.",
  transitOptions: [
    {
      type: "Train",
      name: "Ajmer Shatabdi Express 12015",
      duration: "4h 30m",
      costRange: "₹800 – ₹1,800",
      frequency: "Daily",
      bookingTip:
        "Book Chair Car (CC) on IRCTC at least 3 days in advance for confirmed seats.",
    },
    {
      type: "Flight",
      name: "IndiGo / Air India (DEL → JAI)",
      duration: "1h 05m",
      costRange: "₹3,000 – ₹5,500",
      frequency: "Multiple daily",
      bookingTip:
        "Early-morning flights are cheapest. Book 2 weeks ahead for best fares.",
    },
    {
      type: "Bus",
      name: "RSRTC Volvo / Rajasthan Roadways",
      duration: "5h 30m",
      costRange: "₹600 – ₹1,200",
      frequency: "Every 30 min",
      bookingTip:
        "Volvo AC buses depart from Kashmere Gate ISBT. Book on RedBus or RSRTC website.",
    },
  ],
  itinerary: [
    {
      day: 1,
      theme: "Royal Heritage & Old City Charm",
      morning: {
        activity: "Visit the majestic Amber Fort and enjoy an elephant-free heritage walk",
        place: "Amber Fort",
        duration: "3 hours",
        tip: "Arrive by 9 AM to avoid crowds and get the best light for photos.",
      },
      afternoon: {
        activity: "Explore Hawa Mahal and the bustling streets of the Pink City",
        place: "Hawa Mahal",
        duration: "3 hours",
        tip: "Visit the interior museum — the top floor offers the best window-frame views.",
      },
      evening: {
        activity: "Traditional Rajasthani Thali dinner with live folk music",
        place: "Chokhi Dhani",
        duration: "3 hours",
        tip: "Book the village-experience package for a fully immersive cultural evening.",
      },
      accommodation: {
        name: "Hotel Pearl Palace",
        type: "Heritage Hotel",
        priceRange: "₹2,500 – ₹3,500 per night",
      },
    },
    {
      day: 2,
      theme: "Palaces, Gardens & Local Flavours",
      morning: {
        activity: "Tour the opulent City Palace and its stunning courtyards",
        place: "City Palace Jaipur",
        duration: "2.5 hours",
        tip: "The Mubarak Mahal courtyard is the most photogenic spot — visit first.",
      },
      afternoon: {
        activity: "Relax at Jal Mahal lakeside and visit Nahargarh Fort for sunset",
        place: "Nahargarh Fort",
        duration: "4 hours",
        tip: "Carry water and wear comfortable shoes — the climb is moderate but worth every step.",
      },
      evening: {
        activity: "Street-food crawl through Johari Bazaar and Bapu Bazaar",
        place: "Johari Bazaar",
        duration: "2.5 hours",
        tip: "Try the famous Rawat Mishthan Bhandar kachori — locals swear by it.",
      },
      accommodation: {
        name: "Hotel Pearl Palace",
        type: "Heritage Hotel",
        priceRange: "₹2,500 – ₹3,500 per night",
      },
    },
    {
      day: 3,
      theme: "Art, Shopping & Farewell",
      morning: {
        activity: "Visit Jantar Mantar and Albert Hall Museum for science and art",
        place: "Jantar Mantar Jaipur",
        duration: "2.5 hours",
        tip: "Jantar Mantar is a UNESCO site — the Samrat Yantra (giant sundial) is the highlight.",
      },
      afternoon: {
        activity: "Shopping for blue pottery, textiles, and gemstones at local markets",
        place: "MI Road & Tripolia Bazaar",
        duration: "3 hours",
        tip: "Bargain firmly — starting at 50 % of the quoted price is standard practice.",
      },
      evening: {
        activity: "Farewell dinner at a rooftop café with views of the illuminated city",
        place: "Wind View Café",
        duration: "2 hours",
        tip: "Request a corner table facing Hawa Mahal for the best night-lit panorama.",
      },
      accommodation: {
        name: "Checkout day — no overnight stay",
        type: "N/A",
        priceRange: "N/A",
      },
    },
  ],
  topAttractions: [
    {
      name: "Amber Fort",
      description: "A sprawling hilltop fort blending Hindu and Mughal architecture with stunning lake views.",
      entryFee: "₹200 (Indian), ₹500 (Foreign)",
      bestTime: "8:30 AM – 11 AM",
    },
    {
      name: "Hawa Mahal",
      description: "The iconic 'Palace of Winds' with 953 small windows designed for royal women to observe city life.",
      entryFee: "₹50 (Indian), ₹200 (Foreign)",
      bestTime: "9 AM – 11 AM (best morning light for photos)",
    },
    {
      name: "City Palace Jaipur",
      description: "A magnificent complex of courtyards, gardens, and buildings showcasing Rajput-Mughal fusion.",
      entryFee: "₹200 (Indian), ₹700 (Foreign)",
      bestTime: "10 AM – 1 PM",
    },
    {
      name: "Nahargarh Fort",
      description: "Perched on Aravalli hills, this fort offers the best panoramic sunset views of the Pink City.",
      entryFee: "₹50 (Indian), ₹200 (Foreign)",
      bestTime: "4 PM – 6:30 PM (sunset)",
    },
    {
      name: "Jantar Mantar Jaipur",
      description: "UNESCO World Heritage astronomical observation site with the world's largest stone sundial.",
      entryFee: "₹50 (Indian), ₹200 (Foreign)",
      bestTime: "9 AM – 12 PM",
    },
  ],
  foodSuggestions: [
    { dish: "Dal Baati Churma", where: "Chokhi Dhani or Laxmi Misthan Bhandar", priceRange: "Moderate" },
    { dish: "Pyaaz Kachori", where: "Rawat Mishthan Bhandar", priceRange: "Cheap" },
    { dish: "Laal Maas", where: "Handi Restaurant", priceRange: "Moderate" },
    { dish: "Ghewar", where: "Lakshmi Mishthan Bhandar (LMB)", priceRange: "Cheap" },
    { dish: "Kulfi Falooda", where: "Pandit Kulfi near Hawa Mahal", priceRange: "Cheap" },
  ],
  budgetBreakdown: {
    accommodation: 7000,
    food: 5000,
    transport: 5000,
    activities: 4000,
    misc: 4000,
    total: 25000,
    currency: "INR",
  },
  packingList: [
    "Comfortable walking shoes",
    "Sunscreen and sunglasses (Rajasthan sun is strong)",
    "Light cotton clothes (Oct weather is warm)",
    "Power bank and camera",
    "Reusable water bottle",
    "Light dupatta/scarf for temple visits",
  ],
  travelTips: [
    "Auto-rickshaw fares should be negotiated before boarding — use Google Maps distance as leverage.",
    "Carry small denominations (₹10, ₹20) for street food and tips.",
    "Avoid visiting forts during peak afternoon heat (12–3 PM).",
    "Download offline Google Maps for Jaipur before departure.",
  ],
  emergencyContacts: {
    police: "100",
    ambulance: "108",
    touristHelpline: "1363",
  },
};

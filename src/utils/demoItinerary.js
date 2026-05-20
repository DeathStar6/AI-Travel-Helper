/**
 * A realistic but dynamic demo itinerary generator.
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

export function createDemoTripPlan(formData) {
  const dest = formData.destination || "your destination";
  const start = formData.startingCity || "your starting point";
  const days = formData.numDays || 3;
  const budget = formData.budgetType || "Mid-range";
  const style = formData.travelStyle || "Couple";
  const month = formData.month || "October";
  const interests = formData.interests && formData.interests.length > 0 
    ? formData.interests.join(", ") 
    : "Sightseeing";

  const itinerary = [];
  
  for (let i = 1; i <= days; i++) {
    itinerary.push({
      day: i,
      theme: `Discovering ${dest} - Day ${i}`,
      morning: {
        activity: `Explore famous heritage landmarks in ${dest}`,
        place: `${dest} Heritage Area`,
        duration: "3 hours",
        tip: `Start early to beat the crowds at popular ${dest} spots.`,
      },
      afternoon: {
        activity: `Enjoy the local culture and vibrant streets of ${dest}`,
        place: `${dest} City Center`,
        duration: "4 hours",
        tip: "Wear comfortable walking shoes for city exploration.",
      },
      evening: {
        activity: `Experience the evening charm and dinner in ${dest}`,
        place: `${dest} Popular Food Street`,
        duration: "3 hours",
        tip: "Try popular local dishes at a highly-rated local restaurant.",
      },
      accommodation: {
        name: `${dest} ${budget === 'Luxury' ? 'Grand Hotel' : budget === 'Mid-range' ? 'Boutique Hotel' : 'Backpacker Hostel'}`,
        type: budget === 'Luxury' ? 'Resort' : budget === 'Mid-range' ? 'Hotel' : 'Hostel',
        priceRange: budget === 'Luxury' ? '₹8,000 – ₹15,000' : budget === 'Mid-range' ? '₹3,000 – ₹5,000' : '₹800 – ₹1,500',
      },
    });
  }

  // Adjust accommodation for last day
  if (itinerary.length > 0) {
    itinerary[itinerary.length - 1].accommodation = {
      name: "Checkout day — no overnight stay",
      type: "N/A",
      priceRange: "N/A",
    };
  }

  let totalBudget = 25000;
  let accCost = 7000;
  let foodCost = 5000;
  let transCost = 5000;
  let actCost = 4000;
  let miscCost = 4000;

  if (budget === 'Luxury') {
    totalBudget = 75000; accCost = 35000; foodCost = 15000; transCost = 10000; actCost = 10000; miscCost = 5000;
  } else if (budget === 'Budget') {
    totalBudget = 10000; accCost = 3000; foodCost = 2500; transCost = 2000; actCost = 1500; miscCost = 1000;
  }

  return {
    tripSummary: `A magical ${days}-day ${budget} getaway to ${dest} designed for a ${style}. Enjoy a perfect blend of ${interests} during the lovely month of ${month}.`,
    highlights: [
      `Visit iconic landmarks and scenic viewpoints around ${dest}`,
      `Immerse yourself in the local culture and try regional delicacies`,
      `Explore vibrant local markets and popular shopping streets`
    ],
    bestTimeToVisit: `${month} is a wonderful time to visit ${dest} for comfortable sightseeing and outdoor activities.`,
    transitOptions: [
      {
        type: "Flight",
        name: `Airlines (${start} → ${dest})`,
        duration: "2h 00m",
        costRange: "₹4,000 – ₹8,000",
        frequency: "Multiple daily",
        bookingTip: "Book 2-3 weeks in advance for the best fares.",
      },
      {
        type: "Train",
        name: `Express Train to ${dest}`,
        duration: "6h 30m",
        costRange: "₹1,000 – ₹2,500",
        frequency: "Daily",
        bookingTip: "Book AC classes early on IRCTC or equivalent for a comfortable journey.",
      },
      {
        type: "Bus",
        name: `AC Volvo Bus / Roadways to ${dest}`,
        duration: "8h 00m",
        costRange: "₹800 – ₹1,500",
        frequency: "Every few hours",
        bookingTip: "Great for overnight travel. Book via RedBus or local state transport websites.",
      },
    ],
    itinerary,
    topAttractions: [
      {
        name: `${dest} Heritage Area`,
        description: `A historic zone featuring the most iconic architectural marvels of ${dest}.`,
        entryFee: "Varies",
        bestTime: "Morning",
        type: "Culture"
      },
      {
        name: `${dest} City Center`,
        description: `The bustling heart of the city with endless shopping, cafes, and street culture.`,
        entryFee: "Free",
        bestTime: "Late Afternoon",
        type: "Shopping"
      },
      {
        name: `${dest} Scenic Viewpoint`,
        description: `The best place to capture panoramic views and breathtaking sunsets in ${dest}.`,
        entryFee: "Minimal",
        bestTime: "Evening / Sunset",
        type: "Nature"
      },
    ],
    foodSuggestions: [
      { dish: `Local ${dest} Specialty`, where: `${dest} Popular Food Street`, priceRange: "Moderate" },
      { dish: "Famous Street Food Snack", where: "Local Night Market", priceRange: "Cheap" },
      { dish: "Authentic Regional Thali", where: "Highly Rated Traditional Restaurant", priceRange: "Moderate" },
    ],
    budgetBreakdown: {
      accommodation: accCost,
      food: foodCost,
      transport: transCost,
      activities: actCost,
      misc: miscCost,
      total: totalBudget,
      currency: "INR",
    },
    packingList: [
      "Comfortable walking shoes",
      "Weather-appropriate clothing",
      "Power bank and camera",
      "Reusable water bottle",
      "Basic first-aid kit",
    ],
    travelTips: [
      `Use local ride-hailing apps or negotiate transport fares upfront in ${dest}.`,
      "Download offline Google Maps for easy navigation.",
      "Carry some local currency for small purchases at street markets.",
      `Ask locals for their favorite hidden gems in ${dest}.`,
    ],
    emergencyContacts: {
      police: "100",
      ambulance: "108",
      touristHelpline: "1363",
    },
  };
}

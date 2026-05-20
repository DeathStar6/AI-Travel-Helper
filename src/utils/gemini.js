import { GoogleGenerativeAI } from "@google/generative-ai";

/**
 * Generates a travel itinerary from Gemini API
 * @param {Object} formData - Form input values
 * @param {string} apiKey - Optional manual API key override
 * @returns {Promise<Object>} Generated itinerary JSON object
 */
export const generateTravelItinerary = async (formData, apiKey) => {
  const activeKey = apiKey || import.meta.env.VITE_GEMINI_API_KEY;

  if (!activeKey) {
    throw new Error("API_KEY_MISSING");
  }

  try {
    const genAI = new GoogleGenerativeAI(activeKey);
    // Use gemini-3.5-flash for fast and cost-effective text generation
    const model = genAI.getGenerativeModel({
      model: "gemini-3.5-flash",
      generationConfig: {
        responseMimeType: "application/json",
      },
    });

    const interestsString = formData.interests && formData.interests.length > 0 
      ? formData.interests.join(", ") 
      : "General Sightseeing";

    const prompt = `
Generate a detailed travel itinerary for a trip to ${formData.destination} starting from ${formData.startingCity || 'their starting location'}.
Trip parameters:
- Duration: ${formData.numDays} days
- Budget Category: ${formData.budgetType} (Approximate target total budget: ${formData.budgetAmount} INR)
- Travel Style: ${formData.travelStyle}
- Interests: ${interestsString}
- Month of travel: ${formData.month}

Respond strictly with a single JSON object matching this structure:
{
  "tripSummary": "A concise overview of what makes this trip special for a ${formData.travelStyle} trip focused on ${interestsString}",
  "highlights": ["highlight 1", "highlight 2", "highlight 3"],
  "bestTimeToVisit": "Best months/season to visit with brief reason why",
  "itinerary": [
    {
      "day": 1,
      "theme": "Theme of the day",
      "morning": { "activity": "Specific morning activity", "place": "Specific landmark/place name", "duration": "e.g., 3 hours", "tip": "Insider tip for morning" },
      "afternoon": { "activity": "Specific afternoon activity", "place": "Specific landmark/place name", "duration": "e.g., 4 hours", "tip": "Insider tip for afternoon" },
      "evening": { "activity": "Specific evening activity", "place": "Specific landmark/place name", "duration": "e.g., 2 hours", "tip": "Insider tip for evening" },
      "accommodation": { "name": "Recommended hotel/hostel/resort name fitting the ${formData.budgetType} budget", "type": "Hotel / Hostel / Resort / AirBnb", "priceRange": "Price range per night in INR" }
    }
  ],
  "topAttractions": [
    { "name": "Attraction Name", "description": "Brief description of why it's worth visiting", "entryFee": "Estimated entry fee or 'Free'", "bestTime": "Best hours to visit" }
  ],
  "foodSuggestions": [
    { "dish": "Local dish name", "where": "Recommended restaurant or food street", "priceRange": "Cheap / Moderate / Expensive" }
  ],
  "budgetBreakdown": {
    "accommodation": estimated accommodation cost in INR as number,
    "food": estimated food cost in INR as number,
    "transport": estimated transport cost in INR as number,
    "activities": estimated activities cost in INR as number,
    "misc": estimated miscellaneous cost in INR as number,
    "total": estimated total cost in INR as number (should sum up the above items and fit within or close to the target budget of ${formData.budgetAmount} INR),
    "currency": "INR"
  },
  "packingList": ["item 1", "item 2", "item 3"],
  "travelTips": ["tip 1", "tip 2", "tip 3"],
  "emergencyContacts": {
    "police": "local police phone number",
    "ambulance": "local medical emergency number",
    "touristHelpline": "tourist support helpline number"
  }
}

Important Instructions:
1. Provide realistic and accurate place names so the user can look them up on Google Maps.
2. The itinerary array MUST have exactly ${formData.numDays} items, one for each day.
3. The budgetBreakdown total must be the sum of accommodation, food, transport, activities, and misc. All these values must be integers.
4. Do not include any markdown styling wrappers like \`\`\`json. Return a pure JSON string.
`;

    const result = await model.generateContent({
      contents: [{ role: "user", parts: [{ text: prompt }] }],
      systemInstruction: "You are an expert AI Travel Planner. Always respond in valid, strict JSON format matching the schema requested. Never include text outside the JSON object.",
    });

    const responseText = result.response.text();
    
    // Safely parse JSON response
    try {
      const parsedData = JSON.parse(responseText);
      return parsedData;
    } catch (parseError) {
      console.error("Failed to parse JSON response from Gemini:", responseText);
      throw new Error("INVALID_JSON_RESPONSE");
    }
  } catch (error) {
    console.error("Gemini API generation error:", error);
    if (error.message === "API_KEY_MISSING" || error.message === "INVALID_JSON_RESPONSE") {
      throw error;
    }
    // Propagate the actual error message
    throw new Error(error.message || "NETWORK_OR_API_ERROR");
  }
};

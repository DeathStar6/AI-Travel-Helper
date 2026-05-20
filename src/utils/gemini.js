import { GoogleGenerativeAI } from "@google/generative-ai";

/**
 * Ordered list of models to try. The first available model wins.
 * gemini-2.0-flash  → primary (fast, free-tier friendly)
 * gemini-1.5-flash  → fallback 1
 * gemini-1.5-flash-8b → fallback 2 (smallest, highest quota headroom)
 */
const MODEL_CHAIN = [
  "gemini-3.5-flash",
  "gemini-1.5-flash-8b",
  "gemini-2.0-flash",
  "gemini-1.5-flash",
];

/**
 * Returns true when the error is a retryable server, quota, or model configuration/support error.
 * For robust hackathon fallback, we want to try the next model on any 503, 429, 404 or network errors.
 */
function isRetryableError(error) {
  const msg = (error?.message || "").toLowerCase();
  return (
    msg.includes("503") ||
    msg.includes("429") ||
    msg.includes("404") ||
    msg.includes("not found") ||
    msg.includes("supported") ||
    msg.includes("overloaded") ||
    msg.includes("high demand") ||
    msg.includes("quota") ||
    msg.includes("rate limit") ||
    msg.includes("resource exhausted") ||
    msg.includes("unavailable") ||
    msg.includes("fetch")
  );
}

/**
 * Build the prompt once; reused across retries.
 */
function buildPrompt(formData) {
  const interestsString =
    formData.interests && formData.interests.length > 0
      ? formData.interests.join(", ")
      : "General Sightseeing";

  return `
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
  "transitOptions": [
    {
      "type": "Flight / Train / Bus / Drive",
      "name": "Name of service or route details (e.g., Shatabdi Express 12002, IndiGo 6E-241)",
      "duration": "Estimated duration (e.g., 4h 30m)",
      "costRange": "Estimated cost in INR (e.g., ₹1,200 - ₹2,500)",
      "frequency": "e.g., Daily, Hourly, Weekly",
      "bookingTip": "Useful tip for booking or boarding"
    }
  ],
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
}

/**
 * Try a single model. Returns parsed JSON on success, throws on failure.
 */
async function tryModel(genAI, modelName, prompt) {
  console.log(`[TripGenius] Trying model: ${modelName}`);
  const model = genAI.getGenerativeModel({
    model: modelName,
    generationConfig: {
      responseMimeType: "application/json",
    },
  });

  const result = await model.generateContent({
    contents: [{ role: "user", parts: [{ text: prompt }] }],
    systemInstruction:
      "You are an expert AI Travel Planner. Always respond in valid, strict JSON format matching the schema requested. Never include text outside the JSON object.",
  });

  const responseText = result.response.text();
  const parsed = JSON.parse(responseText);
  console.log(`[TripGenius] ✅ Success with model: ${modelName}`);
  return parsed;
}

/**
 * Generates a travel itinerary, automatically cycling through fallback models.
 * @param {Object} formData - Form input values
 * @param {string} apiKey - Optional manual API key override
 * @returns {Promise<Object>} Generated itinerary JSON object
 */
export const generateTravelItinerary = async (formData, apiKey) => {
  const activeKey = apiKey || import.meta.env.VITE_GEMINI_API_KEY;

  if (!activeKey) {
    throw new Error("API_KEY_MISSING");
  }

  const genAI = new GoogleGenerativeAI(activeKey);
  const prompt = buildPrompt(formData);
  const errors = [];

  for (const modelName of MODEL_CHAIN) {
    try {
      return await tryModel(genAI, modelName, prompt);
    } catch (err) {
      const msg = err?.message || String(err);
      console.warn(`[TripGenius] ❌ ${modelName} failed: ${msg}`);
      errors.push({ model: modelName, error: msg });

      // Only retry next model on retryable errors (503/429/quota)
      if (!isRetryableError(err)) {
        // Non-retryable error (bad key, invalid JSON, 404, etc.) — surface immediately
        if (msg.includes("JSON") || msg.includes("parse")) {
          throw new Error("INVALID_JSON_RESPONSE");
        }
        throw new Error(msg || "NETWORK_OR_API_ERROR");
      }
      // Otherwise continue to next model in chain
    }
  }

  // All models exhausted
  console.error("[TripGenius] All models exhausted:", errors);
  throw new Error("MODELS_EXHAUSTED");
};

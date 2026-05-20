# TripGenius AI - AI Travel Itinerary Planner

**TripGenius AI** is a premium, polished, and mobile-responsive React + Vite web application that acts as a personalized travel concierge. Built using Tailwind CSS, it leverages the **Google Gemini API** to generate rich, structured travel itineraries, budget breakdowns, local culinary recommendations, packing lists, and safety guidelines.

---

## 🚀 Key Features

1. **Intelligent Travel Form:** Choose destination, starting city, length of stay (1-14 days), travel companions (Solo, Couple, Family, etc.), budget tier (Budget, Mid-range, Luxury), local interests (Adventure, Culture, Food, etc.), and month of travel.
2. **Google Gemini AI Integration:** Leverages `gemini-3.5-flash` in strict JSON mode to build detailed daily plans, including morning, afternoon, and evening slots.
3. **Interactive Timelines & Accordions:** Beautiful responsive cards with expand/collapse options to inspect daily activities.
4. **Google Maps Search Integrations:** Direct links mapping every attraction or point of interest dynamically.
5. **Local Expense Visualizer:** Displays estimated budgets across categories (Accommodation, Food, Transit, Activities, Miscellaneous) with percentage charts.
6. **Smart Library Storage:** Instantly save generated plans to your browser's `localStorage` for offline review. Actions include **View**, **Delete**, and **Copy Summary** (which parses the plan to copy to your clipboard).
7. **Dynamic API Key Manager:** Fallback inputs in the header let users paste their Gemini API key directly into browser cache if environment variables aren't present.

---

## 🛠️ Google Technology Used

* **Google Gemini API (`@google/generative-ai`):** Used to orchestrate structured JSON results. The app utilizes `responseMimeType: "application/json"` with customized system instructions to guarantee a strict JSON output matching the front-end layout requirements.

---

## 💻 Local Setup Steps

Follow these steps to run the project locally:

1. **Install Node.js:** Ensure Node.js (v18+) is installed on your machine.
2. **Clone / Navigate to Project:**
   ```bash
   cd FIEM
   ```
3. **Install Dependencies:**
   ```bash
   npm install
   ```
4. **Set Up Environment Variables:**
   Create a `.env` file in the root directory:
   ```env
   VITE_GEMINI_API_KEY=your_actual_google_gemini_api_key
   ```
   *Note: If no env key is supplied, you can also paste your key directly in the web UI header settings.*

5. **Run the Development Server:**
   ```bash
   npm run dev
   ```
   Open `http://localhost:5173` in your browser.

---

## 🚀 Deployment Steps (Vercel)

TripGenius AI is fully optimized for single-command deployments to **Vercel**:

1. **Create Vercel Project:**
   * Install the Vercel CLI (`npm install -g vercel`) and run `vercel` in the project root, or connect your GitHub repository directly to Vercel.
2. **Configure Environment Variables:**
   * In your Vercel Project Settings, navigate to **Environment Variables**.
   * Add a new environment variable:
     * **Key:** `VITE_GEMINI_API_KEY`
     * **Value:** *Your Google Gemini API Key*
3. **Build Settings:**
   Vercel automatically detects the Vite project structure:
   * **Build Command:** `npm run build`
   * **Output Directory:** `dist`
4. **Deploy:**
   * Deploy by linking your repository or running `vercel --prod`.

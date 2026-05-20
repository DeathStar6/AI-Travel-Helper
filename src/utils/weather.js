/**
 * Helper functions to fetch weather from Open-Meteo API
 */

export async function getCoordinates(destination) {
  try {
    const url = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(destination)}&count=1`;
    const response = await fetch(url);
    if (!response.ok) return null;
    const data = await response.json();
    if (data.results && data.results.length > 0) {
      return {
        latitude: data.results[0].latitude,
        longitude: data.results[0].longitude,
      };
    }
    return null;
  } catch (error) {
    console.error("Geocoding API error:", error);
    return null;
  }
}

export async function getWeatherForecast(destination) {
  try {
    const coords = await getCoordinates(destination);
    if (!coords) return null;

    const { latitude, longitude } = coords;
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&daily=temperature_2m_max,temperature_2m_min,precipitation_probability_max,weather_code&timezone=auto&forecast_days=5`;
    
    const response = await fetch(url);
    if (!response.ok) return null;
    
    const data = await response.json();
    return data.daily;
  } catch (error) {
    console.error("Weather Forecast API error:", error);
    return null;
  }
}

export function getWeatherLabel(weatherCode) {
  // WMO Weather interpretation codes
  if (weatherCode === 0) return { label: "Clear sky", icon: "☀️" };
  if (weatherCode === 1 || weatherCode === 2 || weatherCode === 3) return { label: "Partly cloudy", icon: "⛅" };
  if (weatherCode === 45 || weatherCode === 48) return { label: "Fog", icon: "🌫️" };
  if (weatherCode >= 51 && weatherCode <= 57) return { label: "Drizzle", icon: "🌧️" };
  if (weatherCode >= 61 && weatherCode <= 67) return { label: "Rain", icon: "🌧️" };
  if (weatherCode >= 71 && weatherCode <= 77) return { label: "Snow", icon: "❄️" };
  if (weatherCode >= 80 && weatherCode <= 82) return { label: "Showers", icon: "🌧️" };
  if (weatherCode >= 85 && weatherCode <= 86) return { label: "Snow showers", icon: "❄️" };
  if (weatherCode >= 95 && weatherCode <= 99) return { label: "Thunderstorm", icon: "⛈️" };
  return { label: "Unknown", icon: "🌤️" };
}

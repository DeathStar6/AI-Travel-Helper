import React, { useState, useEffect } from 'react';
import { CloudRain, Thermometer, Cloud } from 'lucide-react';
import { getWeatherForecast, getWeatherLabel } from '../utils/weather';
import { capitalize } from '../utils/helpers';

export default function WeatherCard({ destination }) {
  const [forecast, setForecast] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    let mounted = true;

    async function fetchWeather() {
      setLoading(true);
      setError(false);
      try {
        const data = await getWeatherForecast(destination);
        if (mounted) {
          if (data) {
            setForecast(data);
          } else {
            setError(true);
          }
        }
      } catch (err) {
        if (mounted) setError(true);
      } finally {
        if (mounted) setLoading(false);
      }
    }

    if (destination) {
      fetchWeather();
    }

    return () => {
      mounted = false;
    };
  }, [destination]);

  if (loading) {
    return (
      <div className="glass-panel rounded-3xl p-6 border border-slate-800/80 animate-pulse h-[200px] flex items-center justify-center">
        <div className="text-slate-500 font-medium flex items-center gap-2">
          <Cloud className="w-5 h-5 animate-bounce" />
          Checking weather for {capitalize(destination)}...
        </div>
      </div>
    );
  }

  if (error || !forecast || !forecast.time) {
    return (
      <div className="glass-panel rounded-3xl p-6 border border-slate-800/80 flex items-center justify-center bg-slate-900/20">
        <div className="text-slate-400 font-medium flex items-center gap-2 text-sm">
          <CloudRain className="w-5 h-5 text-slate-500" />
          Weather unavailable right now for {capitalize(destination)}.
        </div>
      </div>
    );
  }

  return (
    <div className="glass-panel rounded-3xl p-6 border border-slate-800/80 space-y-4">
      <h3 className="text-base font-bold text-slate-100 font-display flex items-center gap-2">
        <CloudRain className="w-5 h-5 text-sky-400" />
        5-Day Forecast for {capitalize(destination)}
      </h3>
      
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
        {forecast.time.slice(0, 5).map((dateString, index) => {
          const date = new Date(dateString);
          const dayName = index === 0 ? 'Today' : date.toLocaleDateString('en-US', { weekday: 'short' });
          const { label, icon } = getWeatherLabel(forecast.weather_code[index]);
          const tempMax = Math.round(forecast.temperature_2m_max[index]);
          const tempMin = Math.round(forecast.temperature_2m_min[index]);
          const rainChance = forecast.precipitation_probability_max[index];

          return (
            <div key={index} className="p-3 rounded-2xl bg-slate-900/40 border border-slate-800/80 hover:border-slate-705 transition-all flex flex-col items-center justify-between text-center gap-2 h-full">
              <span className="text-[11px] font-bold text-slate-300 uppercase tracking-wider">{dayName}</span>
              
              <div className="text-2xl my-1" title={label}>{icon}</div>
              
              <div className="w-full space-y-1.5">
                <div className="flex justify-between items-center text-[11px] font-semibold">
                  <span className="text-rose-400" title="Max Temp">{tempMax}°</span>
                  <span className="text-sky-400" title="Min Temp">{tempMin}°</span>
                </div>
                
                <div className="flex items-center justify-center gap-1 text-[10px] text-slate-400 font-medium bg-slate-950/30 rounded-full py-0.5">
                  <CloudRain className="w-3 h-3 text-sky-500/70" />
                  {rainChance}%
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

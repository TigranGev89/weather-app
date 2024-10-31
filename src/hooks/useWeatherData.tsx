import { useState, useEffect, useCallback } from 'react';
import { WeatherData, ProcessedWeatherData } from '../types/weather';

const API_URI = import.meta.env.VITE_API_URI;
const API_KEY = import.meta.env.VITE_API_KEY;

export const useWeatherData = (city: string, unit: 'metric' | 'imperial') => {
  const [weather, setWeather] = useState<ProcessedWeatherData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchWeatherData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `${API_URI}?q=${city}&units=${unit}&appid=${API_KEY}`
      );

      if (!response.ok) {
        throw new Error('Failed to fetch weather data');
      }

      const data = await response.json();
      const currentWeather: WeatherData = data.list[0];
      const hourlyForecast: WeatherData[] = data.list.slice(0, 8);
      const dailyForecast: WeatherData[] = data.list.filter((_: WeatherData, index: number) => index % 8 === 0);

      setWeather({ currentWeather, hourlyForecast, dailyForecast });
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  }, [city, unit]);

  useEffect(() => {
    fetchWeatherData();
  }, [fetchWeatherData]);

  return { weather, loading, error };
};

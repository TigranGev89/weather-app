import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { WeatherData, ProcessedWeatherData } from '../types/weather';

const API_URI = import.meta.env.VITE_API_URI;
const API_KEY = import.meta.env.VITE_API_KEY;

export interface WeatherApiResponse {
  list: WeatherData[];
}

export const weatherApi = createApi({
  reducerPath: 'weatherApi',
  baseQuery: fetchBaseQuery({ baseUrl: API_URI }),
  endpoints: (builder) => ({
    getWeatherData: builder.query<ProcessedWeatherData, { city: string; unit: 'metric' | 'imperial' }>({
      query: ({ city, unit }) => `?q=${city}&units=${unit}&appid=${API_KEY}`,
      transformResponse: (response: WeatherApiResponse): ProcessedWeatherData => {
        const currentWeather: WeatherData = response.list[0];
        const hourlyForecast: WeatherData[] = response.list.slice(0, 8);
        const dailyForecast: WeatherData[] = response.list.filter((_: WeatherData, index: number) => index % 8 === 0);

        return { currentWeather, hourlyForecast, dailyForecast };
      },
    }),
  }),
});

export const { useGetWeatherDataQuery } = weatherApi;

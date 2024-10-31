export interface WeatherData {
  dt: number;
  dt_txt: string;
  main: {
    temp: number;
  };
  weather: {
    description: string;
    icon: string;
  }[];
}

export interface ProcessedWeatherData {
  currentWeather: WeatherData;
  hourlyForecast: WeatherData[];
  dailyForecast: WeatherData[];
}

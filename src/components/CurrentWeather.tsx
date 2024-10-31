import React from 'react';

interface CurrentWeatherProps {
  city: string;
  temperature: number;
  description: string;
  icon: string;
  unit: 'metric' | 'imperial';
}

const CurrentWeather: React.FC<CurrentWeatherProps> = ({ city, temperature, description, icon, unit }) => (
  <div className="current-weather">
    <h2>{city}</h2>
    <h3>{Math.round(temperature)}°{unit === 'metric' ? 'C' : 'F'}</h3>
    <img src={`http://openweathermap.org/img/wn/${icon}.png`} alt={description} />
    <p>{description}</p>
  </div>
);

export default CurrentWeather;

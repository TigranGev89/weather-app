import { format } from 'date-fns';
import React from 'react';

interface HourlyForecastProps {
  data: {
    time: string;
    temperature: number;
    icon: string;
    description: string;
  }[];
  unit: 'metric' | 'imperial';
}

const HourlyForecast: React.FC<HourlyForecastProps> = ({ data, unit }) => (
  <div className="hourly-forecast">
    {data.map((hour, index) => (
      <div key={index} className="hour">
        <p>{format(new Date(`1970-01-01T${hour.time}`), 'HH:mm')}</p>
        <p>{Math.round(hour.temperature)}°{unit === 'metric' ? 'C' : 'F'}</p>
        <img src={`http://openweathermap.org/img/wn/${hour.icon}.png`} alt={hour.description} />
      </div>
    ))}
  </div>
);

export default HourlyForecast;

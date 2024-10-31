import React from 'react';

interface DailyForecastProps {
  data: {
    date: string;
    temperature: number;
    icon: string;
    description: string;
  }[];
  unit: 'metric' | 'imperial';
  selectedDayIndex: number;
  onDaySelect: (index: number) => void;
}

const DailyForecast: React.FC<DailyForecastProps> = ({ data, unit, selectedDayIndex, onDaySelect }) => (
  <div className="daily-forecast">
    {data.map((day, index) => (
      <div
        key={index}
        className={`day ${index === selectedDayIndex ? 'active' : ''}`}
        onClick={() => onDaySelect(index)}
      >
        <p>{day.date}</p>
        <p>{Math.round(day.temperature)}°{unit === 'metric' ? 'C' : 'F'}</p>
        <img src={`http://openweathermap.org/img/wn/${day.icon}.png`} alt={day.description} />
      </div>
    ))}
  </div>
);

export default DailyForecast;

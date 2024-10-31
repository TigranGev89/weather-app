import React, { useState } from 'react';
import { useWeatherData } from '../hooks/useWeatherData';
import CurrentWeather from '../components/CurrentWeather';
import HourlyForecast from '../components/HourlyForecast';
import DailyForecast from '../components/DailyForecast';
import Spinner from '../components/Spinner';


const App: React.FC = () => {
const [inputCity, setInputCity] = useState<string>('Yerevan');
  const [city, setCity] = useState<string>('Yerevan'); 
  const [unit, setUnit] = useState<'metric' | 'imperial'>('metric');
  const [selectedDayIndex, setSelectedDayIndex] = useState<number>(0);

  const { weather, loading, error } = useWeatherData(city, unit);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputCity(e.target.value);
  };

  const handleSearch = () => {
    setCity(inputCity);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handleUnitChange = () => {
    setUnit((prevUnit) => (prevUnit === 'metric' ? 'imperial' : 'metric'));
  };

  const handleDaySelection = (index: number) => {
    setSelectedDayIndex(index);
  };

  return (
    <div className="weather-dashboard">
      <header className="navbar">
				<div className="search-container">
        <input
          type="text"
          placeholder="Search City"
          value={inputCity}
          onChange={handleSearchChange}
          onKeyDown={handleKeyDown}
          className="search-bar"
        />
        <button onClick={handleSearch} className="search-button">Search</button>
				</div>
        <div className="unit-toggle">
					<input
						type="checkbox"
						id="unit-toggle"
						checked={unit === 'imperial'}
						onChange={handleUnitChange}
					/>
					<label
						htmlFor="unit-toggle"
						className={unit === 'metric' ? 'active' : ''}
						onClick={() => setUnit('metric')}
					>
						°C
					</label>
					<label
						htmlFor="unit-toggle"
						className={unit === 'imperial' ? 'active' : ''}
						onClick={() => setUnit('imperial')}
					>
						°F
					</label>
				</div>
      </header>

      {loading && <Spinner />} 

      {error && <p className="error-message"> {error}</p>} 

      {!loading && !error && weather &&  (
        <main className="content">
          <div className="weather-overview">
            <CurrentWeather
              city={city}
              temperature={weather.dailyForecast[selectedDayIndex].main.temp}
              description={weather.dailyForecast[selectedDayIndex].weather[0].description}
              icon={weather.dailyForecast[selectedDayIndex].weather[0].icon}
              unit={unit}
            />
            <HourlyForecast
              data={weather.hourlyForecast.map(forecast => ({
                time: forecast.dt_txt.split(' ')[1],
                temperature: forecast.main.temp,
                icon: forecast.weather[0].icon,
                description: forecast.weather[0].description,
              }))}
              unit={unit}
            />
          </div>
          <DailyForecast
            data={weather.dailyForecast.map(forecast => ({
              date: forecast.dt_txt.split(' ')[0],
              temperature: forecast.main.temp,
              icon: forecast.weather[0].icon,
              description: forecast.weather[0].description,
            }))}
            unit={unit}
            selectedDayIndex={selectedDayIndex}
            onDaySelect={handleDaySelection}
          />
        </main>
      )}
    </div>
  );
};

export default App;


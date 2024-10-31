import React from 'react';

interface NavbarProps {
  city: string;
  onCityChange: (city: string) => void;
  unit: 'metric' | 'imperial';
  onUnitChange: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ city, onCityChange, unit, onUnitChange }) => {
  return (
    <header className="navbar">
      <input
        type="text"
        placeholder="Search City"
        value={city}
        onChange={(e) => onCityChange(e.target.value)}
        className="search-bar"
      />
      <button>Search</button>
      <div className="unit-toggle">
        <span>°C</span>
        <input
          type="checkbox"
          checked={unit === 'imperial'}
          onChange={onUnitChange}
        />
        <span>°F</span>
      </div>
    </header>
  );
};

export default Navbar;

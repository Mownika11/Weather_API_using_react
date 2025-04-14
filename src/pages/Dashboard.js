import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Dashboard() {
  const [weather, setWeather] = useState(null);
  const [city, setCity] = useState('Chennai'); // Default city
  const [query, setQuery] = useState('');

  const fetchWeather = async (cityName) => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=694522a57e72df9d3bde7d08012a56a7`
      );
      setWeather(response.data);
    } catch (error) {
      setWeather(null);
      alert('City not found. Please try again.');
    }
  };

  useEffect(() => {
    fetchWeather(city);
  }, [city]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim() !== '') {
      setCity(query);
      setQuery('');
    }
  };

  return (
    <div className="dashboard-container">
      <h1>Dashboard</h1>
      <form onSubmit={handleSearch} className="search-form">
        <input
          type="text"
          placeholder="Search city"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button type="submit">Get Weather</button>
      </form>

      {weather ? (
        <div className="weather-box">
          <h3>{weather.name}</h3>
          <p>{weather.weather[0].description}</p>
          <p>🌡️ {weather.main.temp}°C</p>
        </div>
      ) : (
        <p>Loading weather data...</p>
      )}
    </div>
  );
}

export default Dashboard;

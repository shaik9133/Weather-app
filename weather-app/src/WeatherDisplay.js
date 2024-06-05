// src/WeatherDisplay.js
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const WeatherDisplay = ({ lat, lon, unit }) => {
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWeatherData = async () => {
      const apiKey = 'c59613ab41c4fa5677beda19a6ffbc58'; // Ensure this key is secured in an env variable
      try {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=${unit}&appid=${apiKey}`
        );
        console.log(':: Response ::', response);
        if (!response.ok) {
          throw new Error('Failed to fetch weather data');
        }
        const data = await response.json();
        setWeatherData(data);
        setError(null); // Clear any previous errors
      } catch (error) {
        setError(error.message);
      }
    };

    fetchWeatherData();
  }, [lat, lon, unit]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!weatherData) {
    return <div>Loading weather data...</div>;
  }

  const { main, weather, wind } = weatherData;
  const iconUrl = `http://openweathermap.org/img/wn/${weather[0].icon}@2x.png`;

  return (
    <div>
      <h3>Weather Information</h3>
      <img src={iconUrl} alt={weather[0].description} />
      <p>
        Temperature: {main.temp}°{unit === 'metric' ? 'C' : 'F'}
      </p>
      <p>Condition: {weather[0].description}</p>
      <p>Humidity: {main.humidity}%</p>
      <p>
        Wind Speed: {wind.speed} {unit === 'metric' ? 'm/s' : 'mph'}
      </p>
      <p>
        Chance of Rain: {weatherData.rain ? `${weatherData.rain['1h']}%` : '0%'}
      </p>
    </div>
  );
};

WeatherDisplay.propTypes = {
  lat: PropTypes.number.isRequired,
  lon: PropTypes.number.isRequired,
  unit: PropTypes.oneOf(['metric', 'imperial']).isRequired,
};

export default WeatherDisplay;

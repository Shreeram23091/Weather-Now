import React, { useState } from 'react';
import axios from 'axios';
import WeatherCard from './WeatherCard';
import ErrorMessage from '../utility/ErrorMessage';

const FetchWeather = () => {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);

  // Update city name as the user types
  const handleCityChange = (e) => {
    setCity(e.target.value);
  };

  // Fetch weather data when the button is clicked
  const fetchWeather = async () => {
    const geocodeUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1&language=en`;
    
    try {
      const response = await axios.get(geocodeUrl);
      console.log(response.data.results, "Geo Data");
      if (response.data.results.length > 0) {
        const { latitude, longitude } = response.data.results[0];

        const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`;
        const weatherResponse = await axios.get(weatherUrl);
        
        setWeatherData(weatherResponse.data.current_weather);
        setError(null); // Reset error message if successful
      } else {
        setError('City not found');
      }
    } catch (err) {
      console.log(err.message, "API Error");
      setError('Error fetching weather data');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 flex justify-center items-center p-6">
      <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md">
        <h1 className="text-3xl font-bold text-center text-indigo-600 mb-5">Current Weather</h1>
        
        <input
          type="text"
          value={city}
          onChange={handleCityChange}
          className="w-full p-3 border-2 border-indigo-500 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          placeholder="Enter city name"
        />
        
        <button
          onClick={fetchWeather}
          className="w-full p-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors duration-300"
        >
          Fetch Weather
        </button>

        {error && (
          <ErrorMessage message={error} />
        )}
        
        {weatherData && (
          <WeatherCard
            temperature={weatherData.temperature}
            windspeed={weatherData.windspeed}
            weatherCode={weatherData.weathercode} // Pass the weather code for image
          />
        )}
      </div>
    </div>
  );
};

export default FetchWeather;

import React from 'react';
import weatheer1 from '../assets/weatheer1.jpg';

const WeatherCard = ({ temperature, windspeed, weatherCode }) => {

  // Return a weather image based on the weather code
  const getWeatherImage = (code) => {
    switch (code) {
      case 1:
      case 2:
      case 3:
      case 7:
      case 8:
        return weatheer1;
      default:
        return weatheer1;
    }
  };

  return (
    <div className="weather-card-container mt-4 p-6 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg shadow-xl max-w-xs mx-auto text-white">
      <div className="weather-card-header text-center">
        <h2 className="text-2xl font-bold text-yellow-300">Current Weather</h2>
      </div>
      <div className="weather-card-body mt-4">
        <div className="flex justify-center items-center mb-4">
          <img
            src={getWeatherImage(weatherCode)}
            alt="Weather Image"
            className="weather-image w-24 h-24 object-cover rounded-full shadow-md border-4 border-white"
          />
        </div>
        <div className="weather-details text-center">
          <p className="text-xl font-semibold">Temperature: {temperature}°C</p>
          <p className="text-lg font-medium mt-2">Windspeed: {windspeed} km/h</p>
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;

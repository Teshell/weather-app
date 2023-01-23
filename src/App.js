import React, { useState, useEffect } from "react";
import axios from "axios";

import "./App.css";
import WeatherForecast from "./WeatherForecast";
import WeatherSearch from "./WeatherSearch";

function App() {
  const [weatherData, setWeatherData] = useState({});
  const [error, setError] = useState(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        const API_KEY = "08f31b84d87445f1866111956232201";
        const url = `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${latitude},${longitude}`;
        
        axios
          .get(url)
          .then((response) => {
            setWeatherData(response.data);
            console.log(response.data);
          })
          .catch((error) => setError(error));
      },
      (error) => setError(error),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );
  }, []);

  return (
    <div className="container">
      {error ? (
        <p>Error: {error.message}</p>
      ) : weatherData.current ? (
        <div className="weather-data">

          <WeatherSearch />
          <h2>
            {weatherData.location.name}, {weatherData.location.region}
          </h2>

          <div className="global-condition">
            <img src={weatherData.current.condition.icon} alt="weather icon" />
            <p style={{ margin: 0 }}>{weatherData.current.condition.text}</p>
          </div>

          <p>Temperature: {weatherData.current.temp_c}°C</p>
          <p>Humidity: {weatherData.current.humidity}%</p>
          <p>Wind: {weatherData.current.wind_kph} kph</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}

      <WeatherForecast />
    </div>
  );
}

export default App;

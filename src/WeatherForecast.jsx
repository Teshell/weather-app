import React, { useState, useEffect } from "react";
import axios from "axios";

import "./WeatherForecast.css";

function WeatherForecast() {
  const [forecastData, setForecastData] = useState([]);
  const [error, setError] = useState(null);
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        const API_KEY = "08f31b84d87445f1866111956232201";
        const url = `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${latitude},${longitude}&days=14`;
        axios
          .get(url)
          .then((response) => {
            setForecastData(response.data.forecast.forecastday);
            console.log(response.data.forecast.forecastday);
          })
          .catch((error) => setError(error));
      },
      (error) => setError(error),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );
  }, []);

  return (
    <div>
      {error ? (
        <p>Error: {error.message}</p>
      ) : forecastData.length > 0 ? (
        <div className="forecast-container">
          {forecastData.map((day, index) => {
            const date = new Date(day.date);
            const nameOfDay = days[date.getUTCDay()];

            return (
              <div key={index} className="forecast-card">
                <div><img src={day.day.condition.icon} alt="" /></div>
                <div>{nameOfDay}</div>
                <div>{day.day.mintemp_c}°C</div>
                <div>{day.day.maxtemp_c}°C</div>
                <div>{day.day.condition.text}</div>
              </div>
            );
          })}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default WeatherForecast;

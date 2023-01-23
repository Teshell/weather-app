import React, { useState, useEffect } from "react";
import axios from "axios";

function WeatherSearch() {
  const [location, setLocation] = useState("");
  const [locationOptions, setLocationOptions] = useState([]);
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);
  const API_KEY = "08f31b84d87445f1866111956232201";

  const handleInputChange = (event) => {
    setLocation(event.target.value);
  };

  useEffect(() => {
    if (location.length < 3) {
      setLocationOptions([]);
      return;
    }
    axios
      .get(
        `https://api.weatherapi.com/v1/search.json?key=${API_KEY}&q=${location}`
      )
      .then((response) => {
        setLocationOptions(response.data);
      })
      .catch((error) => setError(error));
  }, [location]);

  const handleOptionSelection = (event) => {
    setLocation(event.target.innerText);
    setLocationOptions([]);
    const locationId = event.target.getAttribute("data-location-id");
    axios
      .get(
        `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${locationId}`
      )
      .then((response) => {
        setWeatherData(response.data);
      })
      .catch((error) => setError(error));
  };

  return (
    <div>
      <label htmlFor="location">Search for a location:</label>
      <input
        type="text"
        id="location"
        value={location}
        onChange={handleInputChange}
      />
      <ul>
        {locationOptions.map((option, index) => (
          <li
            key={index}
            data-location-id={option.id}
            onClick={handleOptionSelection}
          >
            {option.name}, {option.region}, {option.country}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default WeatherSearch;

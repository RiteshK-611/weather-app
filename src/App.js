import React, { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";
import fetchAir from "./fetchAir.js";
import fetchWeather from "./fetchWeather.js";

const App = () => {
  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState({});
  const [air, setAir] = useState({});
  const aqi = ["Good 😃", "Fair 😉", "Moderate 😐", "Poor 😯", "Very Poor 😞"];

  // http://www.geoplugin.net/xml.gp?ip=76.109.14.196

  const getData = async () => {
    const res = await axios.get("https://geolocation-db.com/json/");
    // console.log(res.data);
    const city = res.data.city;
    const lat = res.data.latitude;
    const lon = res.data.longitude;
    setQuery(city);
    fetchReport()
  };
  
  useEffect(() => {
    getData();
  }, []);
  
  window.onload = () => {
    var reloading = sessionStorage.getItem("reloading");
    if (reloading) {
      // sessionStorage.removeItem("reloading");
      fetchReport();
    }
  }
  
  const fetchReport = async () => {
    var city = sessionStorage.getItem("city");
    var lat = sessionStorage.getItem("lat");
    var lon = sessionStorage.getItem("lon");

    const Wdata = await fetchWeather(city);
    const Adata = await fetchAir(lat, lon);

    setWeather(Wdata);
    setAir(Adata.list[0].main.aqi);
    setQuery("");

    sessionStorage.setItem("reloading", "true");
    sessionStorage.setItem("city", city);
    sessionStorage.setItem("lat", lat);
    sessionStorage.setItem("lon", lon);
  }
  
  const search = async (e) => {
    if (e.key === "Enter") {
      const Wdata = await fetchWeather(query);
      setWeather(Wdata);

      var lat = Wdata.coord.lat;
      var lon = Wdata.coord.lon;
      const Adata = await fetchAir(lat, lon);
      setAir(Adata.list[0].main.aqi);
      setQuery("");

      sessionStorage.setItem("reloading", "true");
      sessionStorage.setItem("city", query);
      sessionStorage.setItem("lat", lat);
      sessionStorage.setItem("lon", lon);
    }
  };

  return (
    <div className="main-container">
      <p className="name">Your City Weather</p>
      <input
        type="text"
        className="search"
        placeholder="Search City..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyPress={search}
      />
      <div className="city">
        {weather.main && (
          <div className="city-weather">
            <h2 className="city-name">
              <span>{weather.name}</span>
              <sup>{weather.sys.country}</sup>
            </h2>
            <div className="city-temp">
              {Math.round(weather.main.temp)}
              <sup>&deg;C</sup>
            </div>
            <div className="info">
              <img
                className="city-info"
                src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                alt={weather.weather[0].description}
              />
              <p>{weather.weather[0].description}</p>
            </div>
          </div>
        )}
        {weather.main && (
          <div className="city-air">
            <h2 className="air-quality">Air Quality : {aqi[air - 1]}</h2>
            <h2 className="visibility">
              Visibility : {Math.round(weather.visibility / 100)} %
            </h2>
            <h2 className="wind-speed">
              Wind Speed : {weather.wind.speed} m/s
            </h2>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;

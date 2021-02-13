import React, { useState } from 'react'
import './App.css';
import fetchAir from './fetchAir.js';
import fetchWeather from "./fetchWeather.js";

const App = () => {
  const [query, setQuery] = useState('')
  const [weather, setWeather] = useState({})
  const [air, setAir] = useState({})

  const aqi = ['Good 😃', 'Fair 😉', 'Moderate 😐', 'Poor 😯', 'Very Poor 😞']

  const search = async (e) => {
    if(e.key === 'Enter') {
      const Wdata = await fetchWeather(query)
      setWeather(Wdata);

      const Adata = await fetchAir(Wdata.coord.lat, Wdata.coord.lon)
      setAir(Adata.list[0].main.aqi);

      setQuery('')
    }
  }



  return (
    <div className="main-container">
      <input type="text" className="search" placeholder="Search City..." value={query} onChange={(e) => setQuery(e.target.value)} onKeyPress={search} />
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
              <img className="city-info" src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt={weather.weather[0].description} />
              <p>{weather.weather[0].description}</p>
            </div>
          </div>
        )}
        {weather.main && (
          <div className="city-air">
            <h2 className="air-quality">
              Air Quality : {aqi[air-1]}
            </h2>
            <h2 className="visibility">
              Visibility : {Math.round((weather.visibility)/100)} %
            </h2>
            <h2 className="wind-speed">
              Wind Speed : {weather.wind.speed} m/s
            </h2>
          </div>
        )}
      </div>
    </div>
  )
}

export default App;

import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

const App = () => {

  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState({});
  const [error, setError] = useState('')
    
  const search = (e) => {
    if(e.key === 'Enter') {
      axios.get('https://api.openweathermap.org/data/2.5/weather', {
        params: {
          q: query,
          units: 'metric',
          APPID: 'e974ac4da7c568dc89ff21e0c7ea46f3',
        }
      })
      .then(res => {
        setError('');
        setWeather(res.data);
      })
      .catch(err => {
        setError('Incorrect City ...')
        setWeather({})
      })
      setQuery('');
    }
  }

  console.log(weather)

  return (
    <div className="main-container">
      <h1 style={{color:'white'}}>Weather App</h1>
      <input 
        type="text"
        className="search"
        placeholder="Search..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}onKeyPress={search}
      />
          
      {weather.main && (
        <div className="city">
          <h2 className="city-name">
            <span>{weather.name}</span>
            <sup>{weather.sys.country}</sup>
          </h2>
          <div className="city-temp">
            {Math.round(weather.main.temp)}
            <sup>°C</sup>
          </div>
          <div className="info">
            <img className="city-icon" src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt={weather.weather[0].description} />
            <p>{weather.weather[0].description}</p>
          </div>
        </div>
      )}

      {error && <p style={{color:'white'}}>{error}</p>}
    </div>
  );
}

export default App;
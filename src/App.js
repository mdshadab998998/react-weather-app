import React, { useState,useEffect } from 'react';
import axios from 'axios';
import Search from './Components/Search';
import { Unit } from './Components/Unit';
import { Errorhandlel } from './Components/Errorhandel';
import { Weather } from './Components/Weather';
import "./App.css"

const App = () => {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [unit, setUnit] = useState('metric'); // Default unit is Celsius
  const [error, setError] = useState('');

  const fetchWeather = async (cityName) => {
    try {
      const cachedData = localStorage.getItem(cityName);
      if (cachedData) {
        setWeather(JSON.parse(cachedData));
      } else {
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=${unit}&appid=7b7fee5ecd744c0e9d4e67e3ab80efe0`
        );
        setWeather(response.data);
        localStorage.setItem(cityName, JSON.stringify(response.data));
       // console.log("fetch from api")
      }
      setError('');
    } catch (error) {
      setError('Invalid city name or API request failed.');
      setWeather(null);
    }
  };

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          try {
            const { latitude, longitude } = position.coords;
            const response = await axios.get(
              `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=7b7fee5ecd744c0e9d4e67e3ab80efe0`
            );
            const cityName = response.data.name;
            const response2 = await axios.get(
              `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=${unit}&appid=7b7fee5ecd744c0e9d4e67e3ab80efe0        `
            );

            setWeather(response2.data);
            setCity(cityName);
          } 
          catch (error) {
            setError('Invalid city name or API request failed.');
            setWeather(null);
          }
        }
      );
    }
  },[unit]);
  return (
    <div className='main-container'>
    <h1 className='headingg'>Welcome to weather app</h1>
      <Search
        city={city}
        setCity={setCity}
        fetchWeather={fetchWeather}
      />
      <Unit unit={unit} setUnit={setUnit}  fetchWeather={fetchWeather}/>
      {error && <Errorhandlel error={error} />}
      {weather && <Weather weather={weather}  unit={unit} />}
    </div>
  );
};

export default App;

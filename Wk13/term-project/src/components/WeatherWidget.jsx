// ICS385 Term Project 3
// Weather Widget

import { useState, useEffect } from 'react';

const KEY = import.meta.env.VITE_WEATHER_KEY;

export default function WeatherWidget ({ city}) {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect (() => {
    fetch(`https://api.openweathermap.org/data/2.5/weather%60` + `?q=${city},US&units=imperial&appid=${KEY}`)
      .then(r => r.json())
      .then(d => {setWeather(d); setLoading(false); })
      .catch(e => console.error(e));
  }, [city]);

  if (loading) return <p>Loading...</p>;
  return (
    <div className='weather-card'>
      <h3>{weather.name}</h3>
      <p>{Math.round(weather.main.temp)}°F - {weather.weather[0].description}</p>
    </div>
  );
}


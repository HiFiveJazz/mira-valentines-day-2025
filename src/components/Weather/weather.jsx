import React, { useEffect, useState } from 'react';
import './weather.css';
import Card3D from '../Card3D';

const Weather = ({ lat, lon, heading }) => {
  const [forecast, setForecast] = useState(null);

  useEffect(() => {
    const hash = atob('ZmFlMTMwNjcxZmJmYWE5MWUyNDNkMTE3ZmVjOThlMTM=');

    const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${hash}&units=imperial`;

    const fetchWeather = async () => {
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error('Failed to fetch weather data');
        }
        const data = await response.json();

        // Filter forecast to one entry per day, closest to 12:00:00
        const dailyForecast = data.list.filter(item =>
          new Date(item.dt * 1000).getHours() === 12
        );

        setForecast({ city: data.city, list: dailyForecast });
      } catch (error) {
        console.error('Error fetching weather data:', error);
      }
    };

    fetchWeather();
  }, [lat, lon]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric' }).format(date);
  };

  return (
    <div className="weather-container">
      <h1>{heading}</h1>
      {forecast ? (
        <div className="forecast-grid">
          {forecast.list.map((item, index) => (
            <Card3D
              key={index}
              imageUrl={`http://openweathermap.org/img/wn/${item.weather[0].icon}@4x.png`}
              title={formatDate(item.dt_txt)}
              description={
                <div style={{ lineHeight: '1.5', margin: 0 }}>
                  <div>{item.main.temp}°F, feels like {item.main.feels_like}°F</div>
                  <div>Humidity: {item.main.humidity}%</div>
                  <div><strong>Wind:</strong> {item.wind.speed} mph</div>
                </div>
              }
              disableConfetti={true}
              onClick={() => console.log(`Selected: ${item.weather[0].description}`)}
            />
          ))}
        </div>
      ) : (
        <p>Loading weather data...</p>
      )}
    </div>
  );
};

export default Weather;


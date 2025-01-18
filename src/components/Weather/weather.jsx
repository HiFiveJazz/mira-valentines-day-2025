import React, { useEffect, useState } from 'react';
import './weather.css';
import Card3D from '../Card3D';

const Weather = ({ city, heading }) => {
  const [forecast, setForecast] = useState(null);

  useEffect(() => {
    const string = 'NjM3NGI5NDU3ZTQ5OWM3NjQ1MTBjOTNjZWE0YzMyMWU=';
    const decodeHash = (encoded) => {
      return atob(encoded);
    };

    const hash = decodeHash(string);

    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${hash}&units=imperial`;

    const fetchWeather = async () => {
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error('Failed to fetch weather data');
        }
        const data = await response.json();

        // Group data by day
        const groupedByDay = data.list.reduce((acc, item) => {
          const date = new Date(item.dt * 1000).toISOString().split('T')[0];
          if (!acc[date]) acc[date] = [];
          acc[date].push(item);
          return acc;
        }, {});

        // Calculate daily averages
        const dailyForecast = Object.keys(groupedByDay).map((date) => {
          const dayData = groupedByDay[date];

          const avgTemp = (
            dayData.reduce((sum, item) => sum + item.main.temp, 0) / dayData.length
          ).toFixed(1);

          const avgFeelsLike = (
            dayData.reduce((sum, item) => sum + item.main.feels_like, 0) / dayData.length
          ).toFixed(1);

          const avgHumidity = (
            dayData.reduce((sum, item) => sum + item.main.humidity, 0) / dayData.length
          ).toFixed(1);

          const avgWind = (
            dayData.reduce((sum, item) => sum + item.wind.speed, 0) / dayData.length
          ).toFixed(1);

          const avgPop = (
            dayData.reduce((sum, item) => sum + (item.pop || 0), 0) / dayData.length
          ).toFixed(2);

          return {
            date,
            avgTemp,
            avgFeelsLike,
            avgHumidity,
            avgWind,
            avgPop,
            weather: dayData[0].weather[0], // Use the first weather description/icon for simplicity
          };
        });

        setForecast({ city: data.city, list: dailyForecast });
      } catch (error) {
        console.error('Error fetching weather data:', error);
      }
    };

    fetchWeather();
  }, [city]);

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-US', { weekday: 'short', month: 'short', day: 'numeric' }).format(date);
};

  return (
    <div className="weather-container">
      <h1>{heading}</h1>
      {forecast ? (
        <div className="forecast-grid">
          {forecast.list.map((item, index) => (
            <Card3D
              key={index}
              imageUrl={`http://openweathermap.org/img/wn/${item.weather.icon}@4x.png`}
              title={formatDate(item.date)}
              description={
                <div style={{ lineHeight: '1.5', margin: 0 }}>
                  <div>{item.avgTemp}°F, Feels like {item.avgFeelsLike}°F</div>
                  <div>Humidity: {item.avgHumidity}%</div>
                  <div>Wind: {item.avgWind} mph</div>
                  <div>Precipitation Chance: {(item.avgPop * 100).toFixed(0)}%</div>
                </div>
              }
              disableConfetti={true}
              onClick={() => console.log(`Selected: ${item.weather.description}`)}
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


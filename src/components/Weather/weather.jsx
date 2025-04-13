import React, { useEffect, useState } from 'react';
import './CSS/weather.css';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend } from 'chart.js';
import Card3D from '../Card3D/Card3D';

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend);

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

        const groupedByDay = data.list.reduce((acc, item) => {
          const date = new Date(item.dt * 1000).toISOString().split('T')[0];
          if (!acc[date]) acc[date] = [];
          acc[date].push(item);
          return acc;
        }, {});

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
            avgTemp: parseFloat(avgTemp),
            avgFeelsLike: parseFloat(avgFeelsLike),
            avgHumidity: parseFloat(avgHumidity),
            avgWind: parseFloat(avgWind),
            avgPop: parseFloat(avgPop),
            weather: dayData[0].weather[0],
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
        <>
          {/* Chart Section */}
          <div className="weather-chart">
<Line
  data={{
    labels: forecast.list.map((item) => formatDate(item.date)),
    datasets: [
      {
        label: 'Average Temperature (°F)',
        data: forecast.list.map((item) => item.avgTemp),
        borderColor: 'hsl(215,7%,24%)',
        fill: false,
        tension: 0.4,
      },
    ],
  }}
  options={{
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: 'top',
        labels: {
          color: '#d9dadb', // Legend text color
          font: {
            family: 'Sequel', 
            size: 15,
          },
        },
      },
      tooltip: {
        enabled: true,
      },
      titleFont: {
        family: 'Sequel', // ✅ Tooltips
      },
      bodyFont: {
        family: 'Sequel',
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Date',
          color: '#d9dadb', // X-axis title color
          font: {
            family: 'SF Pro Display', // Date
            size: 18,
          },
        },
        ticks: {
          color: '#d9dadb', // X-axis ticks color
          font: {
            family: 'SF Pro Display', // Sat, Mar 29 ...
            size: 11,
          },
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.5)', // Optional gridline color
        },
      },
      y: {
        title: {
          display: true,
          text: 'Temperature (°F)',
          color: '#d9dadb', // Y-axis title color
          font: {
            family: 'SF Pro Display', // Temperature (F)
            size: 10,
          },
        },
        ticks: {
          color: '#d9dadb', // Y-axis ticks color
          font: {
            family: 'SF Pro Display', // 58, 59, 60
            size: 11,
          },
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.5)', // Optional gridline color
        },
      },
    },
  }}
/>
          </div>

          {/* Cards Section */}
          <div className="forecast-grid">
            {forecast.list.map((item, index) => (
              <Card3D
                key={index}
                imageUrl={`https://openweathermap.org/img/wn/${item.weather.icon}@4x.png`}
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
        </>
      ) : (
        <p>Loading weather data...</p>
      )}
    </div>
  );
};

export default Weather;


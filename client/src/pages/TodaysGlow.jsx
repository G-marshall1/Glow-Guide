import { useEffect, useState } from 'react';
import { fetchForecastData } from '../utils/api';

const TodaysGlow = () => {
  const [forecast, setForecast] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const latitude = 40.7608;
    const longitude = -111.8910;

    const fetchData = async () => {
      try {
        const forecastData = await fetchForecastData(latitude, longitude);
        console.log('Forecast Data:', forecastData);
        setForecast(forecastData);
        setLoading(false);
      } catch (error) {
        setError('Error fetching weather data');
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Filter out periods for today
  const getTodaysPeriods = () => {
    if (!forecast || !forecast.periods) return [];
    const today = new Date().toISOString().split('T')[0]; // Get today's date in YYYY-MM-DD format
    return forecast.periods.filter(period => period.startTime.includes(today));
  };

  return (
    <div>
      <h2>Todays Glow Forecast</h2>
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {forecast && (
        <div>
          {getTodaysPeriods().map((period, index) => (
            <div key={index}>
              <h3>{period.name}</h3>
              <p>Temperature: {period.temperature}°F</p>
              <p>Detailed Forecast: {period.detailedForecast}</p>
              <img src="https://services.swpc.noaa.gov/experimental/images/aurora_dashboard/tonights_static_viewline_forecast.png" alt="Tonight's Static Viewline Forecast" title="Click to exit full screen"></img>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TodaysGlow;




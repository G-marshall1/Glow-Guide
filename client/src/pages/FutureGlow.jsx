import { useEffect, useState } from 'react';
import { fetchForecastData } from '../utils/api';

const FutureGlow = () => {
  const [forecastData, setForecastData] = useState(null);
  const latitude = 40.7608; // Latitude for Salt Lake City
  const longitude = -111.8910; // Longitude for Salt Lake City

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Call the fetchForecastData function to fetch data with latitude and longitude
        const data = await fetchForecastData(latitude, longitude);
        setForecastData(data);
      } catch (error) {
        console.error('Error fetching weather forecast data:', error);
      }
    };

    fetchData(); // Call the fetchData function
  }, [latitude, longitude]); // Add latitude and longitude to the dependency array

  // Filter out periods representing nighttime
  const nightPeriods = forecastData ? forecastData.periods.filter(period => period.isDaytime === false) : [];

  return (
    <div>
      <h2>Future Glow</h2>
      {forecastData ? (
        <div>
          <img src="https://services.swpc.noaa.gov/experimental/images/aurora_dashboard/tomorrow_nights_static_viewline_forecast.png" alt="Tomorrow Night's Static Viewline Forecast" title="Click to exit full screen" />
          {nightPeriods.map((period, index) => (
            <div key={index}>
              <h3>{period.name}</h3>
              <p>Temperature: {period.temperature}°F</p>
              <p>Detailed Forecast: {period.detailedForecast}</p>
            </div>
          ))}
        </div>
      ) : (
        <p>Loading future weather forecast data...</p>
      )}
    </div>
  );
};

export default FutureGlow;






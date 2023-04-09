import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AppContext } from "../context/AppContext";

interface ForecastDataProps {
  dt_txt: string;
}

const useWeatherData = () => {
  // current weather data
  const [weatherData, setWeatherData] = useState({
    name: "",
    main: {
      temp: 0,
      humidity: 0,
      temp_max: 0,
      temp_min: 0,
    },
    weather: [
      {
        main: "",
        description: "",
      },
    ],
    wind: {
      speed: 0,
    },
    coord: {
      latitude: 0,
      longitude: 0,
    },
  });

  // weather forecast data
  const [forecastData, setForecastData] = useState([]);

  const context = useContext(AppContext);
  const API_KEY = import.meta.env.VITE_API_KEY;

  // getting current time "2023-04-08 21:00:00"
  const currentTime = new Date();
  const currentUTCTime = currentTime.toISOString();
  // console.log(currentUTCTime);

  const defaultValues = {
    isLoading: false,
    isErrorVisible: true,
    forecastData,
    weatherData,
  };

  if (!context) {
    return defaultValues;
  }

  const { setIsLoading, isErrorVisible, showError, city, isLoading } = context;

  const fetchCurrentWeatherData = () => {
    setIsLoading(true);
    showError(false);
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`
      )
      .then((res) => {
        setIsLoading(false);
        setWeatherData({
          name: res.data.name,
          main: {
            temp: res.data.main.temp,
            humidity: res.data.main.humidity,
            temp_max: res.data.main.temp_max,
            temp_min: res.data.main.temp_min,
          },
          weather: res.data.weather,
          wind: {
            speed: res.data.wind.speed,
          },
          coord: {
            latitude: res.data.coord.lat,
            longitude: res.data.coord.lon,
          },
        });
      })
      .catch((err) => {
        showError(true);
        setIsLoading(false);
      });
  };

  const fetchForecastWeatherData = () => {
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${weatherData.coord.latitude}&lon=${weatherData.coord.longitude}&appid=${API_KEY}`
      )
      .then((res) => {
        const forecastDataArray = res.data.list;
        setForecastData(forecastDataArray);
        if (forecastDataArray.length > 0) {
          const futureTemps = forecastDataArray.filter(
            (data: ForecastDataProps) => {
              const forecastDateTime = new Date(data.dt_txt).toISOString();
              return forecastDateTime > currentUTCTime;
            }
          );
          setForecastData(futureTemps.slice(0, 4));
        }
        console.log("\n\n\n");
        console.log(forecastData);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchCurrentWeatherData();
  }, [city]);

  useEffect(() => {
    if (weatherData.coord.latitude !== 0 && weatherData.coord.longitude !== 0) {
      fetchForecastWeatherData();
    }
  }, [weatherData]);

  return { isLoading, isErrorVisible, weatherData, forecastData };
};

export default useWeatherData;

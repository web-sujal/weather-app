import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AppContext } from "../context/AppContext";

const useWeatherData = () => {
  // states
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
  });

  // contextAPI
  const context = useContext(AppContext);

  if (!context) {
    // handle if context is null
    return {
      isLoading: false,
      isErrorVisible: true,
      weatherData,
    };
  }

  const { setIsLoading, showError, isErrorVisible, city, isLoading } = context;
  const API_KEY = import.meta.env.VITE_API_KEY;

  useEffect(() => {
    setIsLoading(true);
    showError(false);
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`
      )
      .then((res) => {
        console.log(res.data);
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
        });
      })
      .catch((err) => {
        showError(true);
        setIsLoading(false);
      });
  }, [city]);

  return { isLoading, isErrorVisible, weatherData };
};

export default useWeatherData;

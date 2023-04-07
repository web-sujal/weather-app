import React, { useContext, useEffect } from "react";
import axios from "axios";
import { AppContext } from "../context/AppContext";

interface WeatherDataProps {
  name: string;
  main: {
    temp: number;
    humidity: number;
    temp_max: number;
    temp_min: number;
  };
  weather: {
    main: string;
    description: string;
  }[];
  wind: {
    speed: number;
  };
}

const useWeatherData = ({
  weatherData,
  setWeatherData,
}: {
  weatherData: WeatherDataProps;
  setWeatherData: React.Dispatch<React.SetStateAction<WeatherDataProps>>;
}) => {
  const context = useContext(AppContext);

  if (!context) {
    // handle if context is null
    return <div className="">Loading...</div>;
  }

  const { setIsLoading, showError, city } = context;
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
};

export default useWeatherData;

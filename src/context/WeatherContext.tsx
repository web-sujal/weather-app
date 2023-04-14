import React, { createContext, useState } from "react";

type WeatherDataType = {
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
  coord: {
    latitude: number;
    longitude: number;
  };
};

type ForecastDataType = {
  dt_txt: number;
  main: {
    temp: number;
  };
};

type WeatherContextType = {
  weatherData: WeatherDataType;
  setWeatherData: React.Dispatch<React.SetStateAction<WeatherDataType>>;
  forecastData: ForecastDataType[];
  setForecastData: React.Dispatch<React.SetStateAction<ForecastDataType[]>>;
};

export const WeatherContext = createContext<WeatherContextType | null>(null);

export const WeatherContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
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
  const [forecastData, setForecastData] = useState<ForecastDataType[]>([]);

  const values = {
    weatherData,
    setWeatherData,
    forecastData,
    setForecastData,
  };

  return (
    <WeatherContext.Provider value={values}>{children}</WeatherContext.Provider>
  );
};

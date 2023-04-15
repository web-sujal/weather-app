import React, { useContext } from "react";
import { WeatherContext } from "../../context/WeatherContext";
import { AppContext } from "../../context/AppContext";
import { getWeatherIcon } from "../ForecastWeatherInfo/ForecastWeatherInfo";

const MainWeatherInfo = () => {
  // weather context
  const weatherContext = useContext(WeatherContext);
  if (!weatherContext) {
    return <div className="">Loading...</div>;
  }
  const { weatherData } = weatherContext;

  // app context
  const appContext = useContext(AppContext);
  if (!appContext) {
    return <div className="">Loading...</div>;
  }
  const { isLoading } = appContext;

  return (
    <section
      className="relative container max-w-4xl w-full text-center flex flex-col justify-center 
      items-center space-y-1 mt-6 mx-auto py-8 text-white"
    >
      <h1
        className="text-6xl font-display z-10 text-transparent 
        bg-clip-text bg-gradient-to-b from-white via-white to-transparent
        "
      >
        {isLoading || weatherData.main.temp === 0
          ? "Loading..."
          : `${(weatherData.main.temp - 273.15).toFixed(1)}℃`}
      </h1>

      <div className="flex space-x-2 justify-center items-center text-xl z-10">
        <span className="">It's {weatherData.weather[0].description}</span>
        <span className="">
          {getWeatherIcon(
            weatherData.weather[0].main,
            weatherData.weather[0].description
          )}
        </span>
      </div>

      {/* background */}
      <div
        className="absolute top-0 right-2 left-2 bottom-0 bg-black
         z-0 opacity-70"
      ></div>
    </section>
  );
};

export default MainWeatherInfo;

import React, { useContext } from "react";
import { WiHumidity } from "react-icons/wi";
import { FaTemperatureLow, FaTemperatureHigh } from "react-icons/fa";
import { FiWind } from "react-icons/fi";
import { WeatherContext } from "../../context/WeatherContext";
import { AppContext } from "../../context/AppContext";

const OtherWeatherInfo = () => {
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
      id="otherWeatherInfo"
      className="relative container max-w-4xl mx-auto 
      flex justify-center items-center space-x-4 py-2 w-full mt-4"
    >
      {/* humidity */}
      <div
        className="flex flex-col space-y-2 items-center 
        justify-center p-2 z-10"
      >
        <WiHumidity className="text-white text-4xl" />
        <p className="text-white text-sm">Humidity</p>
        <p className="text-2xl text-white font-bold">
          {weatherData.main.humidity}
        </p>
      </div>

      {/* wind speed */}
      <div
        className="flex flex-col space-y-2 items-center 
        justify-center p-2 z-10"
      >
        <FiWind className="text-white text-4xl" />
        <p className="text-white text-sm">Wind Speed</p>
        <p className="text-2xl text-white font-bold">
          {weatherData.wind.speed}
        </p>
      </div>

      {/* max temp */}
      <div
        className="flex flex-col space-y-2 items-center 
        justify-center p-2 z-10"
      >
        <FaTemperatureHigh className="text-white text-4xl" />
        <p className="text-white text-sm">Max Temp</p>
        <p className="text-2xl text-white font-bold">
          {isLoading || weatherData.main.temp_max === 0
            ? "Loading..."
            : `${(weatherData.main.temp_max - 273.15).toFixed(1)}°`}
        </p>
      </div>

      {/* min temp */}
      <div
        className="flex flex-col space-y-2 items-center 
        justify-center p-2 z-10"
      >
        <FaTemperatureLow className="text-white text-4xl" />
        <p className="text-white text-sm">Min Temp</p>
        <p className="text-2xl text-white font-bold">
          {isLoading || weatherData.main.temp_min === 0
            ? "Loading..."
            : `${(weatherData.main.temp_min - 273.15).toFixed(1)}°`}
        </p>
      </div>

      {/* background */}
      <div
        className="absolute top-0 right-0 left-0 bottom-0 bg-white
         z-0 opacity-30 -translate-x-2"
      ></div>
    </section>
  );
};

export default OtherWeatherInfo;

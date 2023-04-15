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
      className="relative flex flex-col justify-center items-center space-y-1
      max-w-4xl mx-auto w-full mt-4 py-3 text-gray-800"
    >
      {/* know weather heading */}
      <div className="flex justify-between space-x-4 w-full px-10 pb-1 text-xs text-gray-700 z-10">
        {/* left border */}
        <div className="flex items-center justify-center h-auto w-full">
          <div className="border-b-2 border-gray-600 w-full"></div>
        </div>

        {/* heading */}
        <div className="text-center tracking-widest px-4 whitespace-nowrap w-auto">
          KNOW WEATHER
        </div>

        {/* right border */}
        <div className="flex items-center justify-center h-auto w-full">
          <div className="border-b-2 border-gray-600 w-full"></div>
        </div>
      </div>

      {/* know weather content */}
      <div className="flex justify-center items-center space-x-4  w-full mt-4">
        {/* humidity */}
        <div
          className="flex flex-col space-y-1 items-center 
        justify-center p-2 z-10"
        >
          <WiHumidity className="text-gray-800 pb- text-3xl" />
          <p className="text-gray-800 text-sm">Humidity</p>
          <p className="text-2xl text-gray-800 font-bold">
            {weatherData.main.humidity}
          </p>
        </div>

        {/* wind speed */}
        <div
          className="flex flex-col space-y-1 items-center 
        justify-center p-2 z-10"
        >
          <FiWind className="text-gray-800 pb- text-3xl" />
          <p className="text-gray-800 text-sm">Wind Speed</p>
          <p className="text-2xl text-gray-800 font-bold">
            {weatherData.wind.speed}
          </p>
        </div>

        {/* max temp */}
        <div
          className="flex flex-col space-y-1 items-center 
        justify-center p-2 z-10"
        >
          <FaTemperatureHigh className="text-gray-800 pb- text-3xl" />
          <p className="text-gray-800 text-sm">Max Temp</p>
          <p className="text-2xl text-gray-800 font-bold">
            {isLoading || weatherData.main.temp_max === 0
              ? "Loading..."
              : `${(weatherData.main.temp_max - 273.15).toFixed(1)}°`}
          </p>
        </div>

        {/* min temp */}
        <div
          className="flex flex-col space-y-1 items-center 
        justify-center p-2 z-10"
        >
          <FaTemperatureLow className="text-gray-800 pb- text-3xl" />
          <p className="text-gray-800 text-sm">Min Temp</p>
          <p className="text-2xl text-gray-800 font-bold">
            {isLoading || weatherData.main.temp_min === 0
              ? "Loading..."
              : `${(weatherData.main.temp_min - 273.15).toFixed(1)}°`}
          </p>
        </div>

        {/* background */}
        <div
          className="absolute top-0 right-0 left-0 bottom-0 bg-white
         z-0 opacity-70 -translate-x-2"
        ></div>
      </div>
    </section>
  );
};

export default OtherWeatherInfo;

import React, { useContext } from "react";
import { WeatherContext } from "../../context/WeatherContext";
import { IoSunnyOutline } from "react-icons/io5";
import {
  BsCloudRain,
  BsCloudRainHeavy,
  BsSnow2,
  BsCloudSun,
  BsClouds,
  BsFillCloudFog2Fill,
} from "react-icons/bs";
import { MdOutlineThunderstorm } from "react-icons/md";
import { FaWind, FaQuestion } from "react-icons/fa";

export function getWeatherIcon(
  main: string,
  description: string
): React.ReactNode {
  switch (main) {
    case "Thunderstorm":
      return <MdOutlineThunderstorm />;
    case "Drizzle":
    case "Rain":
      return description.includes("light") ? (
        <BsCloudRain />
      ) : (
        <BsCloudRainHeavy />
      );
    case "Snow":
      return <BsSnow2 />;
    case "Mist":
    case "Smoke":
    case "Haze":
    case "Dust":
    case "Fog":
    case "Sand":
    case "Dust":
    case "Ash":
      return <BsFillCloudFog2Fill />;
    case "Squall":
    case "Tornado":
      return <FaWind />;
    case "Clear":
      return <IoSunnyOutline />;
    case "Clouds":
      return description.includes("few") ||
        description.includes("scattered") ? (
        <BsCloudSun />
      ) : (
        <BsClouds />
      );
    default:
      return <FaQuestion />;
  }
}

const ForecastWeatherinfo = () => {
  // weather context
  const weatherContext = useContext(WeatherContext);
  if (!weatherContext) {
    return <div className="">Loading...</div>;
  }
  const { forecastData, weatherData } = weatherContext;

  return (
    <section>
      <div
        className="relative flex flex-col justify-center items-center space-y-1
       max-w-4xl mx-auto w-full mt-4 py-3 text-gray-800"
      >
        {/* know forecast heading */}
        <div className="flex justify-between space-x-4 w-full px-10 pb-1 text-xs text-gray-700 z-10">
          {/* left border */}
          <div className="flex items-center justify-center h-auto w-full">
            <div className="border-b-2 border-gray-600 w-full"></div>
          </div>

          {/* heading */}
          <div className="text-center tracking-widest px-4 whitespace-nowrap w-auto">
            KNOW FORECAST
          </div>

          {/* right border */}
          <div className="flex items-center justify-center h-auto w-full">
            <div className="border-b-2 border-gray-600 w-full"></div>
          </div>
        </div>

        {/* know forecast content */}
        <div
          className="flex justify-center items-center space-x-4
        mx-auto w-full pb-1 text-gray-800"
        >
          {forecastData.map((data, index) => (
            <div key={index} className="text-center z-10 px-2">
              {/* icons */}
              <div className="flex justify-center align-center text-4xl w-full py-1">
                {weatherData &&
                  getWeatherIcon(
                    weatherData.weather[0].main,
                    weatherData.weather[0].description
                  )}
              </div>

              {/* time */}
              <div className="">
                <span className="text-sm md:text-lg">
                  {data.dt_txt.toString().slice(11, 16)}
                </span>
                <span className="text-sm md:text-lg">
                  {new Date(data.dt_txt).toLocaleTimeString().slice(0, 5) >=
                  "12:00"
                    ? " PM"
                    : " AM"}
                </span>
              </div>

              {/* temperature */}
              <p className="text-2xl font-bold">
                {(data.main.temp - 273.15).toFixed(1)}℃
              </p>
            </div>
          ))}

          {/* background */}
          <div
            className="absolute top-0 left-0 right-0 bottom-0
             bg-white opacity-70 z-0 -translate-x-2"
          ></div>
        </div>
      </div>
    </section>
  );
};

export default ForecastWeatherinfo;

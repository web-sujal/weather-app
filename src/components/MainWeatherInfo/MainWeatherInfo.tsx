import React, { useContext } from "react";
import { WeatherContext } from "../../context/WeatherContext";
import { AppContext } from "../../context/AppContext";

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
      className="relative flex flex-col justify-center items-center
         space-y-1 mt-10 py-4 text-white md:mt-20"
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

      <span className=" text-xl font-display z-10">
        It's {weatherData.weather[0].description}
      </span>

      {/* background */}
      <div
        className="absolute top-0 right-0 left-0 bottom-0 bg-black
         z-0 opacity-40"
      ></div>
    </section>
  );
};

export default MainWeatherInfo;

import React from "react";
import useWeatherData from "../../hooks/useWeatherData";

const MainWeatherInfo = () => {
  const { isLoading, weatherData } = useWeatherData();

  return (
    <section
      className="relative flex flex-col justify-center items-center
         space-y-1 mt-32 py-4 text-white"
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

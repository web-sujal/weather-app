import React, { FormEvent, useState, useRef, useContext } from "react";
import Input from "../../components/Input/Input";
import AirIcon from "@mui/icons-material/Air";
import { AppContext } from "../../context/AppContext";
import useWeatherData from "../../hooks/useWeatherData";

const WeatherApp = () => {
  const context = useContext(AppContext);

  if (!context) {
    // handle case where context is null
    return <div>Loading...</div>;
  }

  const { setCity, isLoading, isErrorVisible } = context;

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

  // weatherData
  useWeatherData({ weatherData, setWeatherData });

  // refs
  const inputRef = useRef<HTMLInputElement>(null);

  // event handlers
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setCity((e.currentTarget[0] as HTMLInputElement).value);
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  return (
    <div className="">
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

      {/* Other Weather Information */}
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
          <AirIcon className="text-white scale-125" />
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
          <AirIcon className="text-white scale-125" />
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
          <AirIcon className="text-white scale-125" />
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
          <AirIcon className="text-white scale-125" />
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

      {/* Input component */}
      <Input handleSubmit={handleSubmit} inputRef={inputRef} />

      {isErrorVisible && (
        <div className="flex justify-center opacity-90 items-center w-full mt-4">
          <span className="text-xl mx-auto rounded-lg bg-rose-50 py-2 px-3 text-red-500 text-display tracking-wide">
            Something went wrong!
          </span>
        </div>
      )}
    </div>
  );
};

export default WeatherApp;

// use limit=5 for getting multiple cities name and show in pc version
// api.openweathermap.org/data/2.5/forecast?lat=44.34&lon=10.99&appid={API key}

import React, { FormEvent, useRef, useContext } from "react";
import Input from "../../components/Input/Input";
import { AppContext } from "../../context/AppContext";
import useWeatherData from "../../hooks/useWeatherData";
import OtherWeatherInfo from "../../components/OtherWeatherInfo/OtherWeatherInfo";
import MainWeatherInfo from "../../components/MainWeatherInfo/MainWeatherInfo";

const WeatherApp = () => {
  const context = useContext(AppContext);

  if (!context) {
    // handle case where context is null
    return <div>Loading...</div>;
  }
  const { setCity } = context;

  const { isErrorVisible } = useWeatherData();

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
      {/* main weather info */}
      <MainWeatherInfo />

      {/* Other Weather info */}
      <OtherWeatherInfo />

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
// `api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${API_KEY}` forecast weather data
// `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${API key}` geocoding by city name

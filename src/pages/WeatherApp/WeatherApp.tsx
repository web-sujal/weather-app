import React, {
  FormEvent,
  FormHTMLAttributes,
  useEffect,
  useState,
} from "react";
import axios from "axios";

type WeatherAppProps = {
  city: string;
};

const WeatherApp = ({ city }: WeatherAppProps) => {
  const [serchedCity, setSearchedCity] = useState("");
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
      },
    ],
    wind: {
      speed: 0,
    },
  });

  useEffect(() => {
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=2180eac4c664ce81bd7e87e191a8736d`
      )
      .then((res) => {
        setWeatherData({
          name: res.data.name,
          main: {
            temp: res.data.main.temp,
            humidity: res.data.main.humidity,
            temp_max: res.data.main.temp_max,
            temp_min: res.data.main.temp_min,
          },
          weather: res.data.weather,
          wind: res.data.wind.speed,
        });
      });
  }, [city]);

  // event handlers
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSearchedCity((e.currentTarget[0] as HTMLInputElement).value);
  };

  return (
    <div className="">
      <div
        className="relative flex justify-between items-center text-white 
    my-8 px-2 py-10"
      >
        <h1
          className="text-6xl font-bold text-transparent 
      bg-clip-text bg-gradient-to-b from-white via-white to-transparent
      font-display z-10"
        >
          {weatherData.main.temp}℃
        </h1>

        <span
          className="-rotate-90 text-2xl font-display 
       translate-x-10 z-10"
        >
          It's {weatherData.weather[0].main}
        </span>

        <div
          className="absolute top-0 right-0 left-0 bottom-0 bg-black
         z-0 opacity-30"
        ></div>
      </div>

      {/* input */}
      <form
        className="flex justify-center items-center mt-36"
        onSubmit={handleSubmit}
        action=""
      >
        <input
          className="p-2 rounded-l-lg outline-none text-gray-700"
          placeholder="enter city name..."
          type="text"
        />
        <button
          className="py-2 px-4 bg-emerald-600 hover:bg-emerald-500 
        duration-200 hover:scale-105 cursor-pointer transition hover:-translate-y-0.5
        rounded-r-lg shadow-sm hover:shadow-md hover:shadow-rose-50 text-white"
        >
          search
        </button>
      </form>
    </div>
  );
};

export default WeatherApp;

// {weatherData.weather[0].main}
// {weatherData.wind.speed}

/* 
use limit=5 for getting multiple cities name and show in pc version
*/

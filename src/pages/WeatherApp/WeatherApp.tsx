import React, {
  Dispatch,
  FormEvent,
  SetStateAction,
  useEffect,
  useState,
  useRef,
  MutableRefObject,
} from "react";
import axios from "axios";

type WeatherAppProps = {
  city: string;
  setCity: Dispatch<SetStateAction<string>>;
  isLoading: boolean;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  error: boolean;
  setError: Dispatch<SetStateAction<boolean>>;
};

const WeatherApp = ({
  city,
  setCity,
  isLoading,
  setIsLoading,
  error,
  setError,
}: WeatherAppProps) => {
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
      },
    ],
    wind: {
      speed: 0,
    },
  });

  // refs
  const inputRef = useRef<HTMLInputElement>(null);

  // useEffects
  useEffect(() => {
    setIsLoading(true);
    setError(false);
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=2180eac4c664ce81bd7e87e191a8736d`
      )
      .then((res) => {
        console.log(res.data);
        setIsLoading(false);
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
      })
      .catch((err) => {
        setError(true);
        setIsLoading(false);
      });
  }, [city]);

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
      <div
        className="relative flex flex-col justify-center items-center
         space-y-1 mt-32 py-4 text-white"
      >
        <h1
          className="text-6xl font-display z-10 text-transparent 
        bg-clip-text bg-gradient-to-b from-white via-white to-transparent
        "
        >
          {isLoading
            ? "Loading..."
            : `${(weatherData.main.temp - 273.15).toFixed(1)}℃`}
        </h1>

        <span className=" text-xl font-display z-10">
          {weatherData.weather[0].main}
        </span>

        <div
          className="absolute top-0 right-0 left-0 bottom-0 bg-black
         z-0 opacity-40"
        ></div>
      </div>

      {/* input */}
      <form
        className="flex justify-center items-center mt-36 mb-10"
        onSubmit={handleSubmit}
        action=""
      >
        <input
          className="p-2 rounded-l-lg outline-none text-gray-700"
          placeholder="enter city name..."
          type="text"
          ref={inputRef}
        />
        <button
          className="py-2 px-4 bg-emerald-600 hover:bg-emerald-500 
        duration-200 hover:scale-105 cursor-pointer transition hover:-translate-y-0.5
        rounded-r-lg shadow-sm hover:shadow-md hover:shadow-rose-50 text-white"
        >
          search
        </button>
      </form>

      {error && (
        <div className="flex justify-center  items-center w-full ">
          <span className="text-xl mx-auto rounded-lg bg-rose-50 py-2 px-3 text-red-500 text-display tracking-wide">
            Something went wrong!
          </span>
        </div>
      )}
    </div>
  );
};

export default WeatherApp;

// {weatherData.weather[0].main}
// {weatherData.wind.speed}

/* 
use limit=5 for getting multiple cities name and show in pc version
*/

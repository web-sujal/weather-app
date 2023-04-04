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
import Input from "../../components/Input/Input";
import AirIcon from "@mui/icons-material/Air";

type WeatherAppProps = {
  city: string;
  setCity: Dispatch<SetStateAction<string>>;
  isLoading: boolean;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  error: boolean;
  setError: Dispatch<SetStateAction<boolean>>;
  isErrorVisible: boolean;
  showError: (value: boolean) => void;
};

const WeatherApp = ({
  city,
  setCity,
  isLoading,
  setIsLoading,
  error,
  setError,
  isErrorVisible,
  showError,
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
        description: "",
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
    showError(false);
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
          wind: {
            speed: res.data.wind.speed,
          },
        });
      })
      .catch((err) => {
        showError(true);
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
          {isLoading || weatherData.main.temp === 0
            ? "Loading..."
            : `${(weatherData.main.temp - 273.15).toFixed(1)}℃`}
        </h1>

        <span className=" text-xl font-display z-10">
          It's {weatherData.weather[0].description}
        </span>

        <div
          className="absolute top-0 right-0 left-0 bottom-0 bg-black
         z-0 opacity-40"
        ></div>
      </div>

      {/* Other Weather Information */}
      <section
        id="otherWeatherInfo"
        className="container max-w-4xl mx-auto border-2 border-white 
      flex justify-center items-center space-x-4 py-2 w-full mt-4"
      >
        {/* main{temp_max, humidity, temp_min}, wind{speed} */}
        <div
          className="flex flex-col space-y-2 items-center 
        justify-center p-2"
        >
          <AirIcon className="text-white" />
          <p className="text-gray-400 text-sm">Wind Speed</p>
          <p className="text-xl text-white font-bold">
            {weatherData.wind.speed}
          </p>
        </div>
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

// {weatherData.weather[0].main}
// {weatherData.wind.speed}

/* 
use limit=5 for getting multiple cities name and show in pc version
*/

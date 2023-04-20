import React, { useContext } from "react";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import WeatherApp from "./pages/WeatherApp/WeatherApp";
import { WeatherContext } from "./context/WeatherContext";

function getBg(main: string, description: string, isMobile: boolean): string {
  switch (main) {
    // sunny
    case "Clear":
      return isMobile ? "mobile-sunny" : "desktop-sunny";

    // rain
    case "Thunderstorm":
    case "Drizzle":
    case "Rain":
      return isMobile ? "mobile-rain" : "desktop-rain";

    // cold
    case "Snow":
      return isMobile ? "mobile-cold" : "desktop-cold";

    // clouds
    case "Mist":
    case "Smoke":
    case "Haze":
    case "Dust":
    case "Fog":
    case "Sand":
    case "Dust":
    case "Ash":
    case "Clouds":
      return isMobile
        ? "mobile-clouds"
        : description.includes("few") || description.includes("scattered")
        ? "desktop-sunny"
        : "desktop-clouds";

    // default
    default:
      return isMobile ? "mobile-sunny" : "desktop-sunny";
  }
}

function App() {
  const isMobile = window.innerWidth < 768;
  console.log(isMobile);
  console.log(window.innerWidth);

  const weatherContext = useContext(WeatherContext);
  if (!weatherContext) {
    return <div className="">Loading...</div>;
  }
  const { weatherData } = weatherContext;

  const bgImage = getBg(
    weatherData.weather[0].main,
    weatherData.weather[0].description,
    isMobile
  );

  return (
    <div
      className="bg-cover min-h-screen"
      style={{ backgroundImage: `url('/images/${bgImage}.jpg')` }}
    >
      <Navbar />
      <WeatherApp />
    </div>
  );
}

export default App;

import React, { useEffect, useState } from "react";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import WeatherApp from "./pages/WeatherApp/WeatherApp";
import axios from "axios";

function App() {
  const [city, setCity] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      setIsLoading(true);
      setError(false);
      setLatitude(position.coords.latitude);
      setLongitude(position.coords.longitude);

      // reverse geocoding
      if (latitude !== 0 && longitude !== 0) {
        axios
          .get(
            `https://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&limit=5&appid=2180eac4c664ce81bd7e87e191a8736d`
          )
          .then((res) => {
            if (res.data && res.data[0]) {
              setCity(res.data[0].name);
              setIsLoading(false);
            } else {
              setError(true);
              setIsLoading(false);
            }
          })
          .catch((err) => {
            setError(true);
            setIsLoading(false);
          });
      }
    });
  }, [latitude, longitude]);

  return (
    <div className="relative min-h-screen" id="root">
      <Navbar city={city} />
      <WeatherApp
        city={city}
        setCity={setCity}
        isLoading={isLoading}
        setIsLoading={setIsLoading}
        error={error}
        setError={setError}
      />
      {/* <Footer /> */}
    </div>
  );
}

export default App;

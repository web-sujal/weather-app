import React, { useEffect, useState } from "react";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import WeatherApp from "./pages/WeatherApp/WeatherApp";
import axios from "axios";
import Footer from "./components/Footer/Footer";

function App() {
  const [city, setCity] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      setLatitude(position.coords.latitude);
      setLongitude(position.coords.longitude);
      console.log(latitude, longitude);

      // reverse geocoding
      if (latitude !== 0 && longitude !== 0) {
        axios
          .get(
            `http://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&limit=5&appid=2180eac4c664ce81bd7e87e191a8736d`
          )
          .then((res) => {
            if (res.data && res.data[0]) {
              console.log(res.data);
              setCity(res.data[0].name);
              setIsLoading(false);
            } else {
              setError("City Not Found!");
              setIsLoading(false);
            }
          })
          .catch((err) => {
            setError(err.message);
            setIsLoading(false);
          });
      }
    });
  }, [latitude, longitude]);

  if (isLoading) {
    return <div className="">Loading...</div>;
  }

  if (error) {
    return <div className="">{error}</div>;
  }

  return (
    <div className="relative min-h-screen" id="root">
      <Navbar city={city} />
      <WeatherApp city={city} />
      {/* <Footer /> */}
    </div>
  );
}

export default App;

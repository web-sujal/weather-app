import React, { useContext, useEffect } from "react";
import { AppContext } from "../context/AppContext";
import axios from "axios";

const useGeolocation = () => {
  const context = useContext(AppContext);
  if (!context) {
    // Handles the case where the context value is null
    return {
      city: "agra",
    };
  }

  const {
    city,
    setCity,
    setIsLoading,
    showError,
    setError,
    latitude,
    setLatitude,
    longitude,
    setLongitude,
  } = context;

  const API_KEY = import.meta.env.VITE_API_KEY;

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
            `https://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&limit=5&appid=${API_KEY}`
          )
          .then((res) => {
            if (res.data && res.data[0]) {
              setCity(res.data[0].name);
              setIsLoading(false);
            } else {
              showError(true);
              setIsLoading(false);
            }
          })
          .catch((err) => {
            showError(true);
          })
          .finally(() => {
            setIsLoading(false);
          });
      }
    });
  }, [latitude, longitude]);

  return {
    city,
  };
};

export default useGeolocation;

import React, { createContext, useState } from "react";

type AppContextType = {
  city: string;
  setCity: React.Dispatch<React.SetStateAction<string>>;
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
  error: boolean;
  setError: (error: boolean) => void;
  showError: (value: boolean) => void;
  isErrorVisible: boolean;
  setIsErrorVisible: (isErrorVisible: boolean) => void;
  latitude: number;
  setLatitude: (latitude: number) => void;
  longitude: number;
  setLongitude: (longitude: number) => void;
};

export const AppContext = createContext<AppContextType | null>(null);

export const AppContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [city, setCity] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [isErrorVisible, setIsErrorVisible] = useState(true);
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);

  const showError = (value: boolean) => {
    setError(value);
    setIsLoading(false);
    setIsErrorVisible(value);
    setTimeout(() => {
      setIsErrorVisible(false);
    }, 3000);
    setTimeout(() => {
      setIsErrorVisible(false);
    }, 6000); // making sure the error message is hidden after 6 seconds
  };

  const values = {
    city,
    setCity,
    isLoading,
    setIsLoading,
    error,
    setError,
    showError,
    isErrorVisible,
    setIsErrorVisible,
    latitude,
    setLatitude,
    longitude,
    setLongitude,
  };

  return <AppContext.Provider value={values}>{children}</AppContext.Provider>;
};

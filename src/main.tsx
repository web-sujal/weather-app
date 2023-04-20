import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { WeatherContextProvider } from "./context/WeatherContext";
import { AppContextProvider } from "./context/AppContext";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <AppContextProvider>
      <WeatherContextProvider>
        <App />
      </WeatherContextProvider>
    </AppContextProvider>
  </React.StrictMode>
);

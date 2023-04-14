import React, { useContext } from "react";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import WeatherApp from "./pages/WeatherApp/WeatherApp";
import { AppContextProvider } from "./context/AppContext";
import { WeatherContextProvider } from "./context/WeatherContext";

function App() {
  return (
    <AppContextProvider>
      <WeatherContextProvider>
        <div className="min-h-screen" id="root">
          <Navbar />
          <WeatherApp />
        </div>
      </WeatherContextProvider>
    </AppContextProvider>
  );
}

export default App;

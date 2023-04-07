import React, { useContext } from "react";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import WeatherApp from "./pages/WeatherApp/WeatherApp";
import { AppContextProvider } from "./context/AppContext";

function App() {
  return (
    <AppContextProvider>
      <div className="min-h-screen" id="root">
        <Navbar />
        <WeatherApp />
      </div>
    </AppContextProvider>
  );
}

export default App;

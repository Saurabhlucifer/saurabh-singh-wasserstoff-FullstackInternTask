import React, { useEffect, useState } from "react";
import { IoLogoReact } from "react-icons/io5";
import TopButtons from "./components/TopButtons.jsx";
import Inputs from "./components/Inputs.jsx";
import TimeandLocation from "./components/TimeandLocation.jsx";
import TemperatureandDetails from "./components/TemperatureandDetails.jsx";
import Forecast from "./components/Forecast.jsx";
import getFormattedWeatherData from "./services/weatherService.js";
function App() {
  const [query, setQuery] = useState({ q: "kanpur" });
  const [units, setUnits] = useState("metric");
  const [weather, setWeather] = useState(null);
  const getWeather = async () => {
    await getFormattedWeatherData({ ...query, units }).then((data) => {
      setWeather(data);
    });
  };

  useEffect(() => {
    getWeather();
  }, [query, units]);
  const formatBackground = () => {
    if (!weather) return "from-cyan-600 to-blue-700";
    const threshold = units === "metric" ? 20 : 60;
    if (weather.temp <= threshold) return "from-cyan-600 to-blue-700";
    return "from-yellow-600 to-orange-700";
  };
  return (
    <div
      className={`mx-auto max-w-screen-lg mt-4 py-5 px-32 bg-gradient-to-br shadow-xl shadow-grey-400 ${formatBackground()}`}
    >
      <TopButtons setQuery={setQuery} />
      <Inputs setQuery={setQuery} setUnits={setUnits} />
      {weather && (
        <>
          <TimeandLocation weather={weather} />
          <TemperatureandDetails weather={weather} units={units} />
          <Forecast title="Daily forecast" data={weather.daily} />
        </>
      )}
    </div>
  );
}

export default App;

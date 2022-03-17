import React, { useEffect, useState } from "react";
import { RestCountriesResponse } from "../types/RestCountriesResponse";
import axios from "axios";

interface WeatherResponse {
  weather: { id: number; main: string; description: string; icon: string }[];
  main: { temp: number };
  wind: { speed: number };
}

const CountryOverview: React.FC<{ country: RestCountriesResponse }> = ({
  country: {
    area,
    capital,
    languages,
    flags,
    name: { common },
  },
}) => {
  const [weather, setWeather] = useState<WeatherResponse>();

  useEffect(() => {
    axios
      .get<WeatherResponse>(`http://api.openweathermap.org/data/2.5/weather`, {
        params: { q: capital[0], appid: import.meta.env.VITE_OWM_API_KEY },
      })
      .then((response) => setWeather(response.data));
  }, []);

  return (
    <>
      <h1>{common}</h1>
      <p>capital {capital}</p>
      <p>area {area}</p>
      <h4>languages:</h4>
      <ul>
        {Object.entries(languages).map(([langCode, language]) => (
          <li key={langCode}>{language}</li>
        ))}
      </ul>
      <img src={flags.png} alt="Country flag" />
      <h3>Weather in {capital}</h3>
      <p>temperature {weather?.main.temp} Celsius</p>
      <img
        src={`http://openweathermap.org/img/wn/${weather?.weather[0].icon}@2x.png`}
        alt="Weather icon"
      />
      <p>Wind {weather?.wind.speed} m/s</p>
    </>
  );
};

export default CountryOverview;

import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { RestCountriesResponse } from "./RestCountriesResponse";
import CountryOverview from "./components/CountryOverview";

function App() {
  const [query, setQuery] = useState("");
  const [countries, setCountries] = useState<RestCountriesResponse[]>([]);

  useEffect(() => {
    axios
      .get<RestCountriesResponse[]>("https://restcountries.com/v3.1/all")
      .then((response) => setCountries(response.data));
  }, []);

  const countriesByQuery = useMemo(
    () =>
      countries.filter((country) =>
        country.name.common.toLowerCase().includes(query.toLowerCase())
      ),
    [query]
  );

  const renderCountries = () =>
    countriesByQuery.map((country) => (
      <li key={country.name.common}>{country.name.common}</li>
    ));

  return (
    <>
      <label htmlFor="search-bar">find countries</label>
      <input
        type="text"
        id="search-bar"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
      />
      {query.length !== 0 && countriesByQuery.length > 10 ? (
        <p>Too many matches, specify another filter</p>
      ) : countriesByQuery.length === 1 ? (
        <CountryOverview country={countriesByQuery[0]} />
      ) : (
        <ul>{renderCountries()}</ul>
      )}
    </>
  );
}

export default App;

import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { RestCountriesResponse } from "./types/RestCountriesResponse";
import CountryOverview from "./components/CountryOverview";
import CountryListItem from "./components/CountryListItem";

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
      <CountryListItem key={country.name.official} country={country} />
    ));

  const renderBody = (length: number) => {
    if (length === 1) return <CountryOverview country={countriesByQuery[0]} />;
    else if (length > 1) return <ul>{renderCountries()}</ul>;
    else return <p>Too many matches, specify another filter</p>;
  };

  return (
    <>
      <label htmlFor="search-bar">find countries</label>
      <input
        type="text"
        id="search-bar"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
      />
      {query !== "" && renderBody(countriesByQuery.length)}
    </>
  );
}

export default App;

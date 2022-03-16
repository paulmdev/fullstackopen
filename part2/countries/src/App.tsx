import { useEffect, useMemo, useState } from "react";
import axios from "axios";

interface RestCountriesResponse {
  name: {
    common: string;
    official: string;
    nativeName: string;
  };
}

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

  return (
    <>
      <label htmlFor="search-bar">find countries</label>
      <input
        type="text"
        id="search-bar"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
      />
      <ul>
        {query.length !== 0 && countriesByQuery.length > 10 ? (
          <p>Too many matches, specify another filter</p>
        ) : (
          countriesByQuery.map((country) => (
            <li key={country.name.common}>{country.name.common}</li>
          ))
        )}
      </ul>
    </>
  );
}

export default App;

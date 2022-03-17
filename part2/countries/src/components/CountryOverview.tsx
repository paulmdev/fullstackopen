import React from "react";
import { RestCountriesResponse } from "../types/RestCountriesResponse";

const CountryOverview: React.FC<{ country: RestCountriesResponse }> = ({
  country: {
    area,
    capital,
    languages,
    flags,
    name: { common },
  },
}) => {
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
    </>
  );
};

export default CountryOverview;

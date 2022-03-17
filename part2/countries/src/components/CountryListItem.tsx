import { RestCountriesResponse } from "../types/RestCountriesResponse";
import React, { useState } from "react";
import CountryOverview from "./CountryOverview";

const CountryListItem: React.FC<{ country: RestCountriesResponse }> = ({
  country,
}) => {
  const [show, setShow] = useState(false);
  return (
    <li>
      <p style={{ display: "inline" }}>{country.name.common}</p>
      <button onClick={() => setShow(!show)}>{show ? "hide" : "show"}</button>
      {show && <CountryOverview country={country} />}
    </li>
  );
};

export default CountryListItem;

/**
 * @file ctx/country.jsx
 */

import React, { useState, useContext } from "react";
import { useLocalStorage } from "../hooks/use-local-storage";
import Axios from "axios";

const apiRoot = "https://restcountries.eu/rest/v2";

const CountryContext = React.createContext();
const CountryContextProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [queryRegion, setQueryRegion] = useLocalStorage("-fm-query-region", "");

  const searchForCountries = async (query) => {
    setLoading(true);

    try {
      const endpoint = query === "" ? "all" : `name/${query}`;
      let res = await Axios.get(
        `${apiRoot}/${endpoint}?fields=flag;name;population;region;capital`
      );
      res = res.data.filter(
        (country) => queryRegion === "" || queryRegion === country.region
      );

      setLoading(false);
      return res;
    } catch (err) {
      setLoading(false);
      if (err.response && err.response.status === 404) {
        return { error: "No results found. Try another query." };
      } else {
        console.error(err);
        return { error: "An unexpected error occured. Try again later." };
      }
    }
  };

  const getCountry = async (fullName) => {
    setLoading(true);

    try {
      const res = await Axios.get(`${apiRoot}/name/${fullName}?fullText=true`);
      let data = res.data[0];
      let resolvedBorders = [];
      for (const bdr of data.borders) {
        const bdrRes = await Axios.get(`${apiRoot}/alpha/${bdr}?fields=name`);
        resolvedBorders.push(bdrRes.data.name);
      }
      setLoading(false);
      return { ...data, resolvedBorders };
    } catch (err) {
      setLoading(false);
      if (err.response && err.response.status === 404) {
        return { error: `Country '${fullName}' not found.` };
      } else {
        console.error(err);
        return { error: "An unexpected error occured. Try again later." };
      }
    }
  };

  return (
    <CountryContext.Provider
      value={{
        loading,
        queryRegion,
        setQueryRegion,
        searchForCountries,
        getCountry,
      }}
    >
      {children}
    </CountryContext.Provider>
  );
};

export default CountryContextProvider;
export const useCountryContext = () => useContext(CountryContext);

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
  const [lastSearch, setLastSearch] = useLocalStorage("-fm-last-search", "");
  const [queryRegion, setQueryRegion] = useLocalStorage("-fm-query-region", "");

  const searchForCountries = async (query) => {
    // Set the loading flag to true.
    setLoading(true);

    try {
      // Fetch the 'all' endpoint if no query was input.
      const endpoint = query === "" ? "all" : `name/${query}`;
      let res = await Axios.get(
        `${apiRoot}/${endpoint}?fields=flag;name;population;region;capital`
      );

      // Filter countries by region, if one was provided.
      res = res.data.filter(
        (country) => queryRegion === "" || queryRegion === country.region
      );

      // Save the last search in local storage before finishing up.
      setLastSearch(query);
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
      // Fetch the country with the given name.
      const res = await Axios.get(`${apiRoot}/name/${fullName}?fullText=true`);

      // The countries in the 'borders' array are shown in three-letter country codes.
      // Fetch from the API in order to resolve those country codes to actual country names.
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
        lastSearch,
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

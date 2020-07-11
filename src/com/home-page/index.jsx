/**
 * @file com/home-page/index.jsx
 */

import React, { useState, useEffect } from "react";
import { useCountryContext } from "../../ctx/country";
import CountryCard from "../country-card";
import "./index.scss";

const HomePage = () => {
  const {
    loading,
    lastSearch,
    queryRegion,
    setQueryRegion,
    searchForCountries,
  } = useCountryContext();
  const [query, setQuery] = useState(lastSearch);
  const [countries, setCountries] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    document.title =
      "Frontend Mentor | REST Countries API with Color Theme Switcher";
  }, []);

  useEffect(() => {
    const search = async () => {
      setError("");

      const res = await searchForCountries(query);
      if (res.error) {
        setError(res.error);
      } else {
        setCountries(res);
      }
    };

    // Create a debounce here. Do a search 500 milliseconds after the last input into
    // this text box.
    const timeout = setTimeout(search, 500);
    return () => clearTimeout(timeout);
  }, [query, queryRegion]);

  return (
    <section className="page home">
      <div className="container home__container">
        <div className="home__control">
          <div className="home__search">
            <p className="home__search-icon">
              <i className="fas fa-search"></i>
            </p>
            <input
              type="text"
              className="home__search-input"
              aria-label="Search for a country"
              placeholder="Search for a country"
              value={query}
              onChange={(ev) => setQuery(ev.target.value)}
              tabIndex={1}
            />
          </div>
          <select
            name="region"
            id="region"
            className="home__region-select"
            value={queryRegion}
            onChange={(ev) => setQueryRegion(ev.target.value)}
            tabIndex={2}
          >
            <option value="">All Regions</option>
            <option value="Africa">Africa</option>
            <option value="Americas">America</option>
            <option value="Asia">Asia</option>
            <option value="Europe">Europe</option>
            <option value="Oceania">Oceania</option>
          </select>
        </div>
        <div className="home__results">
          {loading === true && <p className="text home__loading">Loading...</p>}
          {loading === false && error !== "" && (
            <p className="text home__error">Error: {error}</p>
          )}
          {loading === false &&
            error === "" &&
            countries.map((country, index) => (
              <CountryCard key={index} index={index + 3} country={country} />
            ))}
        </div>
      </div>
    </section>
  );
};

export default HomePage;

/**
 * @file com/country-page/index.jsx
 */

import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useCountryContext } from "../../ctx/country";
import { formatNumber } from "../../lib/format-number";

const CountryPage = () => {
  const { name } = useParams();
  const history = useHistory();
  const { getCountry, loading } = useCountryContext();
  const [country, setCountry] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    document.title = `Searching... - Frontend Mentor | REST Countries API with Color Theme Switcher`;

    (async () => {
      setError("");
      setCountry(null);
      const res = await getCountry(name);

      if (res.error) {
        document.title = `Error - Frontend Mentor | REST Countries API with Color Theme Switcher`;
        setError(res.error);
      } else {
        document.title = `${res.name} - Frontend Mentor | REST Countries API with Color Theme Switcher`;
        setCountry(res);
      }
    })();
  }, []);

  return (
    <section className="page country">
      <div className="container country__container">
        <button className="country__back" onClick={() => history.push("/")}>
          <i className="fas fa-arrow-left"></i> Back
        </button>
        {loading === true && (
          <p className="text country__loading">Loading...</p>
        )}
        {loading === false && error !== "" && (
          <p className="text country__error">Error: {error}</p>
        )}
        {loading === false && error === "" && country && (
          <div className="country__body">
            <img
              src={country.flag}
              alt={country.name}
              className="country__flag"
            />
            <div className="country__details">
              <h2 className="heading country__name">{country.name}</h2>
              <p className="text country__detail">
                <strong className="country__detail-name">Native Name: </strong>
                {country.nativeName}
              </p>
              <p className="text country__detail">
                <strong className="country__detail-name">Population: </strong>
                {formatNumber(country.population)}
              </p>
              <p className="text country__detail">
                <strong className="country__detail-name">Region: </strong>
                {country.region}
              </p>
              <p className="text country__detail">
                <strong className="country__detail-name">Sub Region: </strong>
                {country.subregion}
              </p>
              <p className="text country__detail country__detail--with-margin">
                <strong className="country__detail-name">Capital: </strong>
                {country.capital}
              </p>
              <p className="text country__detail">
                <strong className="country__detail-name">
                  Top Level Domain(s):{" "}
                </strong>
                {country.topLevelDomain.map((tld, index) =>
                  index === 0 ? tld : `, ${tld}`
                )}
              </p>
              <p className="text country__detail">
                <strong className="country__detail-name">Currencies: </strong>
                {country.currencies.map((currency, index) =>
                  index === 0 ? currency.name : `, ${currency.name}`
                )}
              </p>
              <p className="text country__detail">
                <strong className="country__detail-name">Languages: </strong>
                {country.languages.map((language, index) =>
                  index === 0 ? language.name : `, ${language.name}`
                )}
              </p>
              {country.resolvedBorders.length > 0 && (
                <div className="country__border-countries">
                  <h3>Border Countries</h3>
                  <div className="country__border-countries-button-strip">
                    {country.resolvedBorders.map((border, index) => (
                      <button
                        key={index}
                        className="country__border-country-button"
                        onClick={() => history.push(`/${border}`)}
                      >
                        {border}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default CountryPage;

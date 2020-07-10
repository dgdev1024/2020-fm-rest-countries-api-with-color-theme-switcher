/**
 * @file com/country-card/index.jsx
 */

import React from "react";
import { useHistory } from "react-router-dom";
import { formatNumber } from "../../lib/format-number";

const CountryCard = ({ country, index }) => {
  const history = useHistory();

  const navigateToCountryPage = () => {
    history.push(`/${country.name}`);
  };

  return (
    <div
      className="country-card"
      aria-label={`View details on ${country.name}`}
      role="button"
      onClick={navigateToCountryPage}
    >
      <img
        src={country.flag}
        alt={country.name}
        className="country-card__image"
      />
      <div className="country-card__details">
        <h2 className="heading country-card__name">{country.name}</h2>
        <p className="text country-card__detail">
          <strong className="country-card__detail-name">Population: </strong>
          {formatNumber(country.population)}
        </p>
        <p className="text country-card__detail">
          <strong className="country-card__detail-name">Region: </strong>
          {country.region}
        </p>
        <p className="text country-card__detail">
          <strong className="country-card__detail-name">Capital: </strong>
          {country.capital}
        </p>
      </div>
    </div>
  );
};

export default CountryCard;

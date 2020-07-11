/**
 * @file com/header/index.jsx
 */

import React from "react";
import { useLocalStorage } from "../../hooks/use-local-storage";
import "./index.scss";

const Header = ({ dark, toggleDark }) => {
  return (
    <header className="header">
      <div className="container header__container">
        <h1 className="heading header__heading">Where in the world?</h1>
        <button className="header__button" onClick={toggleDark}>
          {dark === false ? (
            <>
              <i className="far fa-moon" /> Dark Mode
            </>
          ) : (
            <>
              <i className="far fa-sun" /> Light Mode
            </>
          )}
        </button>
      </div>
    </header>
  );
};

export default Header;

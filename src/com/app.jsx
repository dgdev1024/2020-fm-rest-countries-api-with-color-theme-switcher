/**
 * @file com/app.jsx
 */

import React, { useEffect } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import HomePage from "./home-page";
import CountryPage from "./country-page";
import CountryContextProvider from "../ctx/country";

const InnerApp = () => {
  return (
    <main className="main">
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/:name" render={() => <CountryPage key={Date.now()} />} />
      </Switch>
    </main>
  );
};

const OuterApp = () => (
  <BrowserRouter>
    <CountryContextProvider>
      <InnerApp />
    </CountryContextProvider>
  </BrowserRouter>
);

export default OuterApp;

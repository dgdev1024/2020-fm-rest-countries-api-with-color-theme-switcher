/**
 * @file com/app.jsx
 */

import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { useLocalStorage } from "../hooks/use-local-storage";
import Header from "./header";
import HomePage from "./home-page";
import CountryPage from "./country-page";
import CountryContextProvider from "../ctx/country";

const InnerApp = () => {
  const [dark, setDark] = useLocalStorage("-fm-dark-mode", false);
  const toggleDark = () => setDark(!dark);

  return (
    <main className={`main ${dark && "main--dark"}`}>
      <Header dark={dark} toggleDark={toggleDark} />
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

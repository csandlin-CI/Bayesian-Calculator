import React, { useEffect, useContext } from "react";
import { Route, Switch } from "react-router-dom";
import { APIProvider } from "./API";
import { Home } from "./Home";
import { APIContext } from "./API";
import { ResultsPage } from "./ResultsPage";

export const ApplicationViews = () => {
  return (
    <>
      <APIProvider>
        <Route exact path="/">
          <Home />
        </Route>
      </APIProvider>
      <Route exact path="/:id">
        <ResultsPage />
      </Route>
    </>
  );
};

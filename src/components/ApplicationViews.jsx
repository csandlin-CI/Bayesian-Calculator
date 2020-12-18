import React, { useContext } from "react";
import { Route, Switch } from "react-router-dom";
import { APIProvider } from "./API";
import { Home } from "./Home";
import { APIContext } from "./API";
import { ExperimentPage } from "./ExperimentPage";

export const ApplicationViews = () => {
  return (
    <>
      <APIProvider>
        <Route exact path="/">
          <Home />
        </Route>
      </APIProvider>
      <Route exact path="/:id">
        <ExperimentPage />
      </Route>
    </>
  );
};

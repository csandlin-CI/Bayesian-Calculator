import React, { useEffect, useContext } from "react";
import { Route, Switch } from "react-router-dom";
import { APIProvider } from "./API";
import { Home } from "./Home";
import { APIContext } from "./API";
import { ResultsPage } from "./ResultsPage";

export const ApplicationViews = () => {
  const { listOfTests, getListOfTests } = useContext(APIContext);

  useEffect(() => {
    getListOfTests();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    console.log("UPDATED list of tests");
    console.log(listOfTests);
  }, [listOfTests]);

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

      {/* {listOfTests.map((lot) => (
        <APIProvider key={lot.id}>
          <Route path="/:id">
            <ResultsPage />
          </Route>
        </APIProvider>
      ))} */}
    </>
  );
};

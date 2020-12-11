import { Route, Redirect } from "react-router-dom";
import React, { Component } from "react";
import { withRouter } from "react-router";

function ApplicationViews() {
  return (
    <>
      <Route
        exact
        path="/"
        render={(props) => {
          return (
            <>
              <h1>Home Component</h1>
            </>
          );
        }}
      />
    </>
  );
}

export default withRouter(ApplicationViews);

import React, { useContext, useEffect } from "react";
import { APIContext } from "./API";
import { useParams } from "react-router-dom";

export const ResultsPage = () => {
  let { id } = useParams();
  return <h5>{id}</h5>;
};

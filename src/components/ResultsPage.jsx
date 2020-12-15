import React, { useContext, useEffect, useState } from "react";
import { APIContext } from "./API";
import { useParams } from "react-router-dom";

export const ResultsPage = () => {
  let { id } = useParams();
  const { singleTest, getSingleTest } = useContext(APIContext);

  useEffect(() => {
    getSingleTest(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {}, [singleTest]);

  return (
    <>
      <h5>{id}</h5>
      <p>
        {singleTest === null
          ? "not here"
          : ` ${singleTest.confidence_threshold}`}
      </p>
    </>
  );
};

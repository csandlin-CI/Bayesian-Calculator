import React, { useContext, useEffect, useState } from "react";
import { APIContext } from "./API";
import { useParams } from "react-router-dom";

export const ResultsPage = () => {
  let { id } = useParams();
  const { singleTest, getSingleTest } = useContext(APIContext);
  const { bayCalc, getBayCalc } = useContext(APIContext);
  const [metrics, setMetrics] = useState([]);

  useEffect(() => {
    getSingleTest(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {}, [singleTest]);

  useEffect(() => {
    const metrics = singleTest.metrics;
    if (metrics !== undefined) {
      setMetrics(metrics);
    }
  }, [singleTest]);

  //   useEffect(() => console.log(metrics), [metrics]);

  useEffect(() => {
    for (let i = 0; i < metrics.length; i++) {
      for (let key in metrics[i].results) {
        console.log(metrics[i].name, metrics[i].results[key]);
      }
    }
  }, [metrics]);

  //   useEffect(() => {
  //     getBayCalc(100, 10, 25, 100, 25, 50);
  //     // eslint-disable-next-line react-hooks/exhaustive-deps
  //   }, []);

  //   useEffect(() => {}, [bayCalc]);

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

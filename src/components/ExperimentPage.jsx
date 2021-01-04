import React, { useContext, useEffect, useState } from "react";
import { APIContext } from "./API";
import { useParams } from "react-router-dom";
import { Metric } from "./Metric";

export const ExperimentPage = () => {
  let { id } = useParams();
  const { singleTest, getSingleTest } = useContext(APIContext);
  const { singleTestMeta, getSingleTestMeta } = useContext(APIContext);
  const { bayCalc, getBayCalc } = useContext(APIContext);
  const [metrics, setMetrics] = useState([]);

  //Fetch the test results that match the id in the URL and experiment id in optimizely
  useEffect(() => {
    getSingleTest(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    getSingleTestMeta(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {}, [singleTest, singleTestMeta]);

  // From the fetched experiment results, single out the metrics portion of the JSON and set in state
  useEffect(() => {
    const metrics = singleTest.metrics;
    if (metrics !== undefined) {
      setMetrics(metrics);
    }
  }, [singleTest]);

  // useEffect(() => {
  //   console.log("singleTest", singleTest);
  //   console.log("singleTestMeta", singleTestMeta);
  //   console.log("metrics", metrics);
  // }, [metrics]);

  // // Run through the metrics and seperate each result out
  // useEffect(() => {
  //   for (let i = 0; i < metrics.length; i++) {
  //     for (let key in metrics[i].results) {
  //       console.log(metrics[i].name, metrics[i].results[key]);
  //     }
  //   }
  // }, [metrics]);

  //   useEffect(() => {
  //     getBayCalc(100, 10, 25, 100, 25, 50);
  //     // eslint-disable-next-line react-hooks/exhaustive-deps
  //   }, []);

  //   useEffect(() => {}, [bayCalc]);

  return (
    <>
      <h2>{singleTestMeta.name}</h2>
      <p>ID:{id}</p>
      <p>
        {singleTest.length === 0 ? "Loading..." : ` ${singleTest.end_time}`}
      </p>
      {metrics.map((met, index) => {
        return <Metric key={met.event_id + index} metricData={met} />;
      })}
    </>
  );
};

import React, { useContext, useEffect } from "react";
import { APIContext } from "./API";
import { Link } from "react-router-dom";

export const Metric = ({ metricData }) => {
  useEffect(() => {
    console.log("metricData", metricData);
  }, [metricData]);
  return (
    <p>
      {metricData.event_id !== undefined ? <>{metricData.name}</> : <>{null}</>}
    </p>
  );
};

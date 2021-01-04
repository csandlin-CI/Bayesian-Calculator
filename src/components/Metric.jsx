import React, { useContext, useEffect, useState } from "react";
import { APIContext } from "./API";
import { Link } from "react-router-dom";

export const Metric = ({ metricData }) => {
  useEffect(() => {
    console.log("metricData", metricData);
  }, [metricData]);

  function generateTableEl() {
    let dom = [];

    for (let i = 0; i < Object.keys(metricData.results).length - 1; i++) {
      for (let key in metricData.results) {
        console.log(
          `metricData | ${key} | ${metricData.name} | ${metricData.aggregator}`
        );
        dom.push(
          <tr key={metricData.results[key].rate + i}>
            <td>{metricData.results[key].name}</td>

            <td>
              {metricData.results[key].value}
              <br></br>
              {metricData.results[key].samples}
            </td>
            <td>{metricData.results[key].rate}</td>
          </tr>
        );
      }
    }
    dom.reverse();
    return dom;
  }

  // // Run through the metricData and seperate each result out
  // useEffect(() => {
  //   for (let key in metricData.results) {
  //     // console.log(metricData.name, metricData.results[key].samples);
  //   }
  // }, [metricData]);

  return (
    <>
      <h4 className="metric-title">
        {metricData.event_id !== undefined ? (
          <>{metricData.name}</>
        ) : (
          <>{null}</>
        )}
      </h4>
      <p className="metric-description">
        Increase in
        <em>
          {metricData.aggregator === "unique" ? " unique" : " total"}
          {" conversions"}
        </em>{" "}
        per visitor for {metricData.name} event
      </p>

      <table className="metric-table">
        <thead>
          <tr>
            <th> </th>
            <th>
              Unique Conversions<br></br>Visitors
            </th>
            <th>
              {metricData.aggregator === "unique"
                ? "Conversion Rate"
                : "Conversions Per Visitor"}
            </th>
            <th>
              Improvement<br></br>Bayesian Improvement
            </th>
            <th>
              Stat Sig<br></br>Bayesian Stat Sig
            </th>
          </tr>
        </thead>
        <tbody>{generateTableEl()}</tbody>
      </table>
    </>
  );
};

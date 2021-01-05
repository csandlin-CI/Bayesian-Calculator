import React, { useContext, useEffect, useState } from "react";
import { APIContext } from "./API";
import { Link } from "react-router-dom";

export const Metric = ({ metricData }) => {
  useEffect(() => {
    console.log("metricData", metricData);
  }, [metricData]);

  function convPerVisitor(num) {
    return +(Math.round(num + "e+3") + "e-3");
  }

  function convRate(num) {
    let newNum = num * 100;
    return +(Math.round(newNum + "e+2") + "e-2") + "%";
  }

  function generateTableEl() {
    let domList = [];

    for (let i = 0; i < Object.keys(metricData.results).length - 1; i++) {
      for (let key in metricData.results) {
        // console.log(
        //   `metricData | ${key} | ${metricData.name} | ${metricData.aggregator}`
        // );
        domList.push(
          <tr key={metricData.results[key].rate + i}>
            <td>{metricData.results[key].name}</td>

            <td>
              {metricData.results[key].value}
              <br></br>
              {metricData.results[key].samples}
            </td>
            <td>
              {metricData.aggregator === "unique"
                ? convRate(metricData.results[key].rate)
                : convPerVisitor(metricData.results[key].rate)}
            </td>
            <td>
              {/* if it has the lift object and it's positive, add a plus in front */}
              {metricData.results[key].hasOwnProperty("lift") &&
              metricData.results[key].lift.lift_status === "better"
                ? "+"
                : ""}
              {metricData.results[key].hasOwnProperty("lift")
                ? convRate(metricData.results[key].lift.value)
                : "—"}
            </td>
            <td>
              {metricData.results[key].hasOwnProperty("lift")
                ? metricData.results[key].lift.significance >= 1
                  ? metricData.results[key].lift.significance
                  : "<1%"
                : "—"}
            </td>
          </tr>
        );
      }
    }
    domList.reverse();
    return domList;
  }

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

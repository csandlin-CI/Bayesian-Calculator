import React, { useContext, useEffect, useState } from "react";
import { APIContext } from "./API";
import { Link } from "react-router-dom";
import { TableRow } from "./TableRow";

export const Metric = ({ metricData }) => {
  const { bayCalc, getBayCalc } = useContext(APIContext);
  const [bayesianNums, setBayesianNums] = useState({});

  // CustA, convA, reveA, custB, convB, reveB;

  let optimizelyNums = [];
  let tableRowArray = [];

  function convPerVisitor(num) {
    return +(Math.round(num + "e+3") + "e-3");
  }

  function convRate(num) {
    let newNum = num * 100;
    return +(Math.round(newNum + "e+2") + "e-2") + "%";
  }

  // useEffect(() => {
  //   for (let i = 0; i < Object.keys(metricData.results).length - 1; i++) {
  //     for (let key in metricData.results) {
  //       console.log(
  //         `metricData | ${key} | ${metricData.results[key].name} | ${metricData.aggregator}`
  //       );

  //       optimizelyNums.push(
  //         metricData.results[key].samples,
  //         metricData.results[key].value
  //       );
  //     }
  //   }
  //   getBayCalc(1000, 100, 0, 1000, 110, 0).then(() => console.log(bayCalc));
  // }, [metricData]);

  function generateTableRows() {
    for (let i = 0; i < Object.keys(metricData.results).length - 1; i++) {
      console.log("metricData", metricData);
      for (let key in metricData.results) {
        console.log(
          `!!metricData | ${key} | ${metricData.results[key].name} | ${metricData.aggregator}`,
          metricData.results[key]
        );

        // optimizelyNums.push(
        //   metricData.results[key].samples,
        //   metricData.results[key].value
        // );
        tableRowArray.push(
          <TableRow metricData={metricData} outerLoopKey={key} iteration={i} />
        );

        // return <TableRow metricData={metricData} />;
        //****** if you return above, it stops the loop. Remove other loop from TableRow and figure out how to make it loop here but not in table row
      }
    }
    return tableRowArray;
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
        {generateTableRows()}
      </table>
    </>
  );
};

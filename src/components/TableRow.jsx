import React, { useContext, useEffect, useState } from "react";
import { APIContext } from "./API";
import { Link } from "react-router-dom";

export const TableRow = ({ metricData, outerLoopKey, iteration }) => {
  const { bayCalc, getBayCalc } = useContext(APIContext);
  const [bayesianNums, setBayesianNums] = useState({});

  // CustA, convA, reveA, custB, convB, reveB;

  let optimizelyNums = [];

  function convPerVisitor(num) {
    return +(Math.round(num + "e+3") + "e-3");
  }

  function convRate(num) {
    let newNum = num * 100;
    return +(Math.round(newNum + "e+2") + "e-2") + "%";
  }

  function generateTableEl() {
    let domList = [];

    return (
      <tr key={metricData.results[outerLoopKey].rate + iteration}>
        <td>{metricData.results[outerLoopKey].name}</td>

        <td>
          {metricData.results[outerLoopKey].value}
          <br></br>
          {metricData.results[outerLoopKey].samples}
        </td>
        <td>
          {metricData.aggregator === "unique"
            ? convRate(metricData.results[outerLoopKey].rate)
            : convPerVisitor(metricData.results[outerLoopKey].rate)}
        </td>
        <td>
          {/* if it has the lift object and it's positive, add a plus in front */}
          {metricData.results[outerLoopKey].hasOwnProperty("lift") &&
          metricData.results[outerLoopKey].lift.lift_status === "better"
            ? "+"
            : ""}
          {metricData.results[outerLoopKey].hasOwnProperty("lift")
            ? convRate(metricData.results[outerLoopKey].lift.value)
            : "—"}
        </td>
        <td className="stat-sig">
          {metricData.results[outerLoopKey].hasOwnProperty("lift")
            ? metricData.results[outerLoopKey].lift.significance >= 1
              ? metricData.results[outerLoopKey].lift.significance
              : "< 1%"
            : "—"}
        </td>
      </tr>
    );

    for (let i = 0; i < Object.keys(metricData.results).length - 1; i++) {
      for (let key in metricData.results) {
        // console.log(
        //   `metricData | ${key} | ${metricData.name} | ${metricData.aggregator}`
        // );

        // optimizelyNums.push(
        //   metricData.results[key].samples,
        //   metricData.results[key].value
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
            <td className="stat-sig">
              {metricData.results[key].hasOwnProperty("lift")
                ? metricData.results[key].lift.significance >= 1
                  ? metricData.results[key].lift.significance
                  : "< 1%"
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
      <tbody>{generateTableEl()}</tbody>
    </>
  );
};

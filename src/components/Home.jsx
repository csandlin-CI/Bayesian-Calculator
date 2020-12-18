import React, { useContext, useEffect } from "react";
import { APIContext } from "./API";
import { Link } from "react-router-dom";

export const Home = () => {
  const { listOfTests, getListOfTests } = useContext(APIContext);

  useEffect(() => {
    getListOfTests();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {}, [listOfTests]);

  // useEffect(() => console.log(listOfTests), [listOfTests]);

  return (
    <div>
      {listOfTests.map((lot) =>
        lot.status !== "not_started" ? (
          <div key={lot.id} className="test-line-item">
            <Link to={`${lot.id}`}>{lot.name}</Link>
            <p>{lot.status}</p>
          </div>
        ) : (
          <div key={lot.id}>{null}</div>
        )
      )}
    </div>
  );
};

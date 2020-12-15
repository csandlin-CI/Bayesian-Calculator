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

  return (
    <div>
      {listOfTests.map((lot) => (
        <div key={lot.id} className="test-line-item">
          <Link to={`${lot.id}`}>{lot.name}</Link>
        </div>
      ))}
    </div>
  );
};

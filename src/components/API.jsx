import React, { useState } from "react";

/*
    The context is imported and used by individual components
    that need data
*/
export const APIContext = React.createContext();

/*
 This component establishes what data can be used.
 */

export const APIProvider = (props) => {
  const [listOfTests, setListOfTests] = useState([]);
  const [singleTest, setSingleTest] = useState([]);

  const getListOfTests = () => {
    return fetch(
      "https://api.optimizely.com/v2/search?per_page=25&page=1&project_id=23874797&query=&type=campaign&type=experiment&sort=last_modified&order=desc&archived=false&expand=experiment_type",
      {
        headers: new Headers({
          Authorization:
            "Bearer 2:1NrjxYXe1NHK3h1qaj1bmT2X6sU2vS-aWdRmSbq918Z9LHUrno3Y",
        }),
      }
    )
      .then((e) => e.json())
      .then(setListOfTests);
  };
  const getSingleTest = (experiment_id) => {
    return fetch(
      `https://api.optimizely.com/v2/experiments/${experiment_id}/results`,
      {
        headers: new Headers({
          Authorization:
            "Bearer 2:1NrjxYXe1NHK3h1qaj1bmT2X6sU2vS-aWdRmSbq918Z9LHUrno3Y",
        }),
      }
    )
      .then((e) => e.json())
      .then(setSingleTest);
  };
  return (
    <APIContext.Provider
      value={{
        listOfTests,
        getListOfTests,
        singleTest,
        getSingleTest,
      }}
    >
      {props.children}
    </APIContext.Provider>
  );
};

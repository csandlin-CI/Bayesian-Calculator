import React, { useState } from "react";

// &status=running
// &status=paused

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
  const [singleTestMeta, setSingleTestMeta] = useState([]);
  const [bayCalc, setBayCalc] = useState([]);

  function handleErrors(response) {
    if (!response.ok) throw Error(response.statusText);
    // console.log("response", response);
    return response;
  }

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
      .then(handleErrors)
      .then((e) => e.json())
      .then(setListOfTests)
      .catch((error) => console.log(error));
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
      .then(handleErrors)
      .then((e) => e.json())
      .then(setSingleTest)
      .catch((error) => console.log(error));
  };
  const getSingleTestMeta = (experiment_id) => {
    return fetch(`https://api.optimizely.com/v2/experiments/${experiment_id}`, {
      headers: new Headers({
        Authorization:
          "Bearer 2:1NrjxYXe1NHK3h1qaj1bmT2X6sU2vS-aWdRmSbq918Z9LHUrno3Y",
      }),
    })
      .then(handleErrors)
      .then((e) => e.json())
      .then(setSingleTestMeta)
      .catch((error) => console.log(error));
  };
  const getBayCalc = (custA, convA, reveA, custB, convB, reveB) => {
    return fetch(
      `https://prod.integrations.exponea.com/arpu?custA=${custA}&convA=${convA}&reveA=${reveA}&custB=${custB}&convB=${convB}&reveB=${reveB}`
    )
      .then(handleErrors)
      .then((e) => e.json())
      .then(setBayCalc)
      .catch((error) => console.log(error));
  };
  return (
    <APIContext.Provider
      value={{
        listOfTests,
        getListOfTests,
        singleTest,
        getSingleTest,
        singleTestMeta,
        getSingleTestMeta,
        bayCalc,
        getBayCalc,
      }}
    >
      {props.children}
    </APIContext.Provider>
  );
};

import "./App.css";
import ApplicationViews from "./components/ApplicationViews";
import API from "./components/API";

function App() {
  /* 
  test call to get list of tests and log in console

  let listOfTests;
  const getOptimizelyData = () => {
    listOfTests = API.getListOfTests();
    return listOfTests;
  };
  getOptimizelyData();
  console.log(listOfTests); 
  
  */

  /* 
  sample call to bayesian calc
  https://prod.integrations.exponea.com/arpu?custA=100&convA=10&reveA=25&custB=100&convB=25&reveB=50%27).done(function(json)

  */

  return (
    <div className="App">
      <div className="App-Main">
        <ApplicationViews />
      </div>
    </div>
  );
}

export default App;

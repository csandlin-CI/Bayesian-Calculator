const API = {
  getListOfTests: () => {
    return fetch(
      "https://api.optimizely.com/v2/search?per_page=25&page=1&project_id=23874797&query=&type=campaign&type=experiment&sort=last_modified&order=desc&archived=false&expand=experiment_type",
      {
        headers: new Headers({
          Authorization:
            "Bearer 2:1NrjxYXe1NHK3h1qaj1bmT2X6sU2vS-aWdRmSbq918Z9LHUrno3Y",
        }),
      }
    ).then((e) => e.json());
  },
};
export default API;

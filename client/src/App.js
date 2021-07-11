import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import NavBar from "./components/NavBar";
import Home from "./components/Home";
import Problems from "./components/Problems";
import ProblemInfo from "./components/ProblemInfo";
import Profile from "./components/Profile";
import CreateProblem from "./components/CreateProblem";
import { getUserInfo } from "./api/api";

function App() {
  const [authData, setAuthData] = useState(false);

  useEffect(() => {
    async function fetchUserInfo() {
      try {
        const { data } = await getUserInfo();
        if (!data.message) setAuthData(data);
      } catch (error) {
        console.log("Server is inactive !");
      }
    }
    fetchUserInfo();
  }, []);

  return (
    <Router>
      <NavBar authData={authData} setAuthData={setAuthData} />
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/problems/create" component={CreateProblem} />
        <Route path="/problems/:id" component={ProblemInfo} />
        <Route path="/problems" component={Problems} />
        <Route path="/profile/:id" component={Profile} />
      </Switch>
    </Router>
  );
}

export default App;

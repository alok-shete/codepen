import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
// import PlayGround from "./routes/PlayGround";
// import Navbar from "./components/Navbar";

// import all routes
import Home from "./routes/home/Home";
import Login from "./routes/login/Login";
import Registration from "./routes/registration/Registration";
import Create from "./routes/create/Create";
import EditProject from "./routes/editProject/EditProject";
// import auth

import { AuthRoute } from "./auth/Auth.route";

import { NonAuthRoute } from "./auth/NonAuth.route";

function App() {
  return (
    <>
      <Router>
        <Switch>
          <AuthRoute exact path="/" component={Home} />
          <AuthRoute exact path="/create" component={Create} />
          <AuthRoute exact path="/project/:id" component={EditProject} />
          <NonAuthRoute exact path="/registration" component={Registration} />
          <NonAuthRoute exact path="/login" component={Login} />
          <Route path="*" component={() => "404 NOT FOUND"} />
        </Switch>
      </Router>
    </>
  );
}

export default App;

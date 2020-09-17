import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "./core/Home";
import Dashboard from "./user/Dashboard";
import Signin from "./user/Signin";
import Signup from "./user/Signup";

function Routes(props) {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/dashboard" exact component={Dashboard} />
        <Route path="/signin" exact component={Signin} />
        <Route path="/signup" exact component={Signup} />
      </Switch>
    </BrowserRouter>
  );
}

export default Routes;

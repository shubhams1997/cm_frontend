import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import AdminRoute from "./auth/helper/AdminRoute";
import PrivateRoute from "./auth/helper/PrivateRoute";
import Home from "./core/Home";
import AllUsers from "./admin/AllUsers";
import CategoryBrand from "./user/CategoryBrand";
import Customers from "./user/Customers";
import Dashboard from "./user/Dashboard";
import Product from "./user/Product";
import Signin from "./user/Signin";
import Signup from "./user/Signup";

function Routes(props) {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/signin" exact component={Signin} />
        <AdminRoute path="/signup" exact component={Signup} />
        <AdminRoute path="/allusers" exact component={AllUsers} />
        <PrivateRoute path="/dashboard" exact component={Dashboard} />
        <PrivateRoute path="/categoryBrand" exact component={CategoryBrand} />
        <PrivateRoute path="/products" exact component={Product} />
        <PrivateRoute path="/customers" exact component={Customers} />
      </Switch>
    </BrowserRouter>
  );
}

export default Routes;

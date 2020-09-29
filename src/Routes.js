import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import AdminRoute from "./auth/helper/AdminRoute";
import PrivateRoute from "./auth/helper/PrivateRoute";
import Home from "./core/Home";
import AllUsers from "./admin/AllUsers";
import CategoryBrand from "./user/CategoryBrand";
import Complaint from "./user/Complaint";
import Dashboard from "./user/Dashboard";
import Product from "./user/Product";
import Signin from "./user/Signin";
import Signup from "./user/Signup";
import AllProducts from "./user/AllProducts";
import UpdateProduct from "./user/UpdateProduct";
import AllComplaints from "./user/AllComplaints";
import UpdateComplaint from "./user/UpdateComplaint";
import Finance from "./user/finance/Finance";
import AllFinance from "./user/finance/AllFinance";
import Statement from "./user/finance/Statement";
import Series from "./user/finance/Series";

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
        <PrivateRoute path="/complaint" exact component={Complaint} />
        <PrivateRoute path="/finance" exact component={Finance} />
        <PrivateRoute path="/series" exact component={Series} />
        <PrivateRoute path="/allproducts" exact component={AllProducts} />
        <PrivateRoute path="/allcomplaints" exact component={AllComplaints} />
        <PrivateRoute path="/finances" exact component={AllFinance} />
        <PrivateRoute
          path="/statement/:financeId"
          exact
          component={Statement}
        />
        <PrivateRoute
          path="/product/update/:productId"
          exact
          component={UpdateProduct}
        />
        <PrivateRoute
          path="/complaint/update/:complaintId"
          exact
          component={UpdateComplaint}
        />
      </Switch>
    </BrowserRouter>
  );
}

export default Routes;

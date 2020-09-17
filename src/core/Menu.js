import React from "react";
import { Link, withRouter } from "react-router-dom";

const currentTab = (history, path) => {
  if (history.location.pathname === path) {
    return { color: "rgb(7,107,255)" };
  } else {
    return { color: "rbg(51,51,51)" };
  }
};

const Menu = ({ history, username = "User", role = 0 }) => {
  return (
    <>
      <nav className="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
        <span className="navbar-brand col-sm-3 col-md-2 mr-0">
          Deepak Electronics
        </span>
        <ul className="navbar-nav px-3">
          <li className="nav-item text-nowrap">
            <Link className="nav-link" to="/signout">
              Sign out
            </Link>
          </li>
        </ul>
      </nav>
      <nav className="col-md-2 d-none d-md-block bg-light sidebar">
        <div className="sidebar-sticky">
          <ul className="nav flex-column">
            <li className="nav-item">
              <span className="nav-link">{username} </span>
            </li>
            <li className="nav-item ">
              <span className="nav-link text-info">{role} </span>
            </li>
            <div class="dropdown-divider"></div>
            <li className="nav-item">
              <Link
                style={currentTab(history, "/dashboard")}
                to="/dashboard"
                className="nav-link"
              >
                Dashboard
              </Link>
            </li>
            <li className="nav-item">
              <Link
                style={currentTab(history, "/categoryBrand")}
                to="/categoryBrand"
                className="nav-link"
              >
                Category & Brand
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/products">
                Products
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/customers">
                Customers
              </Link>
            </li>
            <li className="nav-item">
              <Link
                style={currentTab(history, "/signup")}
                className="nav-link"
                to="/signup"
              >
                Create Employee
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/">
                Integrations
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
};

export default withRouter(Menu);

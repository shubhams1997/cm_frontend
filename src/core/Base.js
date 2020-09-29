import React from "react";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../auth/helper";
import Menu from "./Menu";

const Base = ({
  title = "Title",
  description = "",
  sideOptionData = "",
  sideOptionDataTwo = "",
  children,
}) => {
  const { user } = isAuthenticated();

  const sideOption = (data) => {
    return (
      <Link className="btn btn-sm btn-outline-secondary text-dark" to={data.to}>
        {data.value}
      </Link>
    );
  };

  const sideOptionTwo = (data) => {
    return (
      <div className="btn-group mr-2">
        <button className="btn btn-sm btn-outline-secondary">
          <Link className="text-dark" to={data.to1}>
            {data.value1}
          </Link>
        </button>
        <button className="btn btn-sm btn-outline-secondary">
          <Link className="text-dark" to={data.to2}>
            {data.value2}
          </Link>
        </button>
      </div>
    );
  };

  return (
    <div>
      <Menu
        username={user.name.toUpperCase()}
        role={user.role ? "Admin Access" : "Standard user"}
      />
      <main role="main" className="col-md-9 ml-sm-auto col-lg-10 px-4">
        <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
          <div>
            <h1 className="h2">{title}</h1>
            <p>{description}</p>
          </div>

          <div className="btn-toolbar mb-2 mb-md-0">
            {sideOptionDataTwo && sideOptionTwo(sideOptionDataTwo)}
            {sideOptionData && sideOption(sideOptionData)}
          </div>
        </div>
        <div>{children}</div>
      </main>
    </div>
  );
};

export default Base;

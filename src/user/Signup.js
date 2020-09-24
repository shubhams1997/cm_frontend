import React, { useState } from "react";
import { authenticate, isAuthenticated, signup } from "../auth/helper";
import Base from "../core/Base";

function Signup(props) {
  const [values, setValues] = useState({
    name: "",
    lastname: "",
    password: "",
    role: false,
    error: "",
    loading: false,
    success: false,
  });
  const { name, lastname, password, role, error, loading, success } = values;

  const handleChange = (name) => (event) => {
    setValues({
      ...values,
      loading: false,
      error: false,
      [name]: event.target.value,
    });
  };

  const handleRole = (event) => {
    setValues({ ...values, role: !role });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, loading: true, error: false, success: false });
    signup({ name, lastname, password, role })
      .then((data) => {
        console.log(data);
        if (data.error) {
          setValues({ ...values, error: data.error, success: false });
        } else {
          setValues({
            ...values,
            name: "",
            lastname: "",
            password: "",
            success: true,
            loading: false,
          });
        }
      })
      .catch((err) => console.log("Creation is Failed", err));
  };

  const SignUpForm = () => {
    return (
      <div className="text-center">
        <form style={{ width: "500px", margin: "0 auto" }}>
          <h1 className="h3 mb-3 font-weight-normal">Enter Information</h1>
          <div className="row">
            <div className="col">
              <input
                type="text"
                className="form-control"
                placeholder="Username"
                autoFocus
                onChange={handleChange("name")}
                value={name}
              />
            </div>
            <div className="col">
              <input
                type="text"
                className="form-control"
                placeholder="Last Name"
                onChange={handleChange("lastname")}
                value={lastname}
              />
            </div>
          </div>
          <input
            type="password"
            className=" form-control mt-2"
            placeholder="Password"
            onChange={handleChange("password")}
            value={password}
          />
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="checkbox"
              id="inlineCheckbox1"
              onClick={handleRole}
            />
            <label className="form-check-label">Is this User an Admin ?</label>
          </div>

          {loading ? (
            <button
              class="mt-2 btn btn-lg btn-dark btn-block"
              type="button"
              disabled
            >
              <span class="spinner-border spinner-border-sm"></span>
              Creating...
            </button>
          ) : (
            <button
              onClick={onSubmit}
              className="mt-2 btn btn-lg btn-dark btn-block"
              type="submit"
            >
              Create
            </button>
          )}
          <p className="mt-5 mb-3 text-muted">&copy; 2020-2021</p>
        </form>
      </div>
    );
  };

  const successMessage = () => {
    return (
      <div
        style={{ display: success ? "" : "none" }}
        className="alert alert-success"
        role="alert"
      >
        User created successfully!
      </div>
    );
  };

  const errorMessage = () => {
    return (
      <div
        style={{ display: error ? "" : "none" }}
        className="alert alert-danger"
        role="alert"
      >
        {error}, User already exist.
      </div>
    );
  };

  return (
    <Base
      title="Create a new Employee"
      description=""
      sideOptionData={{ value: "All Users", to: "/allusers" }}
    >
      {successMessage()}
      {errorMessage()}
      {SignUpForm()}
    </Base>
  );
}

export default Signup;

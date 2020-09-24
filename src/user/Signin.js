import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { authenticate, isAuthenticated, signin } from "../auth/helper";

function Signin(props) {
  const [values, setValues] = useState({
    name: "",
    password: "",
    error: "",
    loading: false,
    didRedirect: false,
  });
  const { name, password, error, loading, didRedirect } = values;

  const handleChange = (name) => (event) => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };

  const performRedirect = () => {
    if (didRedirect || isAuthenticated()) {
      return <Redirect to="/dashboard" />;
    }
  };

  const onSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: false, loading: true });
    signin({ name, password })
      .then((data) => {
        console.log(data);
        if (data.error) {
          setValues({ ...values, error: data.error, loading: false });
        } else {
          authenticate(data, () => {
            setValues({ ...values, didRedirect: true });
          });
        }
      })
      .catch((err) => console.log("Sign in Failed", err));
  };

  const errorMessage = () => {
    return (
      <div
        className="alert alert-danger"
        style={{ display: error ? "" : "none" }}
      >
        {error}
      </div>
    );
  };

  const SignInForm = () => {
    return (
      <div className="bg-dark signin_body text-center">
        <form className="form-signin">
          <h1 className="display-2 text-white">DE</h1>
          <h1 className="h3 mb-3 font-weight-normal text-white">
            Please sign in
          </h1>
          {errorMessage()}
          <label className="sr-only">Username</label>
          <input
            type="text"
            className="text-white bg-dark form-control"
            placeholder="Username"
            required
            autoFocus
            onChange={handleChange("name")}
          />
          <label className="sr-only">Password</label>
          <input
            type="password"
            className="text-white bg-dark form-control"
            placeholder="Password"
            required
            onChange={handleChange("password")}
          />
          {loading ? (
            <button
              class="btn btn-lg btn-primary btn-block"
              type="button"
              disabled
            >
              <span class="spinner-border spinner-border-sm"></span>
              Loading...
            </button>
          ) : (
            <button
              onClick={onSubmit}
              className="btn btn-lg btn-primary btn-block"
              type="submit"
            >
              Sign in
            </button>
          )}
          <p className="mt-5 mb-3 text-muted">&copy; 2020-2021</p>
        </form>
      </div>
    );
  };

  return (
    <div>
      {performRedirect()}
      {SignInForm()}
    </div>
  );
}

export default Signin;

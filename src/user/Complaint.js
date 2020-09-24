import React, { useState } from "react";
import { isAuthenticated } from "../auth/helper";
import Base from "../core/Base";
import { createComplaint } from "./helper";

function Complaint() {
  const [values, setValues] = useState({
    name: "",
    address: "",
    mobileNo: "",
    product: "",
    brand: "",
    modelNo: "",
    DOP: "",
    description: "",
    reference1: "",
    reference2: "",
    reference3: "",
    closed: false,
    error: "",
    loading: "",
    createdComplaint: false,
    loading: false,
  });
  const {
    name,
    address,
    mobileNo,
    product,
    brand,
    modelNo,
    DOP,
    description,
    reference1,
    reference2,
    reference3,
    closed,
    error,
    createdComplaint,
    loading,
  } = values;

  const { user, token } = isAuthenticated();

  const handleChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value, loading: false });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, loading: true, error: "" });
    createComplaint(user._id, token, {
      name,
      address,
      mobileNo,
      product,
      brand,
      modelNo,
      DOP,
      description,
      reference1,
      reference2,
      reference3,
      closed,
    })
      .then((data) => {
        if (data.error) {
          setValues({ ...values, error: data.error });
        } else {
          setValues({
            ...values,
            name: "",
            address: "",
            mobileNo: "",
            product: "",
            brand: "",
            modelNo: "",
            DOP: "",
            error: "",
            description: "",
            reference1: "",
            reference2: "",
            reference3: "",
            closed: false,
            createdComplaint: true,
            loading: false,
          });
        }
      })
      .catch((err) => console.log(err));
  };

  const successMessage = () => (
    <div
      style={{ display: createdComplaint ? "" : "none" }}
      className="alert alert-success mt-3"
    >
      Complaint created Successfully.
    </div>
  );

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

  const complaintForm = () => {
    return (
      <form>
        <div className="form-group row">
          <label className="col-sm-2 col-form-label">Name</label>
          <div className="col-sm-10">
            <input
              value={name}
              onChange={handleChange("name")}
              type="text"
              className="form-control"
            />
          </div>
        </div>
        <div className="form-group row">
          <div className="form-group col-sm-6">
            <label>Address</label>
            <input
              value={address}
              onChange={handleChange("address")}
              type="text"
              className="form-control"
            />
          </div>
          <div className="form-group col-sm-6">
            <label>Mobile No</label>
            <input
              onChange={handleChange("mobileNo")}
              type="text"
              className="form-control"
              value={mobileNo}
            />
          </div>
        </div>

        <div className="form-group row">
          <div className="form-group col-sm-4">
            <label>Product Name</label>
            <input
              onChange={handleChange("product")}
              type="text"
              className="form-control"
              value={product}
            />
          </div>
          <div className="form-group col-sm-4">
            <label>Brand</label>
            <input
              onChange={handleChange("brand")}
              type="text"
              className="form-control"
              value={brand}
            />
          </div>
          <div className="form-group col-sm-4">
            <label>Model No</label>
            <input
              onChange={handleChange("modelNo")}
              type="text"
              className="form-control"
              value={modelNo}
            />
          </div>
        </div>

        <div className="form-group row">
          <div className="form-group col-sm-6">
            <label>DOP</label>
            <input
              onChange={handleChange("DOP")}
              type="date"
              className="form-control"
              value={DOP}
              placeholder="DD/MM/YYYY"
            />
          </div>
          <div className="form-group col-sm-6">
            <label>Description</label>
            <input
              onChange={handleChange("description")}
              type="text"
              className="form-control"
              value={description}
            />
          </div>
        </div>

        <div className="form-group row">
          <div className="form-group col-sm-4">
            <label>Reference1</label>
            <input
              onChange={handleChange("reference1")}
              type="text"
              className="form-control"
              value={reference1}
            />
          </div>
          <div className="form-group col-sm-4">
            <label>Reference2</label>
            <input
              onChange={handleChange("reference2")}
              type="text"
              className="form-control"
              value={reference2}
            />
          </div>
          <div className="form-group col-sm-4">
            <label>Reference3</label>
            <input
              onChange={handleChange("reference3")}
              type="text"
              className="form-control"
              value={reference3}
            />
          </div>
        </div>
        <div className="form-group row">
          <div className="col-sm-10">
            {loading ? (
              <button className="btn btn-dark" disabled>
                <span className="spinner-border spinner-border-sm"></span>
                Saving...
              </button>
            ) : (
              <button onClick={onSubmit} className="btn btn-dark">
                Submit
              </button>
            )}
          </div>
        </div>
      </form>
    );
  };
  return (
    <Base
      title="Complaint"
      description="Manage your customers here."
      sideOptionData={{
        value: "All Complaints",
        to: "/allcomplaints?page=0&limit=10",
      }}
    >
      {successMessage()}
      {errorMessage()}
      {complaintForm()}
    </Base>
  );
}

export default Complaint;

import React, { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import { isAuthenticated } from "../auth/helper";
import Base from "../core/Base";
import { getComplaint, updateComplaint } from "./helper";

function UpdateComplaint({ match }) {
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
    getaRedirect: false,
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
    getaRedirect,
    loading,
  } = values;

  const { user, token } = isAuthenticated();

  const handleChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value, loading: false });
  };

  const handleClose = () => {
    setValues({ ...values, closed: !closed });
  };

  const preload = async () => {
    await getComplaint(match.params.complaintId, token)
      .then((data) => {
        if (data.error) {
          setValues({ ...values, error: data.error });
        } else {
          setValues({
            ...values,
            name: data.name,
            address: data.address,
            mobileNo: data.mobileNo,
            product: data.product,
            brand: data.brand,
            modelNo: data.modelNo,
            DOP: data.DOP,
            description: data.description,
            reference1: data.reference1,
            reference2: data.reference2,
            reference3: data.reference3,
            closed: data.closed,
          });
        }
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    preload();
  }, []);

  const onSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, loading: true, error: "" });
    updateComplaint(match.params.complaintId, user._id, token, {
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
            getaRedirect: true,
            loading: false,
          });
        }
      })
      .catch((err) => console.log(err));
  };

  const performRedirect = () => {
    if (getaRedirect) {
      if (user) {
        return <Redirect to="/allcomplaints?page=0&limit=10" />;
      }
    }
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

  const dateFormat = (data) => {
    if (!data) return "---------";
    let d = new Date(data);
    let month =
      d.getMonth().toString().length < 2 ? "0" + d.getMonth() : d.getMonth();
    let date =
      d.getDate().toString().length < 2 ? "0" + d.getDate() : d.getDate();
    let v = d.getFullYear() + "-" + month + "-" + date;
    return v;
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
              value={dateFormat(DOP)}
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
            <h4 className={closed ? "text-success" : "text-warning"}>
              Status of Complaint is {closed ? "Closed " : "Open"} .
            </h4>
          </div>
        </div>

        <div className="form-group row">
          <div className="col-sm-10">
            <input
              onChange={handleClose}
              id="closed"
              type="checkbox"
              className="form-congrol mr-4"
              value={closed}
            />
            <label htmlFor="closed">
              {closed ? "Open" : "Close"} Status of this Complaint.
            </label>
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
                Update
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
      description="Update your customers here."
      sideOptionData={{ value: "All Complaints", to: "/allcomplaints" }}
    >
      {performRedirect()}
      {errorMessage()}
      {complaintForm()}
    </Base>
  );
}

export default UpdateComplaint;

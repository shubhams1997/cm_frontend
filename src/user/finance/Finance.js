import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../../auth/helper";
import Base from "../../core/Base";
import { createFinance, getSeries } from "../helper/financeHelper";

function Finance(props) {
  const [values, setValues] = useState({
    seriesNo: "",
    series: [],
    DOP: "",
    dueDate: "",
    caseNo: "",
    name: "",
    address: "",
    mobileNo: "",
    product: "",
    brand: "",
    price: "15000",
    downPayment: "2000",
    processingFee: "1000",
    interest: "",
    months: "",
    success: false,
    error: "",
    loading: false,
  });

  const {
    seriesNo,
    series,
    DOP,
    dueDate,
    caseNo,
    name,
    address,
    mobileNo,
    product,
    price,
    brand,
    downPayment,
    processingFee,
    interest,
    months,
    success,
    error,
    loading,
  } = values;

  const { user, token } = isAuthenticated();
  const handleChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value, loading: false });
  };
  useEffect(() => {
    getSeries(token)
      .then((data) => {
        if (data.error) {
          setValues({ ...values, error: data.error });
        } else {
          setValues({ ...values, series: data });
        }
      })
      .catch((err) => console.log(err));
  }, []);

  const onSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, loading: true, error: "" });
    createFinance(user._id, token, {
      seriesNo,
      DOP,
      dueDate,
      caseNo,
      name,
      address,
      mobileNo,
      product,
      price,
      brand,
      downPayment,
      processingFee,
      interest,
      months,
    })
      .then((data) => {
        if (data.error) {
          setValues({ ...values, error: data.error });
        } else {
          setValues({
            ...values,
            seriesNo: "",
            DOP: "",
            dueDate: "",
            caseNo: "",
            name: "",
            address: "",
            mobileNo: "",
            product: "",
            brand: "",
            price: "15000",
            downPayment: "2000",
            processingFee: "1000",
            interest: "",
            months: "",
            loading: false,
            success: true,
          });
        }
      })
      .catch((err) => console.log(err));
  };

  const successMessage = () => (
    <div
      style={{ display: success ? "" : "none" }}
      className="alert alert-success mt-3"
    >
      Finance Statement created Successfully.
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

  const createFinanceForm = () => {
    return (
      <form>
        <div className="form-group row">
          <div className="form-group col-sm-2">
            <label>
              Series No
              <span className="text-danger">*</span>
            </label>
            <select
              onChange={handleChange("seriesNo")}
              className="form-control"
            >
              <option value="">Select</option>
              {series &&
                series.map((s, index) => (
                  <option key={index} value={s.name}>
                    {s.name}
                  </option>
                ))}
            </select>
          </div>
          <div className="form-group col-sm-1">
            <Link to="/series" className="btn btn-outline">
              +
            </Link>
          </div>
          <div className="form-group col-sm-3">
            <label>
              DOP <span className="text-danger">*</span>
            </label>
            <input
              onChange={handleChange("DOP")}
              type="date"
              className="form-control"
              value={DOP}
              placeholder="DD/MM/YYYY"
            />
          </div>
          <div className="form-group col-sm-3">
            <label>
              Due Date
              <span className="text-danger">*</span>
            </label>
            <input
              onChange={handleChange("dueDate")}
              type="date"
              className="form-control"
              value={dueDate}
              placeholder="DD/MM/YYYY"
            />
          </div>
          <div className="form-group col-sm-3">
            <label>Case No</label>
            <input
              onChange={handleChange("caseNo")}
              type="text"
              className="form-control"
              value={caseNo}
            />
          </div>
        </div>

        <div className="form-group row">
          <div className="form-group col-sm-6">
            <label>
              Name
              <span className="text-danger">*</span>
            </label>
            <input
              value={name}
              onChange={handleChange("name")}
              type="text"
              className="form-control"
            />
          </div>
          <div className="form-group col-sm-6">
            <label>
              Address
              <span className="text-danger">*</span>
            </label>
            <input
              value={address}
              onChange={handleChange("address")}
              type="text"
              className="form-control"
            />
          </div>
        </div>

        <div className="form-group row">
          <div className="form-group col-sm-4">
            <label>
              Mobile No
              <span className="text-danger">*</span>
            </label>
            <input
              onChange={handleChange("mobileNo")}
              type="text"
              className="form-control"
              value={mobileNo}
            />
          </div>
          <div className="form-group col-sm-4">
            <label>
              Product Name
              <span className="text-danger">*</span>
            </label>
            <input
              onChange={handleChange("product")}
              type="text"
              className="form-control"
              value={product}
            />
          </div>
          <div className="form-group col-sm-4">
            <label>
              Brand
              <span className="text-danger">*</span>
            </label>
            <input
              onChange={handleChange("brand")}
              type="text"
              className="form-control"
              value={brand}
            />
          </div>
        </div>

        <div className="form-group row">
          <div className="form-group col-sm-2">
            <label>
              Price
              <span className="text-danger">*</span>
            </label>
            <input
              onChange={handleChange("price")}
              type="text"
              className="form-control"
              value={price}
            />
          </div>
          <div className="form-group col-sm-2">
            <label>
              Down Payment
              <span className="text-danger">*</span>
            </label>
            <input
              onChange={handleChange("downPayment")}
              type="text"
              className="form-control"
              value={downPayment}
            />
          </div>
          <div className="form-group col-sm-2">
            <label>
              Processing Fee
              <span className="text-danger">*</span>
            </label>
            <input
              onChange={handleChange("processingFee")}
              type="text"
              className="form-control"
              value={processingFee}
            />
          </div>
          <div className="form-group col-sm-2">
            <label>
              Interest per Month
              <span className="text-danger">*</span>
            </label>
            <input
              onChange={handleChange("interest")}
              type="text"
              className="form-control"
              value={interest}
            />
          </div>
          <div className="form-group col-sm-2">
            <label>
              Months
              <span className="text-danger">*</span>
            </label>
            <input
              onChange={handleChange("months")}
              type="text"
              className="form-control"
              value={months}
            />
          </div>
          <div className="form-group-sm col-sm-2">
            <label>Total Interest</label>
            <h6> = {parseInt(interest) * parseInt(months)}</h6>
          </div>
        </div>

        <div className="row">
          <div className="form-group col-sm-12">
            <span>Gross Loan Amount : &nbsp; </span>
            <span>
              {parseInt(price) -
                parseInt(downPayment) +
                parseInt(processingFee)}
            </span>
          </div>
        </div>
        <div className="row">
          <div className="form-group col-sm-12">
            <span>Net Loan Amount : &nbsp; </span>
            <span>
              {parseInt(price) -
                parseInt(downPayment) +
                parseInt(processingFee) +
                parseInt(interest) * parseInt(months)}
            </span>
          </div>
        </div>
        <div className="row">
          <div className="form-group col-sm-12">
            <span>EMI Amount : &nbsp; </span>
            <span>
              {(parseInt(price) -
                parseInt(downPayment) +
                parseInt(processingFee) +
                parseInt(interest) * parseInt(months)) /
                parseInt(months)}
            </span>
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
      title="Finance"
      description="Manage your Finance here."
      sideOptionData={{
        value: "All Finances",
        to: "/finances?page=0&limit=10",
      }}
    >
      {successMessage()}
      {errorMessage()}
      {createFinanceForm()}
    </Base>
  );
}

export default Finance;

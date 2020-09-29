import React, { useState, useEffect } from "react";
import { isAuthenticated } from "../../auth/helper";
import Base from "../../core/Base";
import { createEntry, getEntries, getFinance } from "../helper/financeHelper";

function Statement({ match }) {
  const [values, setValues] = useState({
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
    success: false,
    error: "",
    loading: false,
  });
  const [entry, setEntry] = useState({
    Tdate: "",
    particular: "",
    debit: "0",
    credit: "0",
    loading: "",
  });
  const [reload, setReload] = useState(false);
  const [entryError, setEntryError] = useState("");
  const [entries, setEntries] = useState([]);

  const {
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
    success,
    error,
  } = values;

  const { Tdate, particular, debit, credit, loading } = entry;
  const { user, token } = isAuthenticated();

  const handleChange = (name) => (event) => {
    setEntry({ ...entry, [name]: event.target.value, loading: false });
  };

  const preload = () => {
    setValues({ ...values, error: "" });
    getFinance(token, match.params.financeId).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({
          ...values,
          seriesNo: data.seriesNo,
          DOP: data.DOP,
          dueDate: data.dueDate,
          caseNo: data.caseNo,
          name: data.name,
          address: data.address,
          mobileNo: data.mobileNo,
          product: data.product,
          brand: data.brand,
          price: data.price,
          downPayment: data.downPayment,
          processingFee: data.processingFee,
          interest: data.interest,
          months: data.months,
        });
      }
    });
  };

  useEffect(() => {
    preload();
    getEntries(token, match.params.financeId).then((data) => {
      if (data.error) {
        setEntryError(data.error);
      } else {
        setEntries(data);
      }
    });
  }, [reload]);

  const dateFormat = (data) => {
    if (!data) return "---------";
    let d = new Date(data);
    return d.getDate() + "/" + (d.getMonth() + 1) + "/" + d.getFullYear();
  };

  const onSubmit = (event) => {
    event.preventDefault();
    setEntry({ ...entry, loading: true });
    console.log({
      record: match.params.financeId,
      Tdate,
      particular,
      debit,
      credit,
    });
    createEntry(user._id, token, {
      record: match.params.financeId,
      date: Tdate,
      particular,
      debit,
      credit,
    })
      .then((data) => {
        if (data.error) {
          setEntryError(data.error);
        } else {
          setReload(!reload);
          setEntry({
            Tdate: "",
            particular: "",
            debit: "0",
            credit: "0",
            loading: "",
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
      Entry Added Successfully.
    </div>
  );

  const errorMessage = () => {
    return (
      <div
        className="alert alert-danger"
        style={{ display: entryError ? "" : "none" }}
      >
        {entryError}
      </div>
    );
  };

  return (
    <Base title="Statement of Customer">
      {successMessage()}
      {errorMessage()}
      <table className="table table-sm">
        <tbody>
          <tr>
            <th scope="row">Series No</th>
            <td>{seriesNo}</td>
          </tr>
          <tr>
            <th scope="row"> DOP</th>
            <td>{dateFormat(DOP).trim()}</td>
          </tr>
          <tr>
            <th scope="row"> Due Date</th>
            <td>{dateFormat(dueDate).trim()}</td>
          </tr>
          <tr>
            <th scope="row"> Case No</th>
            <td>{caseNo}</td>
          </tr>
          <tr>
            <th scope="row"> Name</th>
            <td>{name}</td>
          </tr>
          <tr>
            <th scope="row"> Address</th>
            <td>{address}</td>
          </tr>
          <tr>
            <th scope="row"> Mobile No</th>
            <td>{mobileNo}</td>
          </tr>
          <tr>
            <th scope="row"> Product Name</th>
            <td>{product}</td>
          </tr>
          <tr>
            <th scope="row"> Brand</th>
            <td>{brand}</td>
          </tr>
          <tr>
            <th scope="row"> Price</th>
            <td>{price}</td>
          </tr>
          <tr>
            <th scope="row"> Down Payment</th>
            <td>{downPayment}</td>
          </tr>
          <tr>
            <th scope="row"> Processing Fee</th>
            <td>{processingFee}</td>
          </tr>
          <tr>
            <th scope="row"> Interest per Month &times; Months</th>
            <td>
              {interest} &times; {months}{" "}
              <span className="h6">
                = {parseInt(interest) * parseInt(months)}
              </span>
            </td>
          </tr>
        </tbody>
      </table>

      <div className="row">
        <div className="form-group col-sm-12">
          <span>Gross Loan Amount : &nbsp; </span>
          <span>
            {parseInt(price) - parseInt(downPayment) + parseInt(processingFee)}
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
      <table className="table table-sm">
        <thead>
          <tr>
            <th scope="col">Date</th>
            <th scope="col">Particular</th>
            <th scope="col">Debit</th>
            <th scope="col">Credit</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {entries.map((entry, i) => {
            return (
              <tr key={entry._id}>
                <td>{dateFormat(entry.date)}</td>
                <td>{entry.particular}</td>
                <td>{entry?.debit}</td>
                <td>{entry?.credit}</td>
              </tr>
            );
          })}
          <tr>
            <td>
              <input
                onChange={handleChange("Tdate")}
                type="date"
                className="form-control"
                value={Tdate}
                placeholder="DD/MM/YYYY"
              />
            </td>
            <td>
              <input
                onChange={handleChange("particular")}
                type="text"
                className="form-control"
                value={particular}
              />
            </td>
            <td>
              <input
                onChange={handleChange("debit")}
                type="text"
                className="form-control"
                value={debit}
              />
            </td>
            <td>
              <input
                onChange={handleChange("credit")}
                type="text"
                className="form-control"
                value={credit}
              />
            </td>
            <td>
              {loading ? (
                <button className="btn btn-dark" disabled>
                  <span className="spinner-border spinner-border-sm"></span>
                  Saving...
                </button>
              ) : (
                <button onClick={onSubmit} className="btn btn-dark">
                  Add
                </button>
              )}
            </td>
          </tr>
        </tbody>
      </table>
    </Base>
  );
}

export default Statement;

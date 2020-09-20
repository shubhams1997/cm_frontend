import React, { useEffect, useState } from "react";
import Base from "../core/Base";
import { isAuthenticated } from "../auth/helper";
import {
  createBrand,
  createCategory,
  getCategories,
  getBrands,
} from "../admin/helper";

function CategoryBrand(props) {
  const [categoryName, setCategoryName] = useState("");
  const [brandName, setBrandName] = useState("");
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);

  const { user, token } = isAuthenticated();

  useEffect(() => {
    console.log("getting categories and brands");
    getCategories(token)
      .then((data) => {
        if (data.error) {
          setError(data.error);
        } else {
          setCategories(data);
        }
      })
      .catch((err) => console.log(err));

    getBrands(token)
      .then((data) => {
        if (data.error) {
          setError(data.error);
        } else {
          setBrands(data);
        }
      })
      .catch((err) => console.log(err));
  }, [success]);

  const handleCategoryChange = (event) => {
    setError("");
    setCategoryName(event.target.value);
  };

  const handleBrandChange = (event) => {
    setError("");
    setBrandName(event.target.value);
  };

  const successMessage = () => {
    return (
      <div className="row">
        <div className="col-md-8 offset-sm-2 text-left">
          <div
            className="alert alert-success"
            style={{ display: success ? "" : "none" }}
          >
            Operation Successfully?
          </div>
        </div>
      </div>
    );
  };

  const errorMessage = () => {
    return (
      <div className="row">
        <div className="col-md-8 offset-sm-2 text-left">
          <div
            className="alert alert-danger"
            style={{ display: error ? "" : "none" }}
          >
            {error}
          </div>
        </div>
      </div>
    );
  };

  const onCategorySubmit = (event) => {
    event.preventDefault();
    setError("");
    setSuccess(false);
    createCategory(user._id, token, categoryName)
      .then((data) => {
        if (data.error) {
          setError(data.error);
        } else {
          setSuccess(true);
          setCategoryName("");
        }
      })
      .catch((err) => console.log(err));
  };

  const onBrandSubmit = (event) => {
    event.preventDefault();
    setError("");
    setSuccess(false);
    createBrand(user._id, token, brandName)
      .then((data) => {
        if (data.error) {
          setError(data.error);
        } else {
          setSuccess(true);
          setBrandName("");
        }
      })
      .catch((err) => console.log(err));
  };

  const categoryForm = () => {
    return (
      <div className="shadow-sm p-3 mb-5 bg-white rounded">
        <form>
          <div className="form-group">
            <label className="lead">Enter the Category name:</label>
            <input
              onChange={handleCategoryChange}
              required
              placeholder="For Ex: Electronics"
              type="text"
              className="form-control"
              value={categoryName}
            />
          </div>
          <button onClick={onCategorySubmit} className="btn btn-success">
            Create Category
          </button>
        </form>
      </div>
    );
  };

  const brandForm = () => {
    return (
      <div className="shadow-sm p-3 mb-5 bg-white rounded">
        <form>
          <div className="form-group">
            <label className="lead">Enter the Brand name:</label>
            <input
              onChange={handleBrandChange}
              required
              placeholder="For Ex: Samsumg"
              type="text"
              className="form-control"
              value={brandName}
            />
          </div>
          <button onClick={onBrandSubmit} className="btn btn-success">
            Create Brand
          </button>
        </form>
      </div>
    );
  };

  return (
    <Base title="Category & Brand" description="Manage Category and Brand">
      {successMessage()}
      {errorMessage()}
      <div className="row">
        <div className="col">{categoryForm()}</div>
        <div className="col">{brandForm()}</div>
      </div>

      <div className="row table">
        <div className="col">
          <table className="table">
            <thead className="thead-light">
              <tr>
                <th scope="col">#</th>
                <th scope="col">Name</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((category, i) => {
                return (
                  <tr key={i}>
                    <th scope="row">{i + 1}</th>
                    <td>{category.name}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className="col">
          <table className="table">
            <thead className="thead-light">
              <tr>
                <th scope="col">#</th>
                <th scope="col">Name</th>
              </tr>
            </thead>
            <tbody>
              {brands.map((brand, i) => {
                return (
                  <tr key={i}>
                    <th scope="row">{i + 1}</th>
                    <td>{brand.name}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </Base>
  );
}

export default CategoryBrand;

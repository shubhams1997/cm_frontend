import React, { useEffect, useState } from "react";
import Base from "../core/Base";
import { isAuthenticated } from "../auth/helper";
import {
  createBrand,
  createCategory,
  getCategories,
  getBrands,
  deleteCategory,
  deleteBrand,
} from "./helper";
import { ReactComponent as DeleteIcon } from "../images/delete.svg";

function CategoryBrand(props) {
  const [categoryName, setCategoryName] = useState("");
  const [brandName, setBrandName] = useState("");
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [reload, setReload] = useState(false);
  const [loading, setLoading] = useState(false);

  const { user, token } = isAuthenticated();

  useEffect(() => {
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
  }, [success, reload]);

  const handleCategoryChange = (event) => {
    setLoading(false);
    setError("");
    setCategoryName(event.target.value);
  };

  const handleBrandChange = (event) => {
    setLoading(false);
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
    setLoading(true);
    setSuccess(false);
    createCategory(user._id, token, categoryName)
      .then((data) => {
        if (data.error) {
          setError(data.error);
        } else {
          setLoading(false);
          setSuccess(true);
          setCategoryName("");
        }
      })
      .catch((err) => console.log(err));
  };

  const onBrandSubmit = (event) => {
    event.preventDefault();
    setError("");
    setLoading(true);
    setSuccess(false);
    createBrand(user._id, token, brandName)
      .then((data) => {
        if (data.error) {
          setError(data.error);
        } else {
          setLoading(false);
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
          {loading ? (
            <button className="btn btn-dark" disabled>
              <span className="spinner-border spinner-border-sm"></span>
              Loading...
            </button>
          ) : (
            <button onClick={onCategorySubmit} className="btn btn-dark">
              Create Category
            </button>
          )}
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
          {loading ? (
            <button className="btn btn-dark" disabled>
              <span className="spinner-border spinner-border-sm"></span>
              Loading...
            </button>
          ) : (
            <button onClick={onBrandSubmit} className="btn btn-dark">
              Create Brand
            </button>
          )}
        </form>
      </div>
    );
  };

  const onCategoryDelete = (categoryId) => {
    setSuccess("");
    setError("");
    deleteCategory(user._id, categoryId, token).then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setSuccess(true);
        setReload(!reload);
      }
    });
  };

  const onBrandDelete = (brandId) => {
    setSuccess("");
    setError("");
    deleteBrand(user._id, brandId, token).then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setSuccess(true);
        setReload(!reload);
      }
    });
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
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>
              {categories.map((category, i) => {
                return (
                  <tr key={i}>
                    <th scope="row">{i + 1}</th>
                    <td>{category.name}</td>
                    <td>
                      <span
                        onClick={() => {
                          onCategoryDelete(category._id);
                        }}
                        className="btn"
                      >
                        <DeleteIcon />
                      </span>
                    </td>
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
                <th> </th>
              </tr>
            </thead>
            <tbody>
              {brands.map((brand, i) => {
                return (
                  <tr key={i}>
                    <th scope="row">{i + 1}</th>
                    <td>{brand.name}</td>
                    <td>
                      <span
                        onClick={() => {
                          onBrandDelete(brand._id);
                        }}
                        className="btn"
                      >
                        <DeleteIcon />
                      </span>
                    </td>
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

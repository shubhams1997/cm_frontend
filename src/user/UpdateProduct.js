import React, { useEffect, useState } from "react";
import Base from "../core/Base";
import { getCategories, getBrands, getProduct, updateProduct } from "./helper";
import { isAuthenticated } from "../auth/helper";
import { Redirect } from "react-router-dom";

function UpdateProduct({ match }) {
  const [values, setValues] = useState({
    name: "",
    description: "",
    marketPrice: "",
    dealerPrice: "",
    salesPrice: "",
    incentive: "",
    landingPrice: "",
    category: "",
    categories: [],
    brand: "",
    brands: [],
    error: "",
    loading: false,
    createdProduct: "",
    getaRedirect: false,
  });
  const {
    name,
    description,
    marketPrice,
    dealerPrice,
    salesPrice,
    incentive,
    landingPrice,
    category,
    categories,
    brand,
    brands,
    createdProduct,
    loading,
    error,
    getaRedirect,
  } = values;

  const { user, token } = isAuthenticated();

  const preload = async () => {
    let c = [];
    let b = [];
    await getCategories(token)
      .then((data) => {
        if (data.error) {
          setValues({ ...values, error: data.error });
        } else {
          c = data;
        }
      })
      .catch((err) => console.log(err));

    await getBrands(token)
      .then((data) => {
        if (data.error) {
          setValues({ ...values, error: data.error });
        } else {
          b = data;
        }
      })
      .catch((err) => console.log(err));

    await getProduct(match.params.productId, token).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({
          ...values,
          name: data.name,
          description: data.description,
          marketPrice: data.marketPrice,
          dealerPrice: data.dealerPrice,
          salesPrice: data.salesPrice,
          incentive: data.incentive,
          landingPrice: data.landingPrice,
          category: data.category,
          brand: data.brand,
          categories: c,
          brands: b,
        });
      }
    });
  };
  useEffect(() => {
    preload();
  }, []);

  const handleChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, loading: true, error: "" });
    updateProduct(match.params.productId, user._id, token, {
      name,
      description,
      marketPrice,
      dealerPrice,
      salesPrice,
      incentive,
      landingPrice,
      category,
      brand,
    })
      .then((data) => {
        if (data.error) {
          setValues({ ...values, error: data.error });
        } else {
          setValues({
            ...values,
            loading: false,
            getaRedirect: true,
          });
        }
      })
      .catch((err) => console.log(err));
  };

  const performRedirect = () => {
    if (getaRedirect) {
      if (user) {
        return <Redirect to="/allproducts?page=0&limit=10" />;
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

  const createProductForm = () => {
    return (
      <form>
        <div className="form-group row">
          <label className="col-sm-2 col-form-label">Name</label>
          <div className="col-sm-10">
            <input
              onChange={handleChange("name")}
              type="text"
              className="form-control"
              value={name}
              required
            />
          </div>
        </div>
        <div className="form-group row">
          <label className="col-sm-2 col-form-label">Description</label>
          <div className="col-sm-10">
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
            <label>MRP</label>
            <input
              onChange={handleChange("marketPrice")}
              type="text"
              className="form-control"
              value={marketPrice}
            />
          </div>
          <div className="form-group col-sm-4">
            <label>Sales Price</label>
            <input
              onChange={handleChange("salesPrice")}
              type="text"
              className="form-control"
              value={salesPrice}
              required
            />
          </div>
          <div className="form-group col-sm-4">
            <label>Dealer Price</label>
            <input
              onChange={handleChange("dealerPrice")}
              type="text"
              className="form-control"
              value={dealerPrice}
              required
            />
          </div>
        </div>
        <div className="form-group row">
          <div className="form-group col-sm-6">
            <label>Incentive</label>
            <input
              onChange={handleChange("incentive")}
              type="text"
              className="form-control"
              value={incentive}
              required
            />
          </div>
          <div className="form-group col-sm-6">
            <label>Landing Price</label>
            <input
              onChange={handleChange("landingPrice")}
              type="text"
              className="form-control"
              value={landingPrice}
              required
            />
          </div>
        </div>
        <div className=" row">
          <div className="form-group col-sm-6">
            <label>Category</label>
            <select
              onChange={handleChange("category")}
              className="form-control"
            >
              <option>{category}</option>
              {categories &&
                categories.map((cate, index) => (
                  <option key={index} value={cate.name}>
                    {cate.name}
                  </option>
                ))}
            </select>
          </div>
          <div className="form-group col-sm-6">
            <label>Brand</label>
            <select onChange={handleChange("brand")} className="form-control">
              <option>{brand}</option>
              {brands &&
                brands.map((brand, index) => (
                  <option key={index} value={brand.name}>
                    {brand.name}
                  </option>
                ))}
            </select>
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
      title="Products"
      description="Manage your Products here."
      sideOptionData={{
        value: "All Products",
        to: "/allproducts?page=0&limit=10",
      }}
    >
      {performRedirect()}
      {errorMessage()}
      {createProductForm()}
    </Base>
  );
}

export default UpdateProduct;

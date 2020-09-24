import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../auth/helper";
import Base from "../core/Base";
import { getAllProducts } from "./helper";

function AllProducts(props) {
  const [products, setProducts] = useState([]);

  const { user, token } = isAuthenticated();

  useEffect(() => {
    getAllProducts(token).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setProducts(data);
      }
    });
  }, []);

  return (
    <Base title="All Products">
      <table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">Description</th>
            <th scope="col">Market Price</th>
            <th scope="col">Dealer Price</th>
            <th scope="col">Sales Price</th>
            <th scope="col">Incentive</th>
            <th scope="col">Landing Price</th>
            <th scope="col">Category</th>
            <th scope="col">Brand</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, i) => {
            return (
              <tr key={product._id}>
                <th scope="row">{i + 1}</th>
                <td>{product.name}</td>
                <td>{product?.description}</td>
                <td>{product?.marketPrice}</td>
                <td>{product?.dealerPrice}</td>
                <td>{product?.salesPrice}</td>
                <td>{product?.incentive}</td>
                <td>{product?.landingPrice}</td>
                <td>{product.category}</td>
                <td>{product.brand}</td>
                <td>
                  <Link
                    to={`/product/update/${product._id}`}
                    className="btn btn-sm btn-outline-secondary"
                  >
                    Update
                  </Link>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </Base>
  );
}

export default AllProducts;

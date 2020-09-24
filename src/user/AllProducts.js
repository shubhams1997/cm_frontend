import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../auth/helper";
import Base from "../core/Base";
import { getAllProducts } from "./helper";

function AllProducts({ match, location }) {
  const [products, setProducts] = useState([]);
  const [totalCount, setTotalCount] = useState("");
  const [limit, setLimit] = useState(5);
  const [page, setpage] = useState(0);
  const [reload, setReload] = useState(true);

  const { user, token } = isAuthenticated();

  const preload = async () => {
    const page = location.search.split("&")[0].match(/(\d+)/)[0];
    const limit = location.search.split("&")[1].match(/(\d+)/)[0];
    setLimit(limit);
    setpage(page);
    await getAllProducts(token, limit, page * limit).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setTotalCount(data.totalCount);
        setProducts(data.products);
      }
    });
  };

  useEffect(() => {
    preload();
  }, [reload]);

  const reloadPage = () => {
    setReload(!reload);
  };

  return (
    <Base title="All Products" description={`Total Products are ${totalCount}`}>
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
                <th scope="row">
                  {parseInt(page) * parseInt(limit) + (i + 1)}
                </th>
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
      <nav aria-label="Page navigation example">
        <ul className="pagination">
          {parseInt(page) > 0 && (
            <Link
              onClick={reloadPage}
              to={`/allproducts?page=${parseInt(page) - 1}&limit=${limit}`}
              className="page-item page-link text-dark"
            >
              prev
            </Link>
          )}

          {parseInt(page) * parseInt(limit) < parseInt(totalCount) && (
            <Link
              onClick={reloadPage}
              to={`/allproducts?page=${parseInt(page) + 1}&limit=${limit}`}
              className="page-item page-link text-dark"
            >
              next
            </Link>
          )}
        </ul>
      </nav>
    </Base>
  );
}

export default AllProducts;

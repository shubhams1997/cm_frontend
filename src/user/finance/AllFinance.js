import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../../auth/helper";
import Base from "../../core/Base";
import { getAllFinance } from "../helper/financeHelper";

function AllFinance({ match, location }) {
  const [finances, setFinances] = useState([]);
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
    await getAllFinance(token, limit, page * limit)
      .then((data) => {
        if (data.error) {
          console.log(data.error);
        } else {
          setTotalCount(data.totalCount);
          setFinances(data.finances);
        }
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    preload();
  }, [reload]);

  const reloadPage = () => {
    setReload(!reload);
  };

  const dateFormat = (data) => {
    if (!data) return "---------";
    let d = new Date(data);
    return d.getDate() + "/" + (d.getMonth() + 1) + "/" + d.getFullYear();
  };

  return (
    <Base title="All Finances" description={`Total Finances are ${totalCount}`}>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Series No</th>
            <th scope="col">Name</th>
            <th scope="col">DOP</th>
            <th scope="col">Due Date</th>
            <th scope="col">Case No</th>
            <th scope="col">EMI</th>
            <th scope="col">Product</th>
            <th scope="col">Price</th>
            <th scope="col">Down Payment</th>
            <th scope="col">Processing Fee</th>
            <th scope="col">Interest</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {finances.map((finance, i) => {
            return (
              <tr key={finance._id}>
                <th scope="row">{finance.seriesNo}</th>
                <td>{finance.name}</td>
                <td>{dateFormat(finance.DOP)}</td>
                <td>{dateFormat(finance.dueDate)}</td>
                <td>{finance.caseNo}</td>
                <td>
                  {(parseInt(finance.price) -
                    parseInt(finance.downPayment) +
                    parseInt(finance.processingFee) +
                    parseInt(finance.interest) * parseInt(finance.months)) /
                    parseInt(finance.months)}
                </td>
                <td>{finance?.product}</td>
                <td>{finance?.price}</td>
                <td>{finance?.downPayment}</td>
                <td>{finance?.processingFee}</td>
                <td>{finance.interest}</td>
                <td>
                  <Link
                    to={`/statement/${finance._id}`}
                    className="btn btn-sm btn-outline-secondary"
                  >
                    Full Statement
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
              to={`/finances?page=${parseInt(page) - 1}&limit=${limit}`}
              className="page-item page-link text-dark"
            >
              prev
            </Link>
          )}

          {parseInt(page) * parseInt(limit) < parseInt(totalCount) && (
            <Link
              onClick={reloadPage}
              to={`/finances?page=${parseInt(page) + 1}&limit=${limit}`}
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

export default AllFinance;

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../auth/helper";
import Base from "../core/Base";
import { getAllComplaints } from "./helper";

function AllComplaints({ match, location }) {
  const [complaints, setComplaints] = useState([]);
  const [totalCount, setTotalCount] = useState("");
  const [limit, setLimit] = useState(5);
  const [page, setpage] = useState(0);
  const [reload, setReload] = useState(true);

  const { user, token } = isAuthenticated();

  const preload = async () => {
    const page = location.search.split("&")[0].match(/(\d+)/)[0];
    const limit = location.search.split("&")[1].match(/(\d+)/)[0];
    setLimit(parseInt(limit));
    setpage(parseInt(page));
    await getAllComplaints(token, limit, page * limit).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setTotalCount(data.totalCount);
        setComplaints(data.complaints);
      }
    });
  };

  useEffect(() => {
    preload();
  }, [reload]);

  const reloadPage = () => {
    setReload(!reload);
  };

  const dateFormat = (date) => {
    if (!date) return "---------";
    let d = new Date(date);
    return d.getDate() + "/" + d.getMonth() + "/" + d.getFullYear();
  };

  return (
    <Base
      title="All Complaints"
      description={`Total Complaints are ${totalCount}`}
    >
      <table className="table">
        <thead>
          <tr>
            <th scope="col">DOP</th>
            <th scope="col">Name</th>
            <th scope="col">Address</th>
            <th scope="col">Mobile No</th>
            <th scope="col">Product</th>
            <th scope="col">Brand</th>
            <th scope="col">Model No</th>
            <th scope="col">Description</th>
            <th scope="col">Reference1</th>
            <th scope="col">Reference2</th>
            <th scope="col">Closed</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {complaints.map((complaint, i) => {
            return (
              <tr
                className={complaint.closed ? "bg-light" : ""}
                key={complaint._id}
              >
                <th scope="row">{dateFormat(complaint.createdAt)}</th>
                <td>{complaint.name}</td>
                <td>{complaint?.address}</td>
                <td>{complaint?.mobileNo}</td>
                <td>{complaint?.product}</td>
                <td>{complaint?.brand}</td>
                <td>{complaint?.modelNo}</td>
                <td>{complaint?.description}</td>
                <td>{complaint?.reference1}</td>
                <td>{complaint.reference2}</td>
                <td>{complaint.closed ? "Closed" : ""}</td>
                <td>
                  <Link
                    to={`/complaint/update/${complaint._id}`}
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
              to={`/allcomplaints?page=${parseInt(page) - 1}&limit=${limit}`}
              className="page-item page-link text-dark"
            >
              prev
            </Link>
          )}

          {parseInt(page) * parseInt(limit) < parseInt(totalCount) && (
            <Link
              onClick={reloadPage}
              to={`/allcomplaints?page=${parseInt(page) + 1}&limit=${limit}`}
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

export default AllComplaints;

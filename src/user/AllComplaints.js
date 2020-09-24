import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../auth/helper";
import Base from "../core/Base";
import { getAllComplaints } from "./helper";

function AllComplaints(props) {
  const [complaints, setComplaints] = useState([]);

  const { user, token } = isAuthenticated();

  useEffect(() => {
    getAllComplaints(token).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setComplaints(data);
      }
    });
  }, []);

  const dateFormat = (date) => {
    if (!date) return "---------";
    let d = new Date(date);
    return d.getDate() + "/" + d.getMonth() + "/" + d.getFullYear();
  };

  return (
    <Base title="All Complaints">
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
                <th scope="row">{dateFormat(complaint.DOP)}</th>
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
    </Base>
  );
}

export default AllComplaints;

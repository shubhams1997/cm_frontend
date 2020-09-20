import React, { useEffect, useState } from "react";
import { isAuthenticated } from "../auth/helper";
import Base from "../core/Base";
import { getAllUsers } from "./helper";

function AllUsers(props) {
  const [users, setUsers] = useState([]);

  const { user, token } = isAuthenticated();

  useEffect(() => {
    getAllUsers(user._id, token).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setUsers(data);
      }
    });
  }, []);

  return (
    <Base title="All Users">
      <table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">UserName</th>
            <th scope="col">LastName</th>
            <th scope="col">Privileges</th>
            {/* <th scope="col">Action</th> */}
          </tr>
        </thead>
        <tbody>
          {users.map((user, i) => {
            return (
              <tr key={user._id}>
                <th scope="row">{i + 1}</th>
                <td>{user.name}</td>
                <td>{user?.lastname}</td>
                <td>{user.role ? "Admin" : "Standard"}</td>
                {/* <td>
                  <span className="btn btn-sm btn-outline-secondary">
                    Update
                  </span>{" "}
                </td> */}
              </tr>
            );
          })}
        </tbody>
      </table>
    </Base>
  );
}

export default AllUsers;

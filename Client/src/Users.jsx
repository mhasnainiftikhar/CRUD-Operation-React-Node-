import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Users = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = () => {
    axios
      .get("https://amya-verboten-nonmethodically.ngrok-free.dev/users")
      .then((result) => setUsers(result.data))
      .catch((err) => console.log("Error fetching users:", err));
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      axios
        .delete(
          `https://amya-verboten-nonmethodically.ngrok-free.dev/delete-user/${id}`
        )
        .then(() => {
          alert(" User deleted successfully!");
          fetchUsers();
        })
        .catch((err) => console.log("Error deleting user:", err));
    }
  };
  console.log(users);
  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">User List</h2>
      <div className="mb-3 text-end">
        <Link to="/create-user" className="btn btn-success">
          Add +
        </Link>
      </div>

      <table className="table table-bordered table-hover shadow-sm">
        <thead className="table-light">
          <tr>
            <th>Username</th>
            <th>Email</th>
            <th>Age</th>
            <th className="text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.length > 0 ? (
            users?.map((user, index) => (
              <tr key={index}>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>{user.age}</td>
                <td className="text-center">
                  <Link
                    to={`/update-user/${user._id}`}
                    className="btn btn-sm btn-outline-primary me-2"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(user._id)}
                    className="btn btn-sm btn-outline-danger"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="text-center text-muted">
                No users found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Users;

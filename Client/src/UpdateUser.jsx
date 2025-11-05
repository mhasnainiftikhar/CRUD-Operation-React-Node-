import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function UpdateUser() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");

  useEffect(() => {
    axios
      .get(`https://crud-operation-backend-blond.vercel.app/getuser/${id}`)
      .then((result) => {
        setUsername(result.data.username);
        setEmail(result.data.email);
        setAge(result.data.age);
      })
      .catch((err) => console.log("Error fetching user:", err));
  }, [id]);
  const handleUpdate = (e) => {
    e.preventDefault();
    axios
      .put(
        `https://crud-operation-backend-blond.vercel.app/update-user/${id}`,
        { username, email, age }
      )
      .then(() => {
        alert(" User updated successfully!");
        navigate("/");
      })
      .catch((err) => console.log("Error updating user:", err));
  };

  return (
    <div className="container mt-5">
      <div className="card shadow-sm p-4 mx-auto" style={{ maxWidth: "500px" }}>
        <h3 className="text-center mb-4">Update User</h3>
        <form onSubmit={handleUpdate}>
          <div className="mb-3">
            <label className="form-label">Full Name</label>
            <input
              type="text"
              className="form-control"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter updated name"
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Email Address</label>
            <input
              type="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter updated email"
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Age</label>
            <input
              type="number"
              className="form-control"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              placeholder="Enter updated age"
              min="1"
              required
            />
          </div>

          <div className="text-center mt-4">
            <button type="submit" className="btn btn-primary px-4">
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default UpdateUser;

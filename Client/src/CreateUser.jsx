import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function CreateUser() {
  const [username, setUsername] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [age, setAge] = React.useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post("https://crud-operation-backend-blond.vercel.app/create-user", {
        username,
        email,
        age,
      })
      .then((result) => {
        alert("User created successfully!");
        setUsername("");
        setEmail("");
        setAge("");
        navigate("/");
      })
      .catch((err) => {
        alert("Something went wrong! Check console for details.");
      });
  };

  return (
    <div className="container mt-5">
      <div className="card shadow-sm p-4 mx-auto" style={{ maxWidth: "500px" }}>
        <h3 className="text-center mb-4">Create New User</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Full Name</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter full name"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Email Address</label>
            <input
              type="email"
              className="form-control"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Age</label>
            <input
              type="number"
              className="form-control"
              placeholder="Enter age"
              min="1"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              required
            />
          </div>

          <div className="text-center mt-4">
            <button type="submit" className="btn btn-success px-4">
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateUser;

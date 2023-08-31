import React, { useState } from "react";
// import NavLink and useNavigate for redirect other page
import { useNavigate } from "react-router-dom";
// import restApi create function
import axios from "../../restApi/Api";

const Register = () => {
  //hooks start
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  // end hooks

  //submit from start
  const fromSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post("http://127.0.0.1:8000/api/register", {
        name,
        email,
        password,
      });
      // set csrfToken from session here for login
      const apiToken = response.data.api_token.plainTextToken;
      sessionStorage.setItem("csrfToken", apiToken);
      // set csrfToken from session here for login end here
      // remove data from browser
      setName("");
      setEmail("");
      setPassword("");
      return navigate("/dashboard");
      // end here
    } catch (error) {
      if (error.response && error.response.data.errors) {
        setErrors(error.response.data.errors);
      } else {
        console.error("Registration error:", error);
      }
    }
  };
  //submit from end

  return (
    <div className="col-lg-6 mx-auto pt-5 mt-5">
      <div className="mb-3">
        <label for="email" className="form-label">
          Name
        </label>
        <input
          type="email"
          className="form-control"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        {errors.name && (
          <div id="emailHelp" className="form-text text-danger">
            <b>{errors.name}</b>
          </div>
        )}
      </div>
      <div className="mb-3">
        <label for="email" className="form-label">
          Email address
        </label>
        <input
          type="email"
          className="form-control"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {errors.email && (
          <div id="emailHelp" className="form-text text-danger">
            <b>{errors.email}</b>
          </div>
        )}
      </div>

      <div className="mb-3">
        <label for="password" className="form-label">
          Password
        </label>
        <input
          type="password"
          className="form-control"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {errors.password && (
          <div id="emailHelp" className="form-text text-danger">
            <b>{errors.password}</b>
          </div>
        )}
      </div>

      <button onClick={fromSubmit} className="btn btn-primary">
        Submit
      </button>
    </div>
  );
};

export default Register;

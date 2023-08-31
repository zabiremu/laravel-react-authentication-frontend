import React, { useState } from "react";
// import restApi create function
import axios from "../../restApi/Api";
// import NavLink and useNavigate for redirect other page
import { Navigate, useNavigate } from "react-router-dom";

export const Login = () => {
  //hooks start
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [errors, setErrors] = useState("");
  const navigate = useNavigate();
  // end hooks

  //submit from start
  const submitForm = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post("http://127.0.0.1:8000/api/login", {
        email,
        password,
      });
      // set csrfToken from session here for login
      const apiToken = response.data.api_token.plainTextToken;
      sessionStorage.setItem("csrfToken", apiToken);
      // set csrfToken from session here for login end here
      // setIsLoggedIn(true) because we csrf token set so he is login
      setIsLoggedIn(true);
      // end here
      // remove data from browser
      setEmail("");
      setPassword("");
      navigate("/dashboard");
      // end here

    } catch (e) {
      console.log(e);
      setErrors(e.response.data.errors);
    }
  };
  //submit from end

  // if token is set then redirect from /dashboard
  const apiToken = sessionStorage.getItem("csrfToken");
  if (apiToken) {
    return <Navigate to={"/dashboard"}></Navigate>;
  }
  // end logic

  return (
    <div className="col-lg-6 mx-auto pt-5 mt-5">
      <div className="mb-3">
        <label for="email" className="form-label">
          Email address
        </label>
        <input
          type="email"
          className="form-control"
          id="email"
          value={email}
          name="email"
          onChange={(e) => setEmail(e.target.value)}
        />
        {errors.email && (
          <div id="emailHelp" className="form-text text-danger">
            <b>{errors.email}</b>
          </div>
        )}
      </div>
      <div className="mb-3">
        <label for="exampleInputPassword1" className="form-label">
          Password
        </label>
        <input
          type="password"
          className="form-control"
          id="exampleInputPassword1"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {errors.password && (
          <div id="emailHelp" className="form-text text-danger">
            <b>{errors.password}</b>
          </div>
        )}
      </div>
      <button type="submit" className="btn btn-primary" onClick={submitForm}>
        Submit
      </button>
    </div>
  );
};

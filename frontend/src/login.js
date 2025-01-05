import Header from "./header";
import { useNavigate } from "react-router-dom"; // Replace useHistory with useNavigate
import React, { useState, useEffect } from "react";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    if (localStorage.getItem("user-info")) {
      navigate("/add"); // Redirect to /add if already logged in
    }
  }, [navigate]);

  async function login() {
    console.warn(email, password);
    let item = { email, password };

    try {
      let response = await fetch("http://localhost:8000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(item),
      });

      let result = await response.json();
      localStorage.setItem("user-info", JSON.stringify(result));
      navigate("/add"); // Redirect to /add after login
    } catch (error) {
      console.error("Login failed:", error);
    }
  }

  return (
    <div>
      <Header />
      <h1>Login</h1>
      <br />
      <div className="col-sm-6 offset-sm-3">
        <input
          type="text"
          placeholder="email"
          onChange={(e) => setEmail(e.target.value)}
          className="form-control"
        />
        <br />
        <input
          type="password"
          placeholder="password"
          onChange={(e) => setPassword(e.target.value)}
          className="form-control"
        />
        <br />
        <button onClick={login} className="btn btn-primary">
          Login
        </button>
      </div>
    </div>
  );
}

export default Login;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Use useNavigate instead of useHistory
import Header from "./header"

function Register() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate(); // Initialize useNavigate

  // Sign-Up Function
  async function signUp() {
    let item = { name, password, email };
    console.warn("Submitting:", item);

    try {
      let response = await fetch("http://localhost:8000/api/register", {
        method: "POST",
        body: JSON.stringify(item),
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });

      let result = await response.json();
      console.log("Response:", result);

      // Store the user info in localStorage
      localStorage.setItem("user-info", JSON.stringify(result));

      // Redirect to "/add"
      navigate("/add");
    } catch (error) {
      console.error("Error:", error);
    }
  }

  return (
    <>
    <Header />
    <div className="col-sm-6 offset-sm-3">
      <h1>Register Page</h1>
      <input
        type="text"
        onChange={(e) => setName(e.target.value)}
        className="form-control"
        placeholder="Name"
        value={name}
      />
      <br />
      <input
        type="password"
        onChange={(e) => setPassword(e.target.value)}
        className="form-control"
        placeholder="Password"
        value={password}
      />
      <br />
      <input
        type="email"
        onChange={(e) => setEmail(e.target.value)}
        className="form-control"
        placeholder="Email"
        value={email}
      />
      <br />
      <button onClick={signUp} className="btn btn-primary">
        Sign-Up
      </button>
    </div>
    </>
  );
}

export default Register;

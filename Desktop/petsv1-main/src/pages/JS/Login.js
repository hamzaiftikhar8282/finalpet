import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "../css/authentication.css";
import signupImage from "../../images/petlogo.jpg";
import Dashboard from "./dashboard"
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await axios.post("http://localhost:5000/api/login", {
        email,
        password,
      });

      // Check response
      if (response.data && response.data.user) {
        const user = response.data.user;

        // ✅ Redirect based on user role if you have roles or simple navigation
        if (user.email === "admin@bloodbridge.com") {
          navigate("/Admin");
        } else {
          navigate("/Home");
        }
      }
    } catch (err) {
      if (err.response && err.response.data) {
        setError(err.response.data.message);
      } else {
        setError("An error occurred. Please try again.");
      }
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <img src={signupImage} alt="Sign Up" className="signup-image" />

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="auth-field">
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="auth-field">
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {error && <p className="error-text">{error}</p>}

          <button type="submit" className="auth-button">
            Login
          </button>
        </form>

        <p className="auth-text">
          <Link to="/forget_password" className="auth-link">
            Forgot Password?
          </Link>
        </p>
        <p className="auth-text">
          Don't have an account?{" "}
          <Link to="/SignUp" className="auth-link">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;

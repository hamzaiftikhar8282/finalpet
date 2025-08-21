import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "../css/authentication.css";
import signupImage from "../../images/petlogo.jpg";

const SignUp = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validateForm = () => {
    const { name, email, password, confirmPassword } = formData;
    if (!name.trim()) return setError("Name is required!");
    if (!email.includes("@") || !email.includes(".")) return setError("Enter a valid email address!");
    if (password.length < 6) return setError("Password must be at least 6 characters!");
    if (password !== confirmPassword) return setError("Passwords do not match!");
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!validateForm()) return;

    try {
      const res = await axios.post("http://localhost:5000/api/signup", {
        name: formData.name,
        email: formData.email,
        password: formData.password,
          confirmPassword: formData.confirmPassword,

      });

      alert(res.data.message);
      navigate("/login");
    } catch (err) {
      if (err.response) {
        setError(err.response.data.message);
      } else {
        setError("Signup failed! Please try again.");
      }
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <img src={signupImage} alt="Sign Up" className="signup-image" />

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="auth-field">
            <label>Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="auth-field">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="auth-field">
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <div className="auth-field">
            <label>Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
          </div>

          {error && <p className="error-text">{error}</p>}

          <button type="submit" className="auth-button">Sign Up</button>
        </form>

        <p className="auth-text">
          Already have an account? <Link to="/login" className="auth-link">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;

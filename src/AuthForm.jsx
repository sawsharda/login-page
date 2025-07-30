import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function AuthForm() {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate();

  const handleSignup = () => {
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    // Save user info in localStorage
    localStorage.setItem("userName", name);
    localStorage.setItem("userEmail", email);
    localStorage.setItem("userPassword", password);

    alert("Signup successful!");
    navigate("/profile");
  };

  const handleLogin = () => {
    const storedEmail = localStorage.getItem("userEmail");
    const storedPassword = localStorage.getItem("userPassword");

    const trimmedEmail = email.trim();
    const trimmedPassword = password.trim();

    if (trimmedEmail === storedEmail && trimmedPassword === storedPassword) {
      alert("Login successful!");
      navigate("/profile");
    } else {
      alert("Invalid email or password.");
    }
  };

  return (
    <div className="container">
      <motion.div
        className="form-container"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="form-toggle">
          <button
            type="button"
            className={isLogin ? "form-toggle-active" : ""}
            onClick={() => setIsLogin(true)}
          >
            Login
          </button>
          <button
            type="button"
            className={!isLogin ? "form-toggle-active" : ""}
            onClick={() => setIsLogin(false)}
          >
            Signup
          </button>
        </div>

        {isLogin ? (
          <motion.div
            className="form"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.2 }}
          >
            <h2>Login Form</h2>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button type="button" onClick={handleLogin}>Login</button>
            <p>
              Not a member?{" "}
              <a href="#" onClick={(e) => { e.preventDefault(); setIsLogin(false); }}>
                Signup now
              </a>
            </p>
          </motion.div>
        ) : (
          <motion.div
            className="form"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.2 }}
          >
            <h2>Signup Form</h2>
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <button type="button" onClick={handleSignup}>Signup</button>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}

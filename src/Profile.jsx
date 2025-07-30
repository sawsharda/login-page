import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function Profile() {
  const navigate = useNavigate();
  const name = localStorage.getItem("userName");
  const email = localStorage.getItem("userEmail");
  const [bio, setBio] = useState(localStorage.getItem("userBio") || "");
  const [editMode, setEditMode] = useState(false);
  const [newBio, setNewBio] = useState(bio);

  const [isDark, setIsDark] = useState({
    backgroundColor: "#f4f4f5",
    color: "black",
  });
  const [mode, setMode] = useState("Enable Dark Mode");

  const handleSaveBio = () => {
    try {
      localStorage.setItem("userBio", newBio);
      setBio(newBio);
      setEditMode(false);
      alert("Profile updated successfully!");
    } catch (error) {
      console.error("Error saving bio:", error);
      alert("Something went wrong. Check console for details.");
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  const toggleStyle = () => {
    if (isDark.color === "white") {
      setIsDark({
        color: "black",
        backgroundColor: "#f4f4f5",
      });
      setMode("Enable Dark Mode");
    } else {
      setIsDark({
        color: "white",
        backgroundColor: "#2c2b2bff",
      });
      setMode("Enable Light Mode");
    }
  };

  return (
    <div className="container">
      <motion.div
        className="form-container"
        style={isDark}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: .3 }}
      >
        <div className="form">
          <motion.h2
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.2 }}
          >
            Dashboard
          </motion.h2>
          <p><strong>Name:</strong> {name}</p>
          <p><strong>Email:</strong> {email}</p>
          <p><strong>Bio:</strong> {bio || "No bio yet."}</p>

          {editMode ? (
            <>
              <textarea
                rows="4"
                aria-label="User biography"
                placeholder="Enter your bio"
                value={newBio}
                onChange={(e) => setNewBio(e.target.value)}
                className="Bio"
              ></textarea>
              <button type="button" onClick={handleSaveBio}>Save</button>
              <button type="button" onClick={() => setEditMode(false)}>Cancel</button>
            </>
          ) : (
            <button type="button" onClick={() => setEditMode(true)}>Edit Profile</button>
          )}

          <br /><br />
          <button type="button" onClick={handleLogout}>Logout</button>
        </div>

        <br />
        <button type="button" onClick={toggleStyle}>{mode}</button>
      </motion.div>
    </div>
  );
}
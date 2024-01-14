import React, { useContext, useState } from "react";
import sequenceLogo from "../assets/sequence-logo.svg";
import { NavLink, useNavigate } from "react-router-dom";
import { AuthContext, defaultAuth } from "../context/AuthProvider";
import http from "../utils/http";
import { FiLogOut } from "react-icons/fi";

const Navbar = () => {
  const { auth, setAuth } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      // Send a request to the server to logout
      await http.post("/logout"); // Make sure this matches your API endpoint
      // Reset the auth state
      setAuth(defaultAuth);
      navigate("/login");
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };
  return (
    <nav>
      <NavLink to="/">
        <img src={sequenceLogo} alt="Sequence Logo" />
      </NavLink>

      <ul className="nav-items-container">
        <li className="nav-item active">
          <NavLink
            to="/profile"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Profile
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink
            to="/browse"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Browse
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink
            to="/liked"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Liked
          </NavLink>
        </li>
      </ul>

      <button onClick={handleLogout} className="logout-button">
        Logout <FiLogOut />
      </button>
    </nav>
  );
};

export default Navbar;

import React, { useState } from "react";
import sequenceLogo from "../assets/sequence-logo.svg";
import { NavLink } from "react-router-dom";

const Navbar = () => {
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
        <li className="nav-item">
          <NavLink
            to="/logout"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Logout
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;

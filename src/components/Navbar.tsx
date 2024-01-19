import React, { useContext, useState, useEffect } from "react";
import sequenceLogo from "../assets/sequence-logo.svg";
import { NavLink, useNavigate } from "react-router-dom";
import { AuthContext, defaultAuth } from "../context/AuthProvider";
import http from "../utils/http";
import { FiLogOut } from "react-icons/fi";

const Navbar = () => {
  const { auth, setAuth } = useContext(AuthContext);
  const navigate = useNavigate();
  const [lastScrollTop, setLastScrollTop] = useState(0);
  const [navbarHidden, setNavbarHidden] = useState(false);

  const handleLogout = async () => {
    try {
      // Send a request to the server to logout
      await http.post("/logout");
      // Reset the auth state
      setAuth(defaultAuth);
      navigate("/login");
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      if (scrollTop > lastScrollTop && scrollTop > 120) {
        setNavbarHidden(true);
      } else {
        setNavbarHidden(false);
      }
      setLastScrollTop(scrollTop);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollTop]);

  return (
    <nav className={navbarHidden ? "hide" : ""}>
      <NavLink to={auth.id ? "/dashboard" : "/"} className={() => "logo-class"}>
        <img src={sequenceLogo} alt="Sequence Logo" />
      </NavLink>
      {auth.id ? (
        <>
          <ul className="nav-items-container">
            <li className="nav-item">
              <NavLink
                to="/dashboard"
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
        </>
      ) : (
        <div className="nav-right-wrapper">
          <NavLink to="/login" className="login-button">
            Login
          </NavLink>
          <NavLink to="/login" className="register-button">
            Register
          </NavLink>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

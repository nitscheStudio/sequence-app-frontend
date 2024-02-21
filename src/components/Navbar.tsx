import { useContext, useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { AuthContext, defaultAuth } from "../context/AuthProvider";
import http from "../utils/http";

//Context
import { useTheme } from "../context/ThemeManagment";

//Image & Icon Imports
import { FiLogOut } from "react-icons/fi";
import { MdOutlineClose } from "react-icons/md";
import { HiMenuAlt3 } from "react-icons/hi";
import sequenceLogo from "../assets/sequence-logo.svg";
import sequenceLogoDarkMode from "../assets/sequence-logo_darkmode.svg";

const Navbar = () => {
  const { setAuth, isAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();
  const [lastScrollTop, setLastScrollTop] = useState(0);
  const [navbarHidden, setNavbarHidden] = useState(false);
  const [hideScrollTop, setHideScrollTop] = useState(0);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const { isDarkMode, toggleDarkMode } = useTheme();

  const toggleMobileMenu = () => {
    setIsMobileOpen(!isMobileOpen);
  };

  const handleLogout = async () => {
    try {
      // Send a request to the server to logout
      await http.post("/logout");
      // Reset the auth state
      setAuth(defaultAuth);
      navigate("/login", { state: { logoutSuccessful: true } });
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  const handleUploadClick = (event: React.MouseEvent) => {
    const windowWidth = window.innerWidth;
    const mobileBreakpoint = 640;

    if (windowWidth < mobileBreakpoint) {
      event?.preventDefault();
      navigate("/mobile-upload-info");
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const mobileBreakpoint = 640;

      // Get the current window width
      const windowWidth = window.innerWidth;

      // Proceed with hiding logic only if window width is greater than mobile breakpoint
      if (windowWidth > mobileBreakpoint) {
        const currentScrollTop = window.scrollY;
        if (currentScrollTop > lastScrollTop && currentScrollTop > 140) {
          setNavbarHidden(true);
          setHideScrollTop(currentScrollTop);
        } else if (hideScrollTop - currentScrollTop > 30) {
          setNavbarHidden(false);
        }
        setLastScrollTop(currentScrollTop);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollTop, hideScrollTop]);

  return (
    <nav className={`main-navigation ${navbarHidden ? "hide" : ""}`}>
      <NavLink
        to={isAuthenticated() ? "/dashboard" : "/"}
        className={() => "logo-class"}
      >
        <img
          src={isDarkMode ? sequenceLogoDarkMode : sequenceLogo}
          alt="Sequence Logo"
        />
      </NavLink>

      {isAuthenticated() ? (
        <>
          <ul className={`nav-items-container ${isMobileOpen ? "show" : ""}`}>
            <li className="nav-item">
              <NavLink
                onClick={() => {
                  window.scrollTo(0, 0);
                  if (isMobileOpen) toggleMobileMenu(); // Close the mobile menu if it's open
                }}
                to="/dashboard"
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                Profile
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                onClick={() => {
                  window.scrollTo(0, 0);
                  if (isMobileOpen) toggleMobileMenu(); // Close the mobile menu if it's open
                }}
                to="/browse"
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                Browse
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                onClick={(event) => {
                  window.scrollTo(0, 0);
                  if (isMobileOpen) toggleMobileMenu();
                  handleUploadClick(event); // Check device type before navigating
                }}
                to="/upload"
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                Upload
              </NavLink>
            </li>
            {/* Logout button within the nav items for mobile view */}
            <li className="nav-item mobile-logout">
              <button onClick={handleLogout} className="logout">
                Logout <FiLogOut />
              </button>
            </li>
          </ul>

          <div className="mobile-navigation" onClick={toggleMobileMenu}>
            {isMobileOpen ? (
              <MdOutlineClose size={36} />
            ) : (
              <HiMenuAlt3 className="burger-menu-icon" />
            )}
          </div>

          <button onClick={handleLogout} className="logout-button">
            Logout <FiLogOut />
          </button>
        </>
      ) : (
        <div className="nav-right-wrapper">
          <NavLink to="/login" className="login-button">
            Login
          </NavLink>
          <NavLink to="/register" className="register-button">
            Register
          </NavLink>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

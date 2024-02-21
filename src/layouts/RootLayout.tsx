import { NavLink, Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Login from "../pages/Login";
import { AuthContext, defaultAuth } from "../context/AuthProvider";
import http from "../utils/http";
import { useContext, useEffect } from "react";
import Footer from "../components/Footer";
import ToggleDarkMode from "../components/ToggleDarkMode";

const RootLayout = () => {
  const { auth } = useContext(AuthContext);

  return (
    <>
      <Navbar />
      <main>
        <Outlet />
        <ToggleDarkMode />
      </main>
      <Footer />
    </>
  );
};

export default RootLayout;

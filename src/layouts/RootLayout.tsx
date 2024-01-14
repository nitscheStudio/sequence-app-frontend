import { NavLink, Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Login from "../pages/Login";
import { AuthContext, defaultAuth } from "../context/AuthProvider";
import http from "../utils/http";
import { useContext, useEffect } from "react";

const RootLayout = () => {
  const { auth, setAuth } = useContext(AuthContext);

  const getInitialAuth = async () => {
    try {
      const response = await http.get("user");
      setAuth({ ...response.data });
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  useEffect(() => void getInitialAuth(), []);
  return (
    <>
      <Navbar />
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default RootLayout;

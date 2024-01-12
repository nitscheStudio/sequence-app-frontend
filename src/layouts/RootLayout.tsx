import { NavLink, Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Login from "../pages/Login";

const RootLayout = () => {
  return (
    <div>
      <Navbar />
      <Login />
    </div>
  );
};

export default RootLayout;

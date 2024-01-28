import { useContext } from "react";
import { Outlet, Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../context/AuthProvider";

const ProtectedLayout = () => {
  const { auth, isAuthenticated } = useContext(AuthContext);
  const location = useLocation();

  return isAuthenticated() ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default ProtectedLayout;

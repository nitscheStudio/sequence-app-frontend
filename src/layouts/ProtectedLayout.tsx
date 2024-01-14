import { useContext } from "react";
import { Outlet, Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../context/AuthProvider";

const ProtectedLayout = () => {
  const { auth } = useContext(AuthContext);
  const location = useLocation();

  console.log(auth);

  return auth.id ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default ProtectedLayout;

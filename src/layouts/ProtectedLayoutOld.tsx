import { useContext, useEffect, useState } from "react";
import { Outlet, Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../context/AuthProvider";
import http from "../utils/http";

const ProtectedLayout = () => {
  const { auth, isAuthenticated, isLoading } = useContext(AuthContext);
  const location = useLocation();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated()) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <Outlet />;
};

export default ProtectedLayout;

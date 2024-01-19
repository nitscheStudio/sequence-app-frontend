import { useContext, useEffect, useState } from "react";
import { Outlet, Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../context/AuthProvider";
import http from "../utils/http";

const ProtectedLayout = () => {
  const { auth, setAuth } = useContext(AuthContext);
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);

  const getInitialAuth = async () => {
    try {
      const response = await http.get("user");
      setAuth({ ...response.data });
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching user data:", error);
    } finally {
      setIsLoading(false); // Set loading to false after fetching
    }
  };

  useEffect(() => void getInitialAuth(), []);

  console.log("Current auth state:", auth);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return auth.id ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default ProtectedLayout;

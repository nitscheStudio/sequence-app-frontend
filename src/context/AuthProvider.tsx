import { createContext, useState, ReactNode, useEffect } from "react";
import http from "../utils/http";

type Props = {
  children: ReactNode;
};

type Auth = {
  id: number | null;
  username: string | null;
  is_private: boolean | null;
  profile_picture_path: string | null;
  samplesCount: number;
};

type AuthContext = {
  auth: Auth;
  setAuth: React.Dispatch<React.SetStateAction<Auth>>;
  isAuthenticated: () => boolean;
  updateProfilePicture: UpdateProfilePicture;
  isLoading: boolean;
};

type UpdateProfilePicture = (newPath: string) => void;

export const defaultAuth: Auth = {
  id: null,
  username: null,
  is_private: null,
  profile_picture_path: null,
  samplesCount: 0,
};

const defaultAuthContext = {
  auth: defaultAuth,
  setAuth: () => {},
  isAuthenticated: () => false,
  isLoading: true,
  updateProfilePicture: (newPath: string) => {},
} as AuthContext;

export const AuthContext = createContext(defaultAuthContext);

const AuthProvider = ({ children }: Props) => {
  const [auth, setAuth] = useState(defaultAuth);
  const [isLoading, setIsLoading] = useState(true);

  const isAuthenticated = () => {
    return auth.id !== null; // User is considered authenticated if `id` is not null
  };

  const fetchUserData = async () => {
    try {
      await http.get("/sanctum/csrf-cookie");
      const response = await http.get("/user");
      setAuth({ ...response.data });
    } catch (error) {
      console.error("Error fetching user data:", error);
      // Handle the error as needed (e.g., redirect to login, show error message)
    } finally {
      setIsLoading(false); // Update the loading state regardless of success or failure
    }
  };

  const updateProfilePicture = (newPath: string) => {
    setAuth((prevAuth) => ({
      ...prevAuth,
      profile_picture_path: newPath,
    }));
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        auth,
        setAuth,
        isAuthenticated,
        isLoading,
        updateProfilePicture,
      }}
    >
      {!isLoading ? children : <div>Loading...</div>}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

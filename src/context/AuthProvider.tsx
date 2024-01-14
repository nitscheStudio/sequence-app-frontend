import { createContext, useState, ReactNode } from "react";

type Props = {
  children: ReactNode;
};

type Auth = {
  id: number | null;
  username: string | null;
  is_private: boolean | null;
  profile_picture_path: string | null;
};

type AuthContext = {
  auth: Auth;
  setAuth: React.Dispatch<React.SetStateAction<Auth>>;
};

export const defaultAuth: Auth = {
  id: null,
  username: null,
  is_private: null,
  profile_picture_path: null,
};

const defaultAuthContext = {
  auth: defaultAuth,
  setAuth: () => {},
} as AuthContext;

export const AuthContext = createContext(defaultAuthContext);

const AuthProvider = ({ children }: Props) => {
  const [auth, setAuth] = useState(defaultAuth);
  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

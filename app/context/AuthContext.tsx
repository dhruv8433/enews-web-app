"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
  useMemo,
} from "react";
import Cookies from "js-cookie";

// ✅ User interface based on API response
export interface User {
  _id: string;
  fullname: string;
  email: string;
  role: "admin" | "author" | "user";
  avatar_url: string;
  status: "active" | "inactive" | string;
  created_at: string;
  updated_at: string;
}

// ✅ Auth context type
interface AuthContextType {
  user: User | null;
  setUser: Dispatch<SetStateAction<User | null>>;
  // Optional: logout: () => void;
}

// ✅ Create context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// ✅ Provider props type
interface AuthProviderProps {
  children: ReactNode;
}

// ✅ AuthProvider component
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const userCookie = Cookies.get("user");
    if (userCookie) {
      try {
        const parsedUser: User = JSON.parse(decodeURIComponent(userCookie));
        setUser(parsedUser);
      } catch (error) {
        console.error("Invalid user cookie:", error);
      }
    }
  }, []);

  const value = useMemo(() => ({ user, setUser /*, logout */ }), [user]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// ✅ Custom hook for accessing auth context
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

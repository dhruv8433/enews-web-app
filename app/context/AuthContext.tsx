// AuthContext.tsx (or wherever your AuthProvider is)
'use client';

import React, { createContext, useContext, useEffect, useState, ReactNode, useMemo } from "react";
import Cookies from "js-cookie";
import { httpAxios } from "../httpAxios"; // your axios instance
import toast from "react-hot-toast";
import { LoginFormData, User, LoginResponse } from "../types/auth.types";
import { useRouter } from "next/navigation";

interface AuthContextType {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  login: (formData: LoginFormData) => Promise<void>;
  logout: () => void;
  deleteAccount: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

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

  const login = async (formData: LoginFormData) => {
    try {
      const res = await httpAxios.post<LoginResponse>("/auth/login", formData);
      const loggedInUser = res.data?.data?.user;
      if (loggedInUser) {
        Cookies.set("user", encodeURIComponent(JSON.stringify(loggedInUser)), { expires: 7 });
        setUser(loggedInUser);
        toast.success(res.data?.message || "User logged in successfully!");
      }
    } catch (error) {
      toast.error("Login failed");
      console.error("Login error:", error);
    }
  };

  const logout = async () => {
    try {
      await httpAxios.post("/auth/logout")
      Cookies.remove("user");
      setUser(null);
      toast.success("Logged out successfully");
      router.push("/");
    } catch (error) {
      toast.error("Logout failed");
      console.error("Logout error:", error);
    }
  };

  const deleteAccount = async () => {
    try {
      await httpAxios.delete("/auth/delete-account");
      Cookies.remove("user");
      setUser(null);
      toast.success("Account deleted successfully");
      router.push("/");
    } catch (error) {
      toast.error("Failed to delete account");
      console.error("Delete account error:", error);
    }
  }

  const value = useMemo(() => ({ user, setUser, login, logout, deleteAccount }), [user]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};

// hooks/useAuth.ts

import toast from "react-hot-toast";
import { httpAxios } from "../httpAxios";
import { LoginFormData, SignupFormData } from "../types/auth.types";
import { LoginResponse, SignupResponse } from "../types/auth.types";

export const useAuth = () => {
    const handleSignUp = async (userData: SignupFormData): Promise<SignupResponse | undefined> => {
        const formData = new FormData();
        formData.append("fullname", userData.fullname || "");
        formData.append("email", userData.email);
        formData.append("password", userData.password);
        formData.append("phone_no", userData.phone_no || "");
        formData.append("role", userData.role || "user");

        if (userData.avatar) {
            formData.append("avatar", userData.avatar);
        }

        try {
            const res = await httpAxios.post<SignupResponse>("/auth/register", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            toast.success(res.data?.message || "User signed up successfully!");
            return res.data;
        } catch (error: any) {
            toast.error(error.response?.data?.message || "Signup failed");
            console.error("Signup error:", error);
        }
    };

    const handleLogin = async (formData: LoginFormData): Promise<LoginResponse | undefined> => {
        try {
            const res = await httpAxios.post<LoginResponse>("/auth/login", formData);
            localStorage.setItem("user", JSON.stringify(res.data?.data?.user));
            toast.success(res.data?.message || "User logged in successfully!");
            return res.data;
        } catch (error: any) {
            toast.error(error.response?.data?.message || "Login failed");
            console.error("Login error:", error);
        }
    };

    return { handleSignUp, handleLogin };
};

// hooks/useAuth.ts
import toast from "react-hot-toast";
import { httpAxios } from "../httpAxios";
import { LoginFormData, SignupFormData } from "../types/auth.types";
import { LoginResponse, SignupResponse } from "../types/auth.types";
import { ErrorType } from "../types/error.types";
import { useState } from "react";
import Cookies from "js-cookie";

export const useAuth = () => {
    const [error, setError] = useState<ErrorType | null>(null);

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
        } catch (error) {
            setError({
                message: 'Signup failed',
                details: (error as Error).message,
            });
            console.error("Signup error:", error);
        }
    };

    const handleLogin = async (formData: LoginFormData): Promise<LoginResponse | undefined> => {
        try {
            const res = await httpAxios.post<LoginResponse>("/auth/login", formData);
            Cookies.set("user", encodeURIComponent(JSON.stringify(res.data?.data?.user)), { expires: 7 });
            toast.success(res.data?.message || "User logged in successfully!");
            return res.data;
        } catch (error) {
            setError({
                message: 'Login failed',
                details: (error as Error).message,
            });
            console.error("Login error:", error);
        }
    };

    const handleUpdateProfile = async (userData: { fullname: string; email: string; avatar: File | null }) => {
        const formData = new FormData();
        formData.append("fullname", userData.fullname);
        formData.append("email", userData.email);
        if (userData.avatar) {
            formData.append("avatar", userData.avatar);
        }

        try {
            const res = await httpAxios.put("/auth/update", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            toast.success("Profile updated successfully!");
            return res.data;
        } catch (error) {
            setError({
                message: 'Profile update failed',
                details: (error as Error).message,
            });
            toast.error("Failed to update profile");
            console.error("Profile update error:", error);
        }
    };

    return { handleSignUp, handleLogin, handleUpdateProfile, error };
};

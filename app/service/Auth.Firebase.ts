import toast from "react-hot-toast";
import { httpAxios } from "../httpAxios";
import { FormDataType } from "../types/formData.types";

// Sign up a new user
const handleSignUp = async (userData: FormDataType) => {
    const formData = new FormData();
    formData.append("fullname", userData.name || "");
    formData.append("email", userData.email);
    formData.append("password", userData.password);
    formData.append("phone_no", userData.phone_no || "");
    formData.append("role", "user");

    if (userData.avatar) {
        formData.append("avatar", userData.avatar); // avatar is now a File
    }

    try {
        const user = await httpAxios.post("/auth/register", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
        console.log("User signed up:", user);
        toast.success(user.data?.message || "User signed up successfully!");
        return user;
    } catch (error) {
        console.error("Error signing up:", error);
    }
};

// Log in an existing user
const handleLogin = async (formData: FormDataType) => {
    try {
        const user = await httpAxios.post("/auth/login", { email: formData.email, password: formData.password });
        console.log("User logged in:", user);
        // Store the token in local storage or a cookie
        localStorage.setItem("user", JSON.stringify(user.data?.data?.user));
        toast.success(user.data?.message || "User logged in successfully!");
        return user;
    } catch (error) {
        console.error("Error logging in:", error);
    }
};

export { handleLogin, handleSignUp }
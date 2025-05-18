import React, { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { SignupFormData } from "../types/auth.types";
import toast from "react-hot-toast";

const AuthModal = () => {
    const { handleSignUp, handleLogin } = useAuth();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isLoginMode, setIsLoginMode] = useState(false);

    const [formData, setFormData] = useState<SignupFormData>({
        fullname: "",
        email: "",
        password: "",
        phone_no: "",
        role: "user",
        avatar: undefined,
    });

    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value, files } = e.target as any;
        if (name === "avatar" && files?.[0]) {
            setFormData({ ...formData, avatar: files[0] });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            if (isLoginMode) {
                await handleLogin({ email: formData.email, password: formData.password });
            } else {
                if (formData.password !== confirmPassword) {
                    toast.error("Passwords do not match");
                    return;
                }
                await handleSignUp(formData);
            }

            setIsModalOpen(false);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <button onClick={() => setIsModalOpen(true)} className="px-6 py-2 bg-blue-600 text-white rounded">
                {isLoginMode ? "Login" : "Signup"}
            </button>

            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="card rounded-lg shadow-lg w-full max-w-md p-6 relative">
                        <button onClick={() => setIsModalOpen(false)} className="absolute top-3 right-3 text-xl">
                            &times;
                        </button>
                        <h2 className="text-2xl font-semibold mb-4 text-center">
                            {isLoginMode ? "Login" : "Signup"}
                        </h2>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            {!isLoginMode && (
                                <>
                                    <input type="text" name="fullname" value={formData.fullname} onChange={handleChange} placeholder="Full Name" required className="w-full border px-4 py-2 rounded" />
                                    <input type="text" name="phone_no" value={formData.phone_no} onChange={handleChange} placeholder="Phone Number" className="w-full border px-4 py-2 rounded" />
                                    <input type="file" name="avatar" accept="image/*" onChange={handleChange} className="w-full border px-4 py-2 rounded" />
                                </>
                            )}

                            <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" required className="w-full border px-4 py-2 rounded" />
                            <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Password" required className="w-full border px-4 py-2 rounded" />

                            {!isLoginMode && (
                                <input type="password" name="confirmPassword" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="Confirm Password" required className="w-full border px-4 py-2 rounded" />
                            )}

                            <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded">
                                {loading ? "Loading..." : isLoginMode ? "Login" : "Signup"}
                            </button>
                        </form>

                        <p className="text-center mt-4 text-sm">
                            {isLoginMode ? "Don't have an account?" : "Already have an account?"}
                            <button onClick={() => setIsLoginMode(!isLoginMode)} className="text-blue-600 underline ml-1">
                                {isLoginMode ? "Signup" : "Login"}
                            </button>
                        </p>
                    </div>
                </div>
            )}
        </>
    );
};

export default AuthModal;

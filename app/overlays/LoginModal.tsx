import React, { useState } from "react";
import { motion } from "framer-motion";
import { X } from "lucide-react";
import GoogleButton from "../common/GoogleButton";

const LoginModal = ({ onClose, setSignupModel, setLoginModel }: { onClose: () => void, setSignupModel: (value: boolean) => void, setLoginModel: (value: boolean) => void }) => {
    const [form, setForm] = useState({ email: "", password: "" });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-opacity-50 backdrop-blur-md">
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="relative w-full max-w-md p-6 bg-white shadow-xl rounded-2xl border border-gray-200"
            >
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 transition"
                >
                    <X size={24} />
                </button>

                {/* Title */}
                <h2 className="text-2xl font-bold text-center text-gray-800">
                    Welcome Back!
                </h2>

                {/* Form Fields */}
                <form className="mt-5 space-y-4">
                    <div>
                        <label className="block text-gray-600 text-sm font-medium">
                            Email
                        </label>
                        <input
                            type="email"
                            name="email"
                            value={form.email}
                            onChange={handleChange}
                            className="w-full p-3 mt-1 text-gray-800 bg-gray-100 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none transition"
                            placeholder="Enter your email"
                        />
                    </div>

                    <div>
                        <label className="block text-gray-600 text-sm font-medium">
                            Password
                        </label>
                        <input
                            type="password"
                            name="password"
                            value={form.password}
                            onChange={handleChange}
                            className="w-full p-3 mt-1 text-gray-800 bg-gray-100 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none transition"
                            placeholder="Enter your password"
                        />
                    </div>

                    {/* Login Button */}
                    <button
                        type="submit"
                        className="w-full p-3 mt-3 text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition font-semibold"
                    >
                        Log In
                    </button>
                </form>

                {/* Footer - Toggle to Signup */}
                <p className="mt-4 text-sm text-center text-gray-600">
                    Don't have an account?{" "}
                    <button
                        onClick={() => {
                            onClose(); // Close login modal
                            setSignupModel(true); // Open signup modal
                        }}
                        className="text-blue-500 hover:underline"
                    >
                        Sign up
                    </button>
                </p>

                {/* Google login */}
                <GoogleButton CloseModel={setLoginModel} />
            </motion.div>
        </div>
    );
};

export default LoginModal;

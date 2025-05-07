import React, { useState } from "react";
import { X } from "lucide-react";
import { motion } from "framer-motion";
import GoogleButton from "../common/GoogleButton";
import { handleSignUp } from "../service/Auth.Firebase";
import toast from "react-hot-toast";
import { Box } from "@mui/material";
import notifications from "../constants/notifications";
import SyncLoader from 'react-spinners/SyncLoader';

const SignupModal = ({ onClose, setLoginModal, setSignupModal }: { onClose: () => void, setLoginModal: (value: boolean) => void, setSignupModal: (value: boolean) => void }) => {
    const [form, setForm] = useState({ name: "", email: "", password: "", phone_no: "", avatar: undefined as File | undefined });
    // const [preview, setPreview] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setForm({ ...form, avatar: file });
            // setPreview(URL.createObjectURL(file));
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        if (form.password.length < 6) {
            setLoading(false);
            return toast.error(notifications.error.passwordLength.description);
        }
        try {
            const userSignedUp = await handleSignUp(form);
            if (userSignedUp !== undefined) {
                setSignupModal(false);
            }
        } catch (error) {
            console.error("Error signing up:", error);
            toast.error("An error occurred during sign-up. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box p={{ xs: "20px", md: "0px" }} className="fixed inset-0 flex items-center justify-center bg-opacity-50 backdrop-blur-md">
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="relative w-full max-w-md p-6 bg-white shadow-xl rounded-2xl"
            >
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-3 right-3 text-gray-500"
                >
                    <X size={24} />
                </button>

                {/* Title */}
                <h2 className="text-2xl font-bold text-center text-gray-800">
                    Create an Account
                </h2>

                {/* Form Fields */}
                <form className="mt-5 space-y-4" onSubmit={handleSubmit}>
                    <div>
                        <label className="block text-gray-600 text-sm font-medium">Full Name</label>
                        <input
                            type="text"
                            name="name"
                            value={form.name}
                            onChange={handleChange}
                            className="w-full p-3 mt-1 text-gray-800 bg-gray-100 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition"
                            placeholder="Enter your name"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-gray-600 text-sm font-medium">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={form.email}
                            onChange={handleChange}
                            className="w-full p-3 mt-1 text-gray-800 bg-gray-100 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition"
                            placeholder="Enter your email"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-gray-600 text-sm font-medium">Password</label>
                        <input
                            type="password"
                            name="password"
                            value={form.password}
                            onChange={handleChange}
                            className="w-full p-3 mt-1 text-gray-800 bg-gray-100 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition"
                            placeholder="Create a password"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-gray-600 text-sm font-medium">Phone Number</label>
                        <input
                            type="tel"
                            name="phone_no"
                            value={form.phone_no}
                            onChange={handleChange}
                            className="w-full p-3 mt-1 text-gray-800 bg-gray-100 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition"
                            placeholder="Enter your phone number"
                        />
                    </div>

                    <div>
                        <label className="block text-gray-600 text-sm font-medium">Avatar</label>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleAvatarChange}
                            className="w-full p-3 mt-1 text-gray-800 bg-gray-100 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition"
                        />
                        {/* {preview && (
                            <img
                                src={preview}
                                alt="Avatar Preview"
                                className="mt-2 w-24 h-24 rounded-full object-cover"
                            />
                        )} */}
                    </div>

                    {/* Signup Button */}
                    <button
                        type="submit"
                        className="w-full p-3 mt-3 text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition font-semibold flex justify-center items-center"
                    >
                        {loading ? (
                            <div className="flex justify-center items-center">
                                <SyncLoader color={"#ffffff"} size={8} />
                            </div>
                        ) : (
                            "Sign Up"
                        )}
                    </button>
                </form>

                {/* Footer - Toggle to Login */}
                <p className="mt-4 text-sm text-center text-gray-600">
                    Already have an account?{" "}
                    <button
                        onClick={() => {
                            onClose(); // Close signup modal
                            setLoginModal(true); // Open login modal
                        }}
                        className="text-blue-500 hover:underline"
                    >
                        Log in
                    </button>
                </p>

                {/* Google login */}
                <GoogleButton CloseModel={setSignupModal} />
            </motion.div>
        </Box>
    );
};

export default SignupModal;

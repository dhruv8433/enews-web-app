import toast from "react-hot-toast";
import { FiX } from "react-icons/fi";
import React, { useState } from "react";
import { handleSignUp } from "../service/Auth.Firebase";
import notifications from "../constants/notifications";

const SignupModal = ({
    onClose,
    setLoginModal,
    setSignupModal,
}: {
    onClose: () => void;
    setLoginModal: (value: boolean) => void;
    setSignupModal: (value: boolean) => void;
}) => {
    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
        phone_no: "",
        avatar: undefined as File | undefined,
    });
    const [loading, setLoading] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setForm({ ...form, avatar: file });
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
        <div className="fixed inset-0 flex items-center justify-center bg-opacity-50 backdrop-blur-md bg-gray-900/30">
            <div className="relative w-full max-w-md p-6 bg-white shadow-xl rounded-2xl">
                {/* Close Button */}
                <button onClick={onClose} className="absolute top-3 right-3 text-gray-500">
                    <FiX size={24} />
                </button>

                {/* Title */}
                <h2 className="text-2xl font-bold text-center text-gray-800">Create an Account</h2>

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
                    </div>

                    {/* Signup Button */}
                    <button
                        type="submit"
                        className="w-full p-3 mt-3 text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition font-semibold"
                        disabled={loading}
                    >
                        {loading ? "Signing Up..." : "Sign Up"}
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
            </div>
        </div>
    );
};

export default SignupModal;

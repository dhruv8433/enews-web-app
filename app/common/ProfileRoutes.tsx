import React, { useState } from "react";
import { motion } from "framer-motion";
import { Divider, Backdrop, Box, Button, Typography } from "@mui/material";
import { profileLinks } from "../site/site.config";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../site/firebase.config";
import Link from "next/link";
import MyButtons from "./MyButtons";
import { useRouter } from "next/navigation";

const ProfileRoutes = () => {
    const [user] = useAuthState(auth);
    const [openBackdrop, setOpenBackdrop] = useState(false);
    const [selectedAction, setSelectedAction] = useState<"logout" | "delete" | null>(null);
    const router = useRouter();

    // Handle opening the backdrop
    const handleOpenBackdrop = (action: "logout" | "delete") => {
        setSelectedAction(action);
        setOpenBackdrop(true);
    };

    // Handle closing the backdrop
    const handleCloseBackdrop = () => {
        setOpenBackdrop(false);
        setSelectedAction(null);
    };

    // Handle confirmation action
    const handleConfirmAction = () => {
        if (selectedAction === "logout") {
            auth.signOut(); // Firebase logout
            router.replace("/"); // Redirect to home page
        } else if (selectedAction === "delete") {
            auth.signOut(); // Firebase logout
            router.replace("/"); // Redirect to home page
            console.log("Delete account logic here"); // Replace with delete function
        }
        handleCloseBackdrop();
    };

    return (
        <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="bg-white rounded-lg p-6 w-full border-2 border-gray-200"
        >
            {/* User Info */}
            <div className="flex flex-col items-center gap-2 mb-4">
                <img
                    src={user?.photoURL ?? "https://cdn3.iconfinder.com/data/icons/web-design-and-development-2-6/512/87-1024.png"}
                    alt="User Avatar"
                    className="w-32 h-32 rounded-full border-4 border-blue-500 shadow-md"
                />
                <div className="text-center">
                    <h2 className="text-lg font-semibold text-gray-900">{user?.displayName}</h2>
                    <p className="text-sm text-gray-500">{user?.email}</p>
                </div>
            </div>

            <div className="my-2">
                <Divider />
            </div>

            {/* Navigation Links */}
            <div className="my-6">
                {profileLinks.map((link, index) => {
                    const IconComponent = link.icon;
                    return link.danger ? (
                        <div
                            key={index}
                            onClick={() => handleOpenBackdrop(link.name === "Logout" ? "logout" : "delete")}
                            className="cursor-pointer flex items-center gap-3 p-3 rounded-lg text-red-600 hover:bg-red-100"
                        >
                            <span className="text-lg"><IconComponent /></span>
                            <span className="text-sm font-medium">{link.name}</span>
                        </div>
                    ) : (
                        <Link key={index} href={'/profile/' + link.route}>
                            <motion.div
                                whileHover={{ scale: 1.05 }}
                                transition={{ type: "spring", stiffness: 300 }}
                                className="flex items-center gap-3 p-3 rounded-lg text-gray-700 transition hover:bg-gray-100"
                            >
                                <span className="text-lg"><IconComponent /></span>
                                <span className="text-sm font-medium">{link.name}</span>
                            </motion.div>
                        </Link>
                    );
                })}
            </div>

            {/* Backdrop & Confirmation Box */}
            <Backdrop open={openBackdrop} sx={{ zIndex: 9999, color: "#fff", backdropFilter: "blur(5px)" }}>
                <div className="bg-white p-5 rounded-lg text-center w-[300px] text-black">
                    <h1 className="text-lg font-semibold text-start">
                        {selectedAction === "logout" ? "Logout Confirmation" : "Delete Account"}
                    </h1>
                    <h1 className="mb-3 text-start">
                        {selectedAction === "logout"
                            ? "Are you sure you want to log out?"
                            : "Are you sure you want to delete your account? This action cannot be undone!"}
                    </h1>
                    <div className="flex gap-2 justify-end my-3">
                        <MyButtons title="cancle" className="border bg-transparent text-black p-1 rounded" onClick={handleCloseBackdrop} />
                        <MyButtons title="Logout" className="bg-red-500 p-1 rounded hover:bg-red-600" onClick={handleConfirmAction} />
                    </div>
                </div>
            </Backdrop>
        </motion.div>
    );
};

export default ProfileRoutes;

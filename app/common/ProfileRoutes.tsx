import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Divider, Backdrop, Box } from "@mui/material";
import { profileLinks } from "../site/site.config";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../site/firebase.config";
import Link from "next/link";
import MyButtons from "./MyButtons";
import { useParams, useRouter } from "next/navigation";
import slugify from "slugify";
import { FirebaseError } from "firebase/app";

const ProfileRoutes = () => {
    const [user] = useAuthState(auth);
    const [openBackdrop, setOpenBackdrop] = useState(false);
    const [selectedAction, setSelectedAction] = useState<"logout" | "delete" | null>(null);
    const router = useRouter();

    // fetch options for active index
    const { option } = useParams();
    console.log(option)

    useEffect(() => {
        if (!user) {
            router.push("/");
        }
    }, [user, router]);

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
    const handleConfirmAction = async () => {
        if (selectedAction === "logout") {
            auth.signOut(); // Firebase logout
            router.replace("/"); // Redirect to home page
        } else if (selectedAction === "delete" && user) {
            try {
                await user.delete(); // Delete the user's account
                router.replace("/"); // Redirect to home page after deletion
            } catch (error: unknown) {
                if (error instanceof FirebaseError) {
                    if (error.code === "auth/requires-recent-login") {
                        alert("You need to re-login before deleting your account.");
                        auth.signOut();
                        router.replace("/login"); // Redirect to login page for re-authentication
                    } else {
                        console.error("Error deleting account:", error.message);
                        alert("Failed to delete account. Please try again.");
                    }
                }
            }
            handleCloseBackdrop();
        };


        return (
            <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                style={{ background: `var(--secondary)` }}
                className="rounded-lg p-6 w-full border-2 border-gray-200"
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
                <Box display={{ xs: "flex", md: "block" }} overflow={{ xs: "auto", md: "visible" }} className="my-6 gap-2">
                    {profileLinks.map((link, index) => {
                        const IconComponent = link.icon;
                        return link.danger ? (
                            <div
                                key={index}
                                onClick={() => handleOpenBackdrop(link.name === "Logout" ? "logout" : "delete")}
                                className="cursor-pointer my-2 flex items-center gap-3 p-3 rounded-lg text-red-600 hover:bg-red-100"
                            >
                                <Box display={{ xs: "none", md: "flex" }}><span className="text-lg"><IconComponent /></span></Box>
                                <span className="text-sm font-medium w-max">{link.name}</span>
                            </div>
                        ) : (
                            <Link key={index} href={'/profile/' + link.route}>
                                <motion.div
                                    className={`flex items-center gap-3 p-3 rounded-lg text-gray-700 my-2 ${option == slugify(link.name).toLowerCase() ? "text-white bg-blue-700" : ""} `}
                                >
                                    <Box display={{ xs: "none", md: "flex" }}><span className="text-lg"><IconComponent /></span></Box>
                                    <span className="text-sm font-medium w-max">{link.name}</span>
                                </motion.div>
                            </Link>
                        );
                    })}
                </Box>

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
                            <MyButtons title="cancle" className="border bg-gray-400 p-1 rounded" onClick={handleCloseBackdrop} />
                            {selectedAction === "logout" ?
                                <MyButtons title="Logout" className="bg-red-500 p-1 rounded hover:bg-red-600" onClick={handleConfirmAction} />
                                : <MyButtons title="Confirm Delete" className="bg-red-500 p-1 rounded hover:bg-red-600" onClick={handleConfirmAction} />
                            }
                        </div>
                    </div>
                </Backdrop>
            </motion.div>
        );
    };
}

export default ProfileRoutes;

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Divider } from "@mui/material";
import { profileLinks } from "../site/site.config";


const ProfileRoutes = () => {
    const [user, setUser] = useState<any>(null);

    // Load user from localStorage
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const storedUser = localStorage.getItem('user');
            if (storedUser) {
                setUser(JSON.parse(storedUser));
            }
        }
    }, []);

    return (
        <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="bg-white shadow-lg rounded-lg p-6 w-full border border-gray-200"
        >
            {/* User Info */}
            <div className="flex flex-col items-center gap-2 mb-4">
                <img src={user?.photoURL} alt="User Avatar" className="w-32 h-32 rounded-full border-4 border-blue-500 shadow-md" />
                <div className="text-center">
                    <h2 className="text-lg font-semibold text-gray-900">{user?.displayName}</h2>
                    <p className="text-sm text-gray-500">{user?.email}</p>
                </div>
            </div>

            <div className="my-2">
                <Divider />
            </div>

            {/* Navigation Links */}
            <div className="mt-6">
                {profileLinks.map((link, index) => {
                    const IconComponent = link.icon;
                    return (
                        <motion.a
                            key={index}
                            href={link.route}
                            whileHover={{ scale: 1.05 }}
                            transition={{ type: "spring", stiffness: 300 }}
                            className={`flex items-center gap-3 p-3 rounded-lg text-gray-700 transition ${link.danger ? "text-red-600 hover:bg-red-100" : "hover:bg-gray-100"
                                }`}
                        >
                            <span className="text-lg"><IconComponent /></span>
                            <span className="text-sm font-medium">{link.name}</span>
                        </motion.a>
                    )
                })}
            </div>
        </motion.div>
    );
};

export default ProfileRoutes;

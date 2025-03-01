import { Divider } from "@mui/material";
import Link from "next/link";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { routes } from "../site/site.config";
import MyInput from "../common/MyInput";
import toast from "react-hot-toast";

const PhoneNavDrawer = () => {
    const [searchPrompt, setSearchPrompt] = useState("");
    const router = useRouter();

    // Handle search on Enter key
    const handleSearchKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter" && searchPrompt.trim() !== "") {
            toast.loading('Searching: '+ searchPrompt)
            router.push(`/query?q=${encodeURIComponent(searchPrompt)}`);
        }
    };

    return (
        <div className="p-2">
            {/* Logo */}
            <Link href={"/"} className="flex items-center gap-2 group my-2">
                <img
                    src="/asset/logo.png"
                    alt="Logo"
                    className="h-14 w-14 object-cover group-hover:animate-spin"
                />
                <h1 className="font-bold text-2xl hover:cursor-pointer hover:text-blue-900">
                    ENews
                </h1>
            </Link>

            <Divider />

            {/* Navigation Links */}
            <div className="flex flex-col gap-4 my-4 ml-5">
                {routes.map((route, index) => (
                    <Link
                        href={route.url}
                        key={index}
                        className="hover:cursor-pointer hover:text-blue-900"
                    >
                        {route.name}
                    </Link>
                ))}
            </div>

            <Divider />

            {/* Search Input */}
            <div className="p-2">
                <MyInput
                    name="search"
                    placeholder="Search..."
                    type="text"
                    className="p-2 rounded my-4 w-[98%]"
                    value={searchPrompt}
                    onChange={(e) => setSearchPrompt(e.target.value)}
                    onKeyDown={handleSearchKeyPress} // Handle Enter key event
                />
            </div>
        </div>
    );
};

export default PhoneNavDrawer;

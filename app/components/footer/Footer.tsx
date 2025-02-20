'use client'

import React, { useState } from "react";
import Link from "next/link";
import { categorys } from "@/app/site/site.config";
import LargeContainer from "@/app/common/LargeContainer";

const Footer = () => {
    const [email, setEmail] = useState("");

    const handleSubscribe = (e: React.FormEvent) => {
        e.preventDefault();
        // Handle subscription logic here
        console.log("Subscribed with:", email);
        setEmail(""); // Clear input after subscription
    };

    return (
        <footer className="bg-gray-900 text-gray-300 py-10 mt-10">
            <LargeContainer>
                <div className="mx-auto px-5 lg:px-10">
                    {/* Categories Section */}
                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 border-b border-gray-700 pb-8">
                        {categorys.map((category) => (
                            <Link
                                key={category}
                                href={`/query?q=${category.toLowerCase()}`}
                                className="text-sm hover:text-red-500"
                            >
                                {category}
                            </Link>
                        ))}
                    </div>

                    {/* Subscribe Section */}
                    <div className="mt-6 flex flex-col md:flex-row items-center justify-between">
                        <div>
                            <h2 className="text-xl font-semibold text-white">Subscribe to our Newsletter</h2>
                            <p className="text-sm mt-1">Stay updated with the latest news delivered to your inbox.</p>
                        </div>
                        <form
                            onSubmit={handleSubscribe}
                            className="mt-4 md:mt-0 flex items-center border border-gray-600 rounded-lg overflow-hidden"
                        >
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Enter your email"
                                required
                                className="px-4 py-2 w-64 bg-gray-800 text-white focus:outline-none"
                            />
                            <button
                                type="submit"
                                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 font-semibold"
                            >
                                Subscribe
                            </button>
                        </form>
                    </div>

                    {/* Bottom Section */}
                    <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-500 mt-6">
                        <p>&copy; {new Date().getFullYear()} NewsDaily. All rights reserved.</p>
                        <p>
                            Made with ❤️ by <a href="https://github.com/dhruvrsoni04" className="hover:text-red-500">Dhruv Soni</a>
                        </p>
                    </div>
                </div>
            </LargeContainer>
        </footer>
    );
};

export default Footer;

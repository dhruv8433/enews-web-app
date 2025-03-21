"use client";

import React, { useState } from "react";
import Marquee from "react-fast-marquee";
import { categorys } from "../site/site.config";
import Link from "next/link";

const ListCategoryContainer: React.FC = () => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div
            className="my-5 overflow-hidden relative"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* Marquee Component */}
            <Marquee
                speed={isHovered ? 0 : 50}
                gradient={false}
                className="flex space-x-8"
            >
                {categorys.map((response) => (
                    <Link key={response} href={`/query?${response.toLowerCase()}`}>
                        <h1
                            onMouseEnter={(e) => {
                                e.currentTarget.style.backgroundColor = "var(--primary)";
                                e.currentTarget.style.color = "var(--text)";
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.backgroundColor = "transparent"; // Reset background
                                e.currentTarget.style.color = `var(--primarytext)`; // Reset text color
                            }}
                            className="border border-black rounded mx-3 px-2 py-1 cursor-pointer hover:font-semibold"
                            style={{color: `var(--primarytext)`}}
                        >
                            {response}
                        </h1>
                    </Link>

                ))}
            </Marquee>
        </div>
    );
};

export default ListCategoryContainer;

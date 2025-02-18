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
                        <h1 className="border border-black rounded mx-3 px-2 py-1 hover:bg-red-600 hover:text-white cursor-pointer hover:font-semibold">
                            {response}
                        </h1>
                    </Link>
                ))}
            </Marquee>
        </div>
    );
};

export default ListCategoryContainer;

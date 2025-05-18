'use client'

import React from 'react'
import Link from 'next/link'

const GlobalAdvertise: React.FC = () => {
    // Format the current date in "DD/MM/YYYY" format
    const formattedDate = new Date().toLocaleDateString("en-GB");

    return (
        <div className="bg-[url('/asset/header.png')] bg-cover bg-center bg-no-repeat h-14 w-full flex items-center px-10">
            <div className="flex h-full items-center justify-between w-full container">

                {/* Left Section: Displays a lightning icon, trending link, and tagline */}
                <div className="left flex items-center text-white">
                    {/* <Bolt /> Lightning Icon */}
                    <Link href={`/query/trending`} className="underline px-1">
                        Trending
                    </Link>
                    <h1>News of the whole world</h1>
                </div>

                {/* Right Section: Displays social media icons and the current date */}
                <div className="flex items-center gap-4 text-white">

                    {/* Social Icons Section */}
                    {/* <div className="flex gap-3">
                        {navIcons.map((icon, index) => {
                            const IconComponent = icon.icon;
                            return (
                                <Link href={icon.url} key={icon.url} aria-label={icon.name}>
                                    <IconComponent key={index} />
                                </Link>
                            );
                        })}
                    </div> */}

                    {/* Date Section with Calendar Icon */}
                    <div className="flex items-center gap-2 border p-1 rounded bg-blue-900">
                        {/* <CalendarToday fontSize="small" /> */}
                        <span>{formattedDate}</span>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default GlobalAdvertise;

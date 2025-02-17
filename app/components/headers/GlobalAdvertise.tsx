/**
 * @file GlobalAdvertise.tsx
 * @description This component renders a global advertisement banner with social media icons 
 *              and the current date, designed to enhance the header experience.
 * @date 17 Feb 2025
 * @author Dhruv Soni
 */

'use client'

import React from 'react'
import LargeContainer from '@/app/common/LargeContainer'
import { Box } from '@mui/material'
import { Bolt, CalendarToday } from '@mui/icons-material'
import Link from 'next/link'
import { navIcons } from '@/app/site/site.config'

const GlobalAdvertise: React.FC = () => {
    // Format the current date in "DD/MM/YYYY" format
    const formattedDate = new Date().toLocaleDateString("en-GB");

    return (
        <div className="bg-[url('/asset/header.png')] bg-cover bg-center bg-no-repeat h-14 w-full flex items-center">
            <LargeContainer>
                <Box justifyContent={{ xs: "center", md: "space-between" }} className="flex h-full items-center">
                    
                    {/* Left Section: Displays a lightning icon, trending link, and tagline */}
                    <div className="left flex items-center text-white">
                        <Bolt /> {/* Lightning Icon */}
                        <Link href={`/query/trending`} className="underline px-1">
                            Trending
                        </Link>
                        <h1>News of the whole world</h1>
                    </div>

                    {/* Right Section: Displays social media icons and the current date */}
                    <Box display={{ xs: "none", md: "flex" }} className="flex items-center gap-4 text-white">
                        
                        {/* Social Icons Section */}
                        <div className="flex gap-3">
                            {navIcons.map((icon, index) => {
                                const IconComponent = icon.icon;
                                return (
                                    <Link href={icon.url} key={icon.url} aria-label={icon.name}>
                                        <IconComponent key={index} />
                                    </Link>
                                );
                            })}
                        </div>

                        {/* Date Section with Calendar Icon */}
                        <div className="flex items-center gap-2 border p-1 rounded bg-blue-900">
                            <CalendarToday fontSize="small" />
                            <span>{formattedDate}</span>
                        </div>

                    </Box>
                </Box>
            </LargeContainer>
        </div>
    );
}

export default GlobalAdvertise;

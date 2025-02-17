'use client'

import React from 'react'
import LargeContainer from '@/app/common/LargeContainer'
import { Box } from '@mui/material'
import { Bolt, CalendarToday } from '@mui/icons-material'
import Link from 'next/link'
import { navIcons } from '@/app/site/site.config'

function GlobalAdvertise() {
    const formattedDate = new Date().toLocaleDateString("en-GB"); // "DD/MM/YYYY" format

    return (
        <div className="bg-[url('/asset/header.png')] bg-cover bg-center bg-no-repeat h-14 w-full flex items-center"
        >
            <LargeContainer>
                <Box justifyContent={{ xs: "center", md: "space-between" }} className="flex h-full items-center">
                    {/* Left Section */}
                    <div className="left flex items-center text-white">
                        <Bolt />
                        <Link href={`/query/trending`} className="underline px-1">Trending</Link>
                        <h1>News of the whole world</h1>
                    </div>

                    {/* Right Section */}
                    <Box display={{ xs: "none", md: "flex" }} className="flex items-center gap-4 text-white">
                        {/* Social Icons */}
                        <div className="flex gap-3">
                            {navIcons.map((icon, index) => (
                                <Link href={icon.url} key={icon.url}>
                                    <icon.icon key={index} />
                                </Link>
                            ))}
                        </div>

                        {/* Date with Calendar Icon */}
                        <div className="flex items-center gap-2 border p-1 rounded bg-blue-900">
                            <CalendarToday fontSize="small" />
                            <span>{formattedDate}</span>
                        </div>
                    </Box>
                </Box>
            </LargeContainer>
        </div>
    )
}

export default GlobalAdvertise
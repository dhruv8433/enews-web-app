/**
 * @file Navbar.tsx
 */

'use client'

import Link from 'next/link'
import React, { useState } from 'react'
import { Menu } from '@mui/icons-material'
import MyInput from '@/app/common/MyInput'
import MyButtons from '@/app/common/MyButtons'
import { routes } from '@/app/site/site.config'
import { Box, Drawer, IconButton } from '@mui/material'
import LargeContainer from '@/app/common/LargeContainer'
import PhoneNavDrawer from '@/app/overlays/PhoneNavDrawer'

const Navbar: React.FC = () => {
    const [openDrawer, setOpenDrawer] = useState(false);
    return (
        <div className='bg-white py-4'>
            <LargeContainer>
                <div className="flex justify-between items-center">
                    <div className='flex items-center'>
                        {/* Menu icon for responsive screen */}
                        <Box display={{ xs: "block", md: "none" }}>
                            <IconButton onClick={() => setOpenDrawer(true)}> {/* Open drawer when we click on icon */}
                                <Menu />
                            </IconButton>
                        </Box>

                        {/* logo and title */}
                        <Link href={'/'} className="flex items-center gap-2 group">
                            <img src="/asset/logo.png" alt="" className='h-14 w-14 items-center object-cover group-hover:animate-spin' />
                            <h1 className='font-bold text-2xl hover:cursor-pointer hover:text-blue-700'>ENews</h1>
                        </Link>
                    </div>

                    {/* navigation */}
                    <Box display={{ xs: "none", md: "flex" }} className="routes gap-5">
                        {routes.map((route, index) => (<Link href={route.url} key={index} className='hover:cursor-pointer hover:text-blue-700'>{route.name}</Link>))}
                    </Box>

                    <div className="buttons flex gap-2">
                        <Box display={{ xs: "none", md: "flex" }}>
                            <MyInput name='search' placeholder='Search...' type='text' className='p-2 rounded' />
                        </Box>
                        <MyButtons title='Login' onClick={() => console.log('login')} className='p-2 rounded' />
                    </div>

                </div>
            </LargeContainer>
            {/* Drawer section that open while menu icon clicked */}
            <Drawer open={openDrawer} onClose={() => setOpenDrawer(false)}>
                <div className="phone-drawer w-52">
                    <PhoneNavDrawer />
                </div>
            </Drawer>
        </div>
    )
}

export default Navbar
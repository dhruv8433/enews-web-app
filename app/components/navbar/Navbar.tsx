'use client'

import Link from 'next/link'
import toast from 'react-hot-toast'
import React, { useState } from 'react'
import { Menu } from '@mui/icons-material'
import MyInput from '@/app/common/MyInput'
import { useRouter } from 'next/navigation'
import MyButtons from '@/app/common/MyButtons'
import { routes } from '@/app/site/site.config'
import { Backdrop, Box, Drawer, IconButton } from '@mui/material'
import LargeContainer from '@/app/common/LargeContainer'
import PhoneNavDrawer from '@/app/overlays/PhoneNavDrawer'
import { signInWithGoogle } from '@/app/service/Auth.google'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '@/app/site/firebase.config'
import SignupModal from '@/app/overlays/SignupModal'
import LoginModal from '@/app/overlays/LoginModal'

const Navbar: React.FC = () => {
    const [openDrawer, setOpenDrawer] = useState(false);
    const [userInfo] = useAuthState(auth);
    const [searchPrompt, setSearchPrompt] = useState('');
    const [openModal, setOpenModal] = useState(false);
    const [openLoginModal, setOpenLoginModal] = useState(false);
    const router = useRouter(); // Initialize router   

    // Handle search on Enter key
    const handleSearchKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && searchPrompt.trim() !== '') {
            router.push(`/query?q=${encodeURIComponent(searchPrompt)}`);
        }
    };

    return (
        <div className='bg-white py-4'>
            <LargeContainer>
                <div className="flex justify-between items-center">
                    <div className='flex items-center'>
                        {/* Menu icon for responsive screen */}
                        <Box display={{ xs: "block", md: "none" }}>
                            <IconButton onClick={() => setOpenDrawer(true)}>
                                <Menu />
                            </IconButton>
                        </Box>

                        {/* Logo and title */}
                        <Link href={'/'} className="flex items-center gap-2 group">
                            <img src="/asset/logo.png" alt="Logo" className='h-14 w-14 object-cover group-hover:animate-spin' />
                            <h1 className='font-bold text-2xl hover:cursor-pointer hover:text-blue-700'>ENews</h1>
                        </Link>
                    </div>

                    {/* Navigation */}
                    <Box display={{ xs: "none", md: "flex" }} className="routes gap-5">
                        {routes.map((route, index) => (
                            <Link href={route.url} key={index} className='hover:cursor-pointer hover:text-blue-700'>{route.name}</Link>
                        ))}
                    </Box>

                    {/* User Section */}
                    <div className="buttons flex gap-2 items-center">
                        <Box display={{ xs: "none", md: "flex" }}>
                            <MyInput name='search' placeholder='Search...' type='text' className='p-2 rounded' value={searchPrompt} onChange={(e) => setSearchPrompt(e.target.value)} onKeyDown={handleSearchKeyPress} />
                        </Box>

                        {userInfo ? (
                            <Link href={`/profile/favorites`} className='flex items-center gap-2'>
                                <img src={userInfo?.photoURL || ''} alt="User" className='h-10 w-10 rounded-full' />
                                <h3 className='font-medium'>{userInfo.displayName}</h3>
                            </Link>
                        ) : (
                            <MyButtons title='Sign in' onClick={() => setOpenModal(true)} className='p-2 rounded' />
                        )}
                    </div>
                </div>
                <Backdrop open={openModal} className='z-20'>
                    <SignupModal onClose={() => setOpenModal(false)} setLoginModal={setOpenLoginModal} />
                </Backdrop>

                <Backdrop open={openLoginModal} className='z-20'>
                    <LoginModal onClose={() => setOpenLoginModal(false)} setSignupModel={setOpenModal} />
                </Backdrop>


            </LargeContainer>

            {/* Drawer section */}
            <Drawer open={openDrawer} onClose={() => setOpenDrawer(false)}>
                <div className="phone-drawer w-52">
                    <PhoneNavDrawer />
                </div>
            </Drawer>
        </div>
    )
}

export default Navbar;

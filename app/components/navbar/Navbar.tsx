'use client'

import Link from 'next/link'
import toast from 'react-hot-toast'
import React, { Suspense, useEffect, useState } from 'react'
import { Menu } from '@mui/icons-material'
import MyInput from '@/app/common/MyInput'
import { useRouter, useSearchParams } from 'next/navigation'
import MyButtons from '@/app/common/MyButtons'
import { routes } from '@/app/site/site.config'
import { Backdrop, Box, Drawer, IconButton } from '@mui/material'
import LargeContainer from '@/app/common/LargeContainer'
import PhoneNavDrawer from '@/app/overlays/PhoneNavDrawer'
import SignupModal from '@/app/overlays/SignupModal'
import LoginModal from '@/app/overlays/LoginModal'
import ThemeManager from '@/app/util/ThemeProvideWrapper'
import MyDiv from '@/app/common/MyDiv'
import { FormDataType } from '@/app/types/formData.types'
import useSettings from '@/app/hooks/useSettigs'
import { WebSettings } from '@/app/types/setting.types'

const Navbar: React.FC = () => {
    const { settings, loading } = useSettings();
    
    !loading && console.log("Settings in Navbar:", settings);


    const [openDrawer, setOpenDrawer] = useState(false);
    const [userInfo, setUserInfo] = useState<FormDataType>({
        name: "",
        email: "",
        password: "",
        phone_no: "",
        avatar: undefined,
    });

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUserInfo(JSON.parse(storedUser));
        }
    }, []);

    const [searchPrompt, setSearchPrompt] = useState('');
    const [openModal, setOpenModal] = useState(false);
    const [openLoginModal, setOpenLoginModal] = useState(false);
    const router = useRouter(); // Initialize router   

    const searchParams = useSearchParams();
    const q = searchParams.get('q') || ''; // Get "q" from query string


    // Handle search on Enter key
    const handleSearchKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter" && searchPrompt.trim() !== "") {
            toast.loading('Searching: ' + searchPrompt)
            router.push(`/query?q=${encodeURIComponent(searchPrompt)}`);
        }
    };

    return (
        <MyDiv isPrimary className='py-4'>
            <LargeContainer>
                <div className="flex justify-between items-center">
                    <div className='flex items-center'>
                        {/* Menu icon for responsive screen */}
                        <Box display={{ xs: "block", md: "none" }}>
                            <IconButton aria-label="burger-menu" onClick={() => setOpenDrawer(true)}>
                                <Menu />
                            </IconButton>
                        </Box>

                        {/* Logo and title */}
                        <Link href={'/'} className="flex items-center gap-2 group">
                            <img src={settings ? settings?.headerLogo :"/asset/logo.png"} alt="Logo" className='w-32 object-cover group-hover:animate-spin' />
                        </Link>
                    </div>

                    {/* Navigation */}
                    <Box display={{ xs: "none", md: "flex" }} className="routes gap-5">
                        {routes.map((route, index) => (
                            <Link href={route.url} key={index} className={`hover:cursor-pointer flex items-center ${(q == route.name.toLowerCase()) && "text-white bg-blue-700 py-1 px-2 rounded"}`}>{route.name}</Link>
                        ))}
                    </Box>

                    {/* User Section */}
                    <div className="buttons flex gap-2 items-center">
                        <Box display={{ xs: "none", md: "flex" }}>
                            <MyInput name='search' placeholder='Search...' type='text' className='p-2 rounded' value={searchPrompt} onChange={(e) => setSearchPrompt(e?.target.value)} onKeyDown={handleSearchKeyPress} />
                        </Box>

                        {userInfo ? (
                            <Link href={`/profile/favorites`} className='flex items-center gap-2'>
                                <img src={userInfo?.avatar_url || 'https://cdn3.iconfinder.com/data/icons/web-design-and-development-2-6/512/87-1024.png'} alt="User" className='h-10 w-10 rounded-full border-2' />
                                <Box display={{ xs: "none", md: "flex" }}>
                                    <h3 className='font-medium'>{userInfo?.fullName}</h3>
                                </Box>
                            </Link>
                        ) : (
                            <MyButtons title='Sign in' onClick={() => setOpenModal(true)} className='p-2 rounded' />
                        )}

                        {/* theme button */}
                        <ThemeManager settings={settings as WebSettings}/>

                    </div>
                </div>
                <Backdrop open={openModal} className='z-20'>
                    <SignupModal onClose={() => setOpenModal(false)} setLoginModal={setOpenLoginModal} setSignupModal={setOpenModal} />
                </Backdrop>

                <Backdrop open={openLoginModal} className='z-20'>
                    <LoginModal onClose={() => setOpenLoginModal(false)} setSignupModel={setOpenModal} setLoginModel={setOpenLoginModal} />
                </Backdrop>


            </LargeContainer>

            {/* Drawer section */}
            <Drawer open={openDrawer} onClose={() => setOpenDrawer(false)}>
                <div className="phone-drawer w-52">
                    <PhoneNavDrawer />
                </div>
            </Drawer>
        </MyDiv>
    )
}


const Page = () => (
    <>
        <Suspense fallback={<h1>Loading query...</h1>}>
            <Navbar />
        </Suspense>
    </>
);

export default Page;

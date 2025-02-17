/**
 * @file Navbar.tsx
 */

'use client'

import LargeContainer from '@/app/common/LargeContainer'
import MyButtons from '@/app/common/MyButtons'
import MyInput from '@/app/common/MyInput'
import { routes } from '@/app/site/site.config'
import Link from 'next/link'
import React from 'react'

const Navbar: React.FC = () => {
    return (
        <div className='bg-white py-4'>
            <LargeContainer>
                <div className="flex justify-between items-center">
                    {/* logo and title */}
                    <Link href={'/'} className="flex items-center gap-2 group">
                        <img src="/asset/logo.png" alt="" className='h-14 w-14 items-center object-cover group-hover:animate-spin' />
                        <h1 className='font-bold text-2xl hover:cursor-pointer hover:text-blue-700'>ENews</h1>
                    </Link>

                    {/* navigation */}
                    <div className="routes flex gap-5">
                        {routes.map((route, index) => (<Link href={route.url} key={index} className='hover:cursor-pointer hover:text-blue-700'>{route.name}</Link>))}
                    </div>

                    <div className="buttons flex gap-2">
                        <MyInput name='search' placeholder='Search...' type='text' className='p-2 rounded' />
                        <MyButtons title='Login' onClick={() => console.log('login')} className='p-2 rounded' />
                    </div>

                </div>
            </LargeContainer>
        </div>
    )
}

export default Navbar
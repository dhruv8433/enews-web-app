import { Divider } from '@mui/material'
import Link from 'next/link'
import React from 'react'
import { routes } from '../site/site.config'
import MyInput from '../common/MyInput'

const PhoneNavDrawer = () => {
    return (
        <div className='p-2'>

            <Link href={'/'} className="flex items-center gap-2 group my-2">
                <img src="/asset/logo.png" alt="" className='h-14 w-14 items-center object-cover group-hover:animate-spin' />
                <h1 className='font-bold text-2xl hover:cursor-pointer hover:text-blue-700'>ENews</h1>
            </Link>

            <Divider />

            <div className="flex flex-col gap-4 my-4 ml-5">
                {routes.map((route, index) => (
                    <Link href={route.url} key={index} className='hover:cursor-pointer hover:text-blue-700'>
                        {route.name}
                    </Link>
                ))}
            </div>

            <Divider />

            <div className="p-2">
                <MyInput name='search' placeholder='Search...' type='text' className='p-2 rounded my-4 w-[98%]' />
            </div>


        </div>
    )
}

export default PhoneNavDrawer
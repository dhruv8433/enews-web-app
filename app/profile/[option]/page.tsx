'use client'

import LargeContainer from '@/app/common/LargeContainer';
import ProfileRoutes from '@/app/common/ProfileRoutes';
import UserFavs from '@/app/components/profile/UserFavs';
import UserReadLater from '@/app/components/profile/UserReadLater';
import { Grid } from '@mui/material';
import { useParams } from 'next/navigation'
import React from 'react'
import ConditionRender from './ConditionRender';

const page = () => {
    //  useParams() in Next.js 13+ (App Router) returns an object where values can be either a string or an array of strings (depending on dynamic segments).
    const { option } = useParams() as {option?: string};
    console.log(option)
    
    return (
        <LargeContainer>
            <div className="my-20">
                <Grid container spacing={3}>
                    <Grid item xs={12} md={4}>
                        <ProfileRoutes />
                    </Grid>
                    <Grid item xs={12} md={8}>
                        <ConditionRender option={option || ''} />
                    </Grid>
                </Grid>
            </div>
        </LargeContainer>
    )
}

export default page
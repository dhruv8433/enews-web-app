'use client'

import React from 'react'
import LargeContainer from '../common/LargeContainer'
import { Grid } from '@mui/material'
import ProfileRoutes from '../common/ProfileRoutes'
import UserFavs from '../components/profile/UserFavs'

const page = () => {
    return (
        <LargeContainer>
            <div className="my-20">
                <Grid container spacing={3}>
                    <Grid item xs={12} md={4}>
                        <ProfileRoutes />
                    </Grid>
                    <Grid item xs={12} md={8}>
                        <UserFavs />
                    </Grid>
                </Grid>
            </div>
        </LargeContainer>
    )
}

export default page
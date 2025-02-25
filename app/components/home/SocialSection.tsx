'use client'

import ErrorComponent from '@/app/common/ErrorComponent'
import LongCard from '@/app/common/LongCard'
import MyHeading from '@/app/common/MyHeading'
import { LongCardSkeleton } from '@/app/common/Skeleton.Site'
import useHeadlines from '@/app/hooks/useHeadlines'
import { Grid } from '@mui/material'
import React from 'react'

const SocialSection = () => {
    const { error, headlines, loading } = useHeadlines("social");

    // error than render
    if (error) return <ErrorComponent error={error} />;
    
    return (
        <div>
            <div className='my-4'>
                {/* heading */}
                <MyHeading title='Social' />

                <Grid container spacing={2}>
                    {
                        loading ? Array.from({ length: 8 }).map((_, index) => <Grid key={index} xs={12} md={3}>
                            <LongCardSkeleton />
                        </Grid>) : headlines.slice(0, 8).map((headline) => (
                            <Grid key={headline._id} item xs={12} sm={6} md={3}>
                                <LongCard headline={headline} />
                            </Grid>
                        ))
                    }
                </Grid>
            </div>
        </div>
    )
}

export default SocialSection
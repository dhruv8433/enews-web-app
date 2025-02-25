'use client'

import React from 'react'
import { Grid } from '@mui/material'
import LongCard from '@/app/common/LongCard';
import useHeadlines from '@/app/hooks/useHeadlines'
import ErrorComponent from '@/app/common/ErrorComponent';
import { LongCardSkeleton } from '@/app/common/Skeleton.Site';
import MyHeading from '@/app/common/MyHeading';

const EducationSection = () => {
    const { error, headlines, loading } = useHeadlines("education");

    // error than render
    if (error) return <ErrorComponent error={error} />;

    return (
        <div className='my-4'>
            {/* heading */}
            <MyHeading title='Education' />

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
    )
}

export default EducationSection
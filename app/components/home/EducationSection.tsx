'use client'

import React from 'react'
import { Grid } from '@mui/material'
import LongCard from '@/app/common/LongCard';
import useHeadlines from '@/app/hooks/useHeadlines'

const EducationSection = () => {
    const { error, headlines, loading } = useHeadlines("education");
    return (
        <div className='my-4'>
            {/* heading */}
            <div className="custom-heading">
                <div className="p-[5px] bg-blue-700  w-40 flex justify-center text-white">
                    Education
                </div>
            </div>

            <Grid container spacing={2}>
                {
                    loading ? <h1>loading...</h1> : error ? <h1>Error in getting data : {error}</h1> : headlines.slice(0, 8).map((headline) => (
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
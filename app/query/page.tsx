'use client'

import useHeadlines from '@/app/hooks/useHeadlines';
import { Grid } from '@mui/material';
import { useSearchParams } from 'next/navigation';
import React from 'react';
import LongCard from '../common/LongCard';
import LargeContainer from '../common/LargeContainer';

const page = () => {
    const searchParams = useSearchParams();
    const q = searchParams.get('q'); // Get "q" from query string
    console.log("q" + q)
    const { error, headlines, loading } = useHeadlines(q || '');

    return (
        <LargeContainer>
            {/* dynamic heading based on query */}
            <div className="custom-heading">
                <div className="p-[5px] bg-blue-700  w-40 flex justify-center text-white">
                    {q?.toLocaleUpperCase()}
                </div>
            </div>

            {/* cards based on query */}
            <Grid container spacing={2}>
                {
                    loading ? <h1>loading...</h1> : error ? <h1>error : {error}</h1> : headlines.map((headline) => (
                        <Grid item xs={12} sm={6} md={3}>
                            <LongCard headline={headline} />
                        </Grid>
                    ))
                }
            </Grid>
        </LargeContainer>
    );
};

export default page;

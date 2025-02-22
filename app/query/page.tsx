"use client";

import useHeadlines from '@/app/hooks/useHeadlines';
import { Grid } from '@mui/material';
import { useSearchParams } from 'next/navigation';
import React, { Suspense } from 'react';
import LongCard from '../common/LongCard';
import LargeContainer from '../common/LargeContainer';
import { siteName } from '../site/site.config';

const QueryContent = () => {
    const searchParams = useSearchParams();
    const q = searchParams.get('q') || ''; // Get "q" from query string
    console.log("q:", q);
    
    const { error, headlines, loading } = useHeadlines(q);
    document.title = `${siteName} | ${q}`;

    return (
        <>
            {/* Dynamic heading based on query */}
            <div className="custom-heading">
                <div className="p-[5px] bg-blue-700 w-40 flex justify-center text-white">
                    {q.toLocaleUpperCase()}
                </div>
            </div>

            {/* Cards based on query */}
            <Grid container spacing={2}>
                {loading ? (
                    <h1>Loading...</h1>
                ) : error ? (
                    <h1>Error: {error}</h1>
                ) : (
                    headlines.map((headline, index) => (
                        <Grid item xs={12} sm={6} md={3} key={index}>
                            <LongCard headline={headline} />
                        </Grid>
                    ))
                )}
            </Grid>
        </>
    );
};

const Page = () => (
    <LargeContainer>
        <Suspense fallback={<h1>Loading query...</h1>}>
            <QueryContent />
        </Suspense>
    </LargeContainer>
);

export default Page;

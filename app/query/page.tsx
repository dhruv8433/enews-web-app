"use client";

import useHeadlines from '@/app/hooks/useHeadlines';
import { Grid } from '@mui/material';
import { useSearchParams } from 'next/navigation';
import React, { Suspense } from 'react';
import LongCard from '../common/LongCard';
import LargeContainer from '../common/LargeContainer';
import { siteName } from '../site/site.config';
import { LongCardSkeleton } from '../common/Skeleton.Site';
import ErrorComponent from '../common/ErrorComponent';
import MyHeading from '../common/MyHeading';

const QueryContent = () => {
    const searchParams = useSearchParams();
    const q = searchParams.get('q') || ''; // Get "q" from query string
    console.log("q:", q);

    const { error, headlines, loading } = useHeadlines(q);
    document.title = `${siteName} | ${q}`;

    if (error) return <ErrorComponent error={error} />;

    return (
        <>
            {/* Dynamic heading based on query */}
            <MyHeading title={q.toLocaleUpperCase()} />

            {/* Cards based on query */}
            <Grid container spacing={2}>
                {loading ? Array.from({ length: 8 }).map((_, index) => <Grid key={index} xs={12} sm={6} md={3}>
                    <LongCardSkeleton />
                </Grid>) : (
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

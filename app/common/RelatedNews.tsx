import React, { useEffect, useState } from 'react';
import useHeadlines from '../hooks/useHeadlines';
import SmallCard from './SmallCard';
import ErrorComponent from './ErrorComponent';
import { SmallCardSkeleton } from './Skeleton.Site';
import MyHeading from './MyHeading';
import useSharedArticle from '../hooks/useSharedArticle';
import { Grid } from '@mui/material';

const RelatedNews = ({ slug }: { slug: string }) => {
    const [isClient, setIsClient] = useState(false);
    const { article, loading: articleLoading, error: customError } = useSharedArticle(slug);

    const { error, headlines, loading } = useHeadlines(article?.section_name || '');

    useEffect(() => {
        setIsClient(true);
    }, []);

    if (!isClient) return null; // Early return to handle client-side rendering

    if (!article) return <p className="text-center text-gray-500">No article found.</p>;

    const smallCardSkeletons = loading ?
        Array.from({ length: 3 }).map((_, index) => (<SmallCardSkeleton key={index} />))
        : null;

    // any error occure than 
    if (error) return <ErrorComponent error={error} />;

    return (
        <div className='mt-10'>
            <MyHeading title='Related News' />

            {smallCardSkeletons}

            {articleLoading ? <h1>Loading...</h1> : <Grid spacing={3} container className="mt-14">
                {headlines.length > 0 && headlines.slice(0, 5).map((article, index) => (
                    <Grid item xs={12} sm={6} md={12} className="my-4" key={index} >
                        <SmallCard headline={article} />
                    </Grid>
                ))}
            </Grid>}
        </div>
    );
};

export default RelatedNews;

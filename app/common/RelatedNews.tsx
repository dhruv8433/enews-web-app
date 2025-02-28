import React, { useEffect, useState } from 'react';
import useHeadlines from '../hooks/useHeadlines';
import SmallCard from './SmallCard';
import ErrorComponent from './ErrorComponent';
import { SmallCardSkeleton } from './Skeleton.Site';
import MyHeading from './MyHeading';
import useSharedArticle from '../hooks/useSharedArticle';

const RelatedNews = ({slug}: {slug: string}) => {
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

            <div className="mt-14">
                {headlines.length > 0 && headlines.slice(0, 5).map((article, index) => (
                    <div className="my-4" key={index} >
                        <SmallCard headline={article} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default RelatedNews;

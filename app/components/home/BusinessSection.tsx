'use client'

import ErrorComponent from '@/app/common/ErrorComponent';
import HorizontalCard from '@/app/common/HorizontalCard';
import MyHeading from '@/app/common/MyHeading';
import { HorizontalCardSkeleton } from '@/app/common/Skeleton.Site';
import useHeadlines from '@/app/hooks/useHeadlines'
import React from 'react'

const BusinessSection = () => {
    const { loading, headlines, error } = useHeadlines("business");

    // if any error occure than render error compoonent
    if (error) return <ErrorComponent error={error} />;

    // if loading then render skeletons
    const skeletonContainer = loading ? (
        Array.from({ length: 3 }).map((_, index) =>
            <div className="my-2" key={index}>
                <HorizontalCardSkeleton isProfilePage={false} />
            </div>
        )
    ) : null;

    return (
        <div>
            {/* heading */}
            <MyHeading title="Business" />
            {skeletonContainer}

            {/* cards */}
            {
                !loading && headlines.slice(0, 3).map((headline) => <HorizontalCard key={headline._id} headline={headline} isProfilePage={false} onRemove={() => ""} />)
            }
        </div>
    )
}

export default BusinessSection
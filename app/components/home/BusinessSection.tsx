'use client'

import HorizontalCard from '@/app/common/HorizontalCard';
import useHeadlines from '@/app/hooks/useHeadlines'
import React from 'react'

const BusinessSection = () => {
    const { loading, headlines, error } = useHeadlines("business");

    return (
        <div>
            {/* heading */}
            <div className="custom-heading">
                <div className="p-[5px] bg-blue-700  w-40 flex justify-center text-white">
                    Business
                </div>
            </div>

            {/* cards */}
            {
                loading ? <h1>loading</h1> : error ? <div className="
                bg-red-500 ">Error {error}</div> : headlines.slice(0, 3).map((headline) => <HorizontalCard key={headline._id} headline={headline} />)
            }
        </div>
    )
}

export default BusinessSection
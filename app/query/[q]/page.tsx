'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import VerticalCard from '@/app/common/VerticalCard';
import { useSearchArticles } from '@/app/hooks/useSearchArticles';

const SearchPage = () => {
    const { q } = useParams();
    const { data, loading, error } = useSearchArticles(q as string);

    return (
        <div className="max-w-7xl mx-auto px-4 py-12">
            <h1 className="text-3xl font-bold mb-6 text-heading">Search Results for: "{q}"</h1>

            {loading && <p className="text-gray-500">Loading results...</p>}
            {error && <p className="text-red-500">Failed to fetch articles.</p>}
            {!loading && data?.length === 0 && (
                <p className="text-gray-600">No articles found for "{q}".</p>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {data?.map((article) => (
                    <VerticalCard key={article._id} news={article} isGrid />
                ))}
            </div>
        </div>
    );
};

export default SearchPage;

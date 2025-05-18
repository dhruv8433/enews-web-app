import React from 'react';
import { NewsItem } from '@/app/types/home.types';
import HorizontalCard from '@/app/common/HorizontalCard';
import VerticalCard from '@/app/common/VerticalCard';

interface GridSection3Props {
    breakingNews: NewsItem[];  // Assume first 8
    recentNews: NewsItem[];     // Assume next 4
    title1?: string;
    title2?: string;
}

const GridSection3: React.FC<GridSection3Props> = ({ breakingNews, recentNews, title1, title2
}) => {
    return (
        <section className="px-4 py-10">
            {/* Grid Wrapper */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* Horizontal Cards: span 8 columns on lg, full width on mobile */}
                <div className="lg:col-span-9 space-y-6">
                    {title1 && <h1 className='heading font-extrabold'>{title1}</h1>}
                    {breakingNews.slice(0, 8).map((item) => (
                        <HorizontalCard key={item._id} news={item} />
                    ))}
                </div>

                {/* Vertical Cards: span 4 columns on lg, full width on mobile */}
                <div className="lg:col-span-3 space-y-6">
                    {title2 && <h1 className='heading font-extrabold'>{title2}</h1>}
                    {recentNews.slice(0, 4).map((item) => (
                        <VerticalCard key={item._id} news={item} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default GridSection3;

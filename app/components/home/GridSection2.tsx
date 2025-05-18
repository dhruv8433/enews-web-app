// components/home/GridSection2.tsx
import React from 'react';
import { NewsItem } from '@/app/types/home.types';
import VerticalCard from '@/app/common/VerticalCard';

interface GridSection2Props {
    slides: NewsItem[];
}

const GridSection2: React.FC<GridSection2Props> = ({ slides }) => {
    return (
        <div className='my-2'>
            <h2 className="text-2xl my-4 heading font-extrabold">Technology News</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-items-center">
                {slides.map((news) => (
                    <VerticalCard key={news._id} news={news} />
                ))}
            </div>
        </div>
    );
};

export default GridSection2;

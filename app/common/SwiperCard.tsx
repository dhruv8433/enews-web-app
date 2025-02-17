import React from 'react';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { imageUrl } from '@/app/site/site.config';
import { Headline, HeadlineProps } from '../types/headline.types';



const SwiperCard: React.FC<HeadlineProps> = ({ headline }) => {
    return (
        <div className="relative h-full">
            {/* Image */}
            <img
                src={imageUrl + headline.multimedia[0]?.url}
                alt={headline.headline.main}
                className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
            />

            {/* Content */}
            <div className="absolute top-[58%] left-[5%] p-4">
                <div className="bg-black bg-opacity-60 p-6 rounded-lg max-w-xl">
                    <div className="flex items-center justify-between mb-2">
                        <h1 className="bg-red-500 rounded-md text-white p-1">Trending</h1>
                        <div className="flex items-center gap-2">
                            <CalendarMonthIcon className="text-white" fontSize="small" />
                            <p className="text-white">{new Date(headline.pub_date).toLocaleDateString()}</p>
                        </div>
                    </div>
                    <h3 className="text-white text-3xl font-bold mb-4 truncate-3-lines">
                        {headline.headline.main}
                    </h3>
                    <p className="text-white text-sm mb-4">{headline.abstract}</p>
                </div>
            </div>
        </div>
    );
}

export default SwiperCard;

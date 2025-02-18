/**
 * @file SwiperCard.tsx
 * @description A Swiper-style card component that displays an article with an image background,
 * a category tag, a publication date, and a headline.
 * 
 * @prop {HeadlineProps} headline - The article data containing the headline, publication date, and multimedia.
 * @author: Dhruv Soni
 * @Date: 18/02/2025
 */

import React from 'react';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { imageUrl } from '@/app/site/site.config';
import { HeadlineProps } from '../types/headline.types';
import LikeButton from './LikeButton';

const SwiperCard: React.FC<HeadlineProps> = ({ headline }) => {
    return (
        /** Main container with a relative position for overlay placement */
        <div className="relative h-full">

            {/* toogle action button */}
            <div className="absolute right-1 top-1 bg-white z-10 rounded-full">
                <LikeButton /> {/* Like button for bookmarking articles */}
            </div>
            {/* Background Image Section */}
            <img
                src={imageUrl + headline.multimedia[0]?.url} /** Constructs the image URL dynamically */
                alt={headline.headline.main} /** Provides alternative text for accessibility */
                className="w-full h-full object-cover transition-transform duration-300 hover:scale-105" /** Applies a subtle zoom effect on hover */
            />

            {/* Content Overlay */}
            <div className="absolute bottom-0 left-0 p-4 w-full">
                <div className="bg-black bg-opacity-60 p-6 rounded-lg"> {/* Dark overlay for readability */}

                    {/* Tag & Date Section */}
                    <div className="flex items-center justify-between mb-2">

                        {/* Category Tag */}
                        <h1 className="bg-red-500 rounded-md text-white p-1">
                            Trending {/* Static label indicating article popularity */}
                        </h1>

                        {/* Date with Icon */}
                        <div className="flex items-center gap-2">
                            <CalendarMonthIcon className="text-white" fontSize="small" />
                            <p className="text-white">
                                {new Date(headline.pub_date).toLocaleDateString()} {/* Formats publication date */}
                            </p>
                        </div>
                    </div>

                    {/* Headline Section */}
                    <h3 className="text-white text-3xl font-bold mb-4 truncate-3-lines">
                        {headline.headline.main} {/* Displays the main headline */}
                    </h3>

                    {/* Abstract (Short Summary) */}
                    <p className="text-white text-sm mb-4">
                        {headline.abstract} {/* Provides a brief summary of the article */}
                    </p>
                </div>
            </div>
        </div>
    );
}

export default SwiperCard;

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
import Link from 'next/link';
import slugify from 'slugify';
import { handleShareArticle } from '../service/ShareArticleService';

const SwiperCard: React.FC<HeadlineProps> = ({ headline, isSmallSwiper }) => {
    return (
        //Main container with a relative position for overlay placement
        <div className="relative">
            <div className="absolute right-1 top-1 bg-white z-10 rounded-full">
                <LikeButton article={headline} isProfile={false} />
            </div>

            <Link href={`/detail/${slugify(headline.abstract).toLowerCase()}`}>
                <div className="h-auto" onClick={() => handleShareArticle(headline)}>

                    {/* Image Section */}
                    <img
                        src={imageUrl + headline.multimedia[0]?.url}
                        alt={headline.headline.main}
                        className={`w-full ${isSmallSwiper ? "h-[520px]" : "h-full"} object-fill transition-transform duration-300 hover:scale-105`}
                        onLoad={(e) => (e.currentTarget.style.opacity = '1')}
                        style={{ opacity: 0, transition: 'opacity 0.5s ease-in-out', objectFit: 'cover', minHeight: '100%' }}
                    />

                    {/* Content Overlay */}
                    <div className="absolute bottom-0 left-0 p-4 w-full bg-black bg-opacity-60 backdrop-blur-md">
                        <div className="p-6 rounded-lg min-h-[150px]">
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
            </Link>
        </div>

    );
}

export default SwiperCard;

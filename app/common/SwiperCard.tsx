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
import { Box } from '@mui/material';

const SwiperCard: React.FC<HeadlineProps> = ({ headline, isSmallSwiper }) => {
    return (
        //Main container with a relative position for overlay placement
        <div className="relative">
            <div className="absolute right-3 top-3 bg-white z-10 rounded-full">
                <LikeButton article={headline} isProfile={false} />
            </div>

            <Link href={`/detail/${slugify(headline.abstract).toLowerCase()}`}>
                <div className="h-auto" onClick={() => handleShareArticle(headline)}>

                    {/* Image Section */}
                    <img
                        src={imageUrl + headline.multimedia[0]?.url}
                        alt={headline.headline.main}
                        className={`w-full ${isSmallSwiper ? "h-[520px]" : "h-full"} object-fill transition-transform duration-700 hover:scale-125`}
                    />

                    {/* Content Overlay */}
                    <div className="absolute bottom-0 left-0 p-4 w-full bg-black bg-opacity-60 backdrop-blur-md">
                        <div className="md:p-6 rounded-lg md:min-h-[150px]">
                            <div className="flex items-center justify-between mb-2">
                                <h1 className="bg-red-500 rounded-md text-white p-1">Trending</h1>
                                <div className="flex items-center gap-2">
                                    <CalendarMonthIcon className="text-white" fontSize="small" />
                                    <p className="text-white">{new Date(headline.pub_date).toLocaleDateString()}</p>
                                </div>
                            </div>
                            <h3 className="text-white sm:text-xl md:text-3xl font-bold md:mb-4 truncate-3-lines line-clamp-2">
                                {headline.headline.main.toUpperCase()}
                            </h3>
                            <Box display={{xs: "none", md: "flex"}}>
                                <p className="text-white text-sm mb-4">{headline.abstract}</p>
                            </Box>
                        </div>
                    </div>

                </div>
            </Link>
        </div>

    );
}

export default SwiperCard;

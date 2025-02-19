import React from 'react';
import { HeadlineProps } from '../types/headline.types';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { imageUrl } from '../site/site.config';
import LikeButton from './LikeButton';
import Link from 'next/link';
import slugify from 'slugify';

const SmallCard: React.FC<HeadlineProps> = ({ headline }) => {
    return (
        // this link redirect to detaile/id page of headline and store object as string in localstorage.
        <Link href={`/detail/${slugify(headline.abstract).toLowerCase()}`} onClick={() => localStorage.setItem("article", JSON.stringify(headline))}>
            <div className="group relative shadow-md rounded-lg overflow-hidden transition-all duration-300 hover:shadow-xl">
                {/* Image Container with Title Overlay */}
                <div className="relative w-full h-60 overflow-hidden">

                    {/* toogle action button */}
                    <div className="absolute right-1 top-1 bg-white z-10 rounded-full">
                        <LikeButton /> {/* Like button for bookmarking articles */}
                    </div>

                    <img
                        src={imageUrl + headline.multimedia[0]?.url}
                        alt={headline.headline.main}
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                    />

                    {/* Title with Backdrop */}
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-3">
                        <h3 className="text-white text-lg font-semibold line-clamp-2 transition-all duration-300">
                            {headline.headline.main}
                        </h3>
                    </div>
                </div>


            </div>
        </Link>
    );
};

export default SmallCard;

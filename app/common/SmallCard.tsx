import React from 'react';
import Link from 'next/link';
import slugify from 'slugify';
import LikeButton from './LikeButton';
import { imageUrl } from '../site/site.config';
import { HeadlineProps } from '../types/headline.types';
import { handleShareArticle } from '../service/ShareArticleService';
import MyDiv from './MyDiv';

const SmallCard: React.FC<HeadlineProps> = ({ headline }) => {
    return (
        <MyDiv isSecondary className="group relative shadow-md rounded-xl overflow-hidden transition-all duration-300 hover:shadow-xl">
            {/* toogle action button */}
            <div className="absolute right-1 top-1 z-10 rounded-full">
                <LikeButton article={headline} isProfile={false}/> {/* Like button for bookmarking articles */}
            </div>
            {/* // this link redirect to detaile/id page of headline and store object as string in localstorage. */}
            <Link href={`/detail/${slugify(headline.abstract).toLowerCase()}`}>
                {/* Image Container with Title Overlay */}
                <div className="relative w-full h-60 overflow-hidden" onClick={() => handleShareArticle(headline)}>
                    <img
                        src={imageUrl + headline.multimedia[0]?.url}
                        alt={headline.headline?.main || "No Title"}
                        className="absolute inset-0 w-full h-full object-fill transition-transform duration-300 group-hover:scale-110"
                    />

                    {/* Title with Backdrop */}
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-3">
                        <h3 className="text-white text-lg font-semibold line-clamp-2 transition-all duration-300">
                            {headline.headline.main}
                        </h3>
                    </div>
                </div>
            </Link>
        </MyDiv>
    );
};

export default SmallCard;

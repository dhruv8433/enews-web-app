import React from 'react';
import { Box } from '@mui/material';
import Link from 'next/link';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import slugify from 'slugify';

import LikeButton from './LikeButton';
import { handleShareArticle } from '../service/ShareArticleService';
import { NewsArticle } from '../types/home.types';

type SwiperCardProps = {
  article: NewsArticle;
  isSmallSwiper?: boolean;
};

const SwiperCard: React.FC<SwiperCardProps> = ({ article, isSmallSwiper = false }) => {
  return (
    <div className="relative h-full">
      <div className="absolute right-3 top-3 z-10 like-button">
        <LikeButton article={article} isProfile={false} />
      </div>

      <Link href={`/detail/${slugify(article.slug).toLowerCase()}`} >
          <img
            src={article.image_url}
            alt={article.title}
            className={`w-full ${isSmallSwiper ? 'h-full' : 'h-full'} object-fill transition-transform duration-700 hover:scale-125`}
          />

          <div className="absolute bottom-0 left-0 p-4 w-full bg-black bg-opacity-60 backdrop-blur-md">
            <div className="md:p-4 md:min-h-[150px]">
              <div className="flex items-center justify-between mb-1">
                <h1 className="rounded-md text-white py-1 px-2 card">{article.category.name}</h1>
                {/* Optionally add a date here if you have */}
                <div className="flex items-center gap-2">
                  <CalendarMonthIcon className="text-white" fontSize="small" />
                  {/* You can show a formatted date if available */}
                </div>
              </div>

              <h3 className="text-white sm:text-xl md:text-3xl font-bold md:mb-2 truncate-3-lines line-clamp-2">
                {article.title.toUpperCase()}
              </h3>
              {/* You can add abstract or description if available */}
            </div>
          </div>
      </Link>
    </div>
  );
};

export default SwiperCard;

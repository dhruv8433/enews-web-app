import React from 'react';
import Link from 'next/link';
import slugify from 'slugify';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';

import LikeButton from './LikeButton';
import { handleShareArticle } from '../service/ShareArticleService';
import { NewsArticle } from '../types/home.types';

type SmallCardProps = {
  article: NewsArticle;
};

const SmallCard: React.FC<SmallCardProps> = ({ article }) => {
  return (
    <div className="relative rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300">
      {/* Like button */}
      <div className="absolute right-2 top-2 z-10">
        <LikeButton article={article} isProfile={false} />
      </div>

      {/* Link and image */}
      <Link
        href={`/detail/${slugify(article.slug).toLowerCase()}`}
        onClick={() => handleShareArticle(article)}
      >
        <div className="relative w-full h-48 sm:h-60">
          <img
            src={article.image_url}
            alt={article.title}
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
          />

          {/* Overlay content */}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent p-3">
            <div className="flex justify-between items-center mb-1">
              <span className="body text-xs font-medium px-2 py-1 rounded-md">
                {article.category.name}
              </span>
              <div className="flex items-center gap-1 text-white text-xs">
                <CalendarMonthIcon fontSize="inherit" />
                {/* If you have a date, replace below */}
                <span>{article.published_date || 'Date N/A'}</span>
              </div>
            </div>

            <h3 className="text-white text-sm font-semibold line-clamp-2">
              {article.title}
            </h3>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default SmallCard;

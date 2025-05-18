// components/home/VerticalCard.tsx
import React from 'react';
import { NewsItem } from '@/app/types/home.types';
import Link from 'next/link';
import { useFavorites } from '../hooks/useFavorites';
import { FavoriteButton } from './FavoriteButton';

interface VerticalCardProps {
  news: NewsItem;
  isGrid?: boolean;
}

const VerticalCard: React.FC<VerticalCardProps> = ({ news, isGrid }) => {
  const { favorites, addToFavorites, removeFromFavorites } = useFavorites();

  console.log("favs from swiper", favorites)
  const isFavorited = favorites.some(fav => fav?._id === news._id);

  const toggleFavorite = (articleId: string) => {
    if (isFavorited) {
      removeFromFavorites(articleId);
    } else {
      addToFavorites(articleId);
    }
  };
  return (
    <Link href={`/detail/${news._id}/${news.slug}`} className="group">

      <div className={`h-[350px] relative card rounded-lg shadow-md overflow-hidden flex flex-col ${!isGrid && 'my-4'}`}>
        <FavoriteButton
          articleId={news._id}
          isFavorited={isFavorited}
          onToggleFavorite={toggleFavorite}
        />
        <img src={news.image_url} alt={news.title} className="h-48 w-full object-cover" />
        <div className="p-4 flex flex-col justify-between flex-1">
          <span className="text-sm secondary mb-2 tag">{news.category?.name || news?.category.slug}</span>
          <h2 className="text-lg font-semibold line-clamp-2 turncate">{news.title}</h2>
        </div>
      </div>
    </Link>
  );
};

export default VerticalCard;

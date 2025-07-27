// components/home/GridSection2.tsx
import React from 'react';
import { NewsItem } from '@/app/types/home.types';
import VerticalCard from '@/app/common/VerticalCard';

interface GridSection2Props {
  slides: NewsItem[];
  loading?: boolean;
}

/* ---------- skeleton helpers ---------- */
const SkeletonCard = () => (
  <div className="w-full animate-pulse">
    <div className="aspect-[4/3] w-full rounded-xl bg-gray-200" />
    <div className="mt-3 h-4 w-3/4 rounded bg-gray-200" />
    <div className="mt-2 h-4 w-1/2 rounded bg-gray-200" />
  </div>
);

const GridSection2: React.FC<GridSection2Props> = ({ slides, loading }) => {
  return (
    <div className="my-2">
      <h2 className="heading my-4 text-2xl font-extrabold">Technology News</h2>

      <div className="grid grid-cols-1 justify-items-center gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {loading
          ? Array.from({ length: 8 }).map((_, idx) => <SkeletonCard key={idx} />)
          : slides.map((news) => <VerticalCard key={news._id} news={news} />)}
      </div>
    </div>
  );
};

export default GridSection2;
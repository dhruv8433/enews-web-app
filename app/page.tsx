'use client';

import GridSection1 from "./components/home/GridSection1";
import GridSection2 from "./components/home/GridSection2";
import GridSection3 from "./components/home/GridSection3";
import MarqueeSection from "./components/home/MarqueeSection";
import useHomeScreen from "./hooks/useHomeScreen";
import { Category, NewsItem } from "./types/home.types";

export default function Home() {
  const { error, loading, homeData } = useHomeScreen();

  const popularNews: NewsItem[] = homeData?.popularNews || [];
  const categories: Category[] = homeData?.categories || [];
  const technologyNews: NewsItem[] = homeData?.technology || [];
  const travelNews: NewsItem[] = homeData?.travelNews || [];
  const recentNews: NewsItem[] = homeData?.recentNews || [];
  const breakingNews: NewsItem[] = recentNews.slice(0, 8); // First 8 items for breaking news

  return (
    <main>
      <GridSection1 slides={popularNews} loading={loading}/>
      <MarqueeSection category={categories} />
      <GridSection2 slides={technologyNews.slice(0, 8)} loading={loading}/>
      <GridSection1 slides={travelNews} isTravel />
      <GridSection3 breakingNews={breakingNews} recentNews={recentNews} title1="Breaking News" title2="Recent News" />
      {/* Add more sections as needed */}
    </main>
  );
}

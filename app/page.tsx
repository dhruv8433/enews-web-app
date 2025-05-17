'use client';

import GridSection1 from "./components/home/GridSection1";
import MarqueeSection from "./components/home/MarqueeSection";
import useHomeScreen from "./hooks/useHomeScreen";
import { Category, NewsItem } from "./types/home.types";

export default function Home() {
  const { error, loading, homeData } = useHomeScreen();

  const popularNews: NewsItem[] = homeData?.popularNews || [];
  const categories: Category[] = homeData?.categories || [];

  return (
    <main>
      <GridSection1 slides={popularNews} />
      <MarqueeSection category={categories} />
    </main>
  );
}

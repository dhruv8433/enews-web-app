'use client';

import LargeContainer from "./common/LargeContainer";
import useHomeScreen from "./hooks/useHomeScreen";
import HomeSwiper from "./components/home/HomeSwiper";

export default function Home() {
  const { error, loading, homeData } = useHomeScreen();

  // ✅ Debugging log (optional)
  console.log("Home screen data:", homeData);

  return (
    <LargeContainer>
      {/* ✅ Pass popularNews to HomeSwiper */}
      <HomeSwiper
        headlines={homeData?.popularNews || []}
        loading={loading}
        error={error}
      />
    </LargeContainer>
  );
}

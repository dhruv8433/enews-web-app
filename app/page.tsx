"use client";

import dynamic from "next/dynamic";
import LargeContainer from "./common/LargeContainer";
import ListCategoryContainer from "./common/ListContainer";
import HomeSwiper from "./components/home/HomeSwiper";
import LazyComponent from "./common/LazyComponent";

// ✅ Lazy load components
const BusinessAndCareerGrid = dynamic(() => import("./components/home/BusinessAndCareerGrid"), { ssr: false });
const EducationSection = dynamic(() => import("./components/home/EducationSection"), { ssr: false });
const TravelAndAdventureGrid = dynamic(() => import("./components/home/TravelAndAdventureGrid"), { ssr: false });
const SocialSection = dynamic(() => import("./components/home/SocialSection"), { ssr: false });

export default function Home() {
  return (
    <LargeContainer>
      {/* Home page Swiper */}
      <HomeSwiper />

      {/* List Category Container */}
      <ListCategoryContainer />

      {/* Business & Career Section */}
      <LazyComponent component={BusinessAndCareerGrid} />

      {/* Education Section */}
      <LazyComponent component={EducationSection} />

      {/* Travel & Adventure Section */}
      {/* <LazyComponent component={TravelAndAdventureGrid} /> */}

      {/* Social Section */}
      {/* <LazyComponent component={SocialSection} /> */}
    </LargeContainer>
  );
}

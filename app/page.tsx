import LargeContainer from "./common/LargeContainer";
import ListCategoryContainer from "./common/ListContainer";
import BusinessAndCareerGrid from "./components/home/BusinessAndCareerGrid";
import EducationSection from "./components/home/EducationSection";
import HomeSwiper from "./components/home/HomeSwiper";
import SocialSection from "./components/home/SocialSection";
import TravelAndAdventureGrid from "./components/home/TravelAndAdventureGrid";

export default function Home() {
  return (
    <LargeContainer>
      {/* home page swiper and right side card */}
      <HomeSwiper />

      {/* list container */}
      <ListCategoryContainer />

      {/* business and career section */}
      <BusinessAndCareerGrid />

      {/* education section */}
      <EducationSection />

      {/* Travel and Adventure Section */}
      <TravelAndAdventureGrid />

      {/* Social Section */}
      <SocialSection />
      
    </LargeContainer>
  );
}

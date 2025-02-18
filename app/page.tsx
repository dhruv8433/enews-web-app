import LargeContainer from "./common/LargeContainer";
import ListCategoryContainer from "./common/ListContainer";
import BusinessAndCareerGrid from "./components/home/BusinessAndCareerGrid";
import HomeSwiper from "./components/home/HomeSwiper";

export default function Home() {
  return (
    <LargeContainer>
      <HomeSwiper />
      <ListCategoryContainer />
      <BusinessAndCareerGrid />
    </LargeContainer>
  );
}

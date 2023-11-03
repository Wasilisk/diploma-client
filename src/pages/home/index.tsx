import { MainBanner } from 'widgets/main-banner';
import { PopularDirections } from 'pages/home/popular-directions';
import { ToursSection } from 'pages/home/tours-section';

export const Home = () => {
  return (
    <>
      <MainBanner />
      <PopularDirections />
      <ToursSection />
    </>
  );
};

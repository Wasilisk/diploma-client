import { MainBanner } from 'widgets/main-banner';
import { PopularDirections } from 'pages/home/popular-directions';
import { ToursSection } from 'pages/home/tours-section';

export const Home = () => {
  return (
    <main className='container mx-auto flex flex-1 flex-col px-5'>
      <MainBanner />
      <PopularDirections />
      <ToursSection />
    </main>
  );
};

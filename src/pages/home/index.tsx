import { DirectionCard } from 'entities/direction/ui/direction-card';
import { MainBanner } from 'widgets/main-banner';

export const Home = () => {
  return (
    <>
      <MainBanner />
      <div className='my-10 md:mt-20'>
        <h6 className='text-4xl font-extrabold'>Популярні напрямки</h6>
        <p className='mb-6 mt-4'>
          Проводимо індивідуальні та групові екскурсії українською та англійськими мовами
        </p>
        <div className='grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-6 lg:gap-8'>
          {[...Array(6).keys()].map(() => (
            <DirectionCard />
          ))}
        </div>
      </div>
    </>
  );
};

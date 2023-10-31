import MainBannerImage from 'shared/assets/main-banner-image.png';
import BannerDivider from 'shared/assets/banner-divider.png';
import { MainSearch } from 'features/main-search';
const Chip = ({ label }: { label: string }) => (
  <div className='cursor-pointer rounded-3xl bg-neutral-800 bg-opacity-20 px-4 py-2 transition-opacity hover:bg-opacity-60'>
    <p className='text-center text-sm font-medium text-white'>{label}</p>
  </div>
);
export const MainBanner = () => {
  const directions = ['Львів', 'Коломия', 'Чернівці', 'Ворохта'];
  return (
    <div
      className={`relative mt-4 flex flex-col items-center p-4 pt-8 sm:p-6 sm:pt-16 md:p-8 md:pt-32`}
    >
      <div
        className={`absolute bottom-0 left-0 -z-10 box-border h-full w-full rounded-2xl bg-cover bg-no-repeat`}
        style={{ backgroundImage: `url(${MainBannerImage})` }}
      />
      <h1 className='text-center text-2xl font-black leading-10 sm:text-3xl sm:leading-[3.5rem] md:text-5xl'>
        Пошук і бронювання
        <br />
        екскурсій
      </h1>
      <img src={BannerDivider} className='mt-1 w-56' alt='Swoosh!' />
      <p className='mb-12 mt-2 text-center text-sm font-semibold md:text-base'>
        Екскурсії та приватні гіди по Україні
      </p>
      <MainSearch />
      <div className='mb-6 mt-14 flex flex-wrap items-center justify-center gap-x-4 sm:mt-28'>
        <p className='text-sm font-medium'>Часто шукають:</p>
        {directions.map((direction, index) => (
          <Chip key={index} label={direction} />
        ))}
      </div>
    </div>
  );
};

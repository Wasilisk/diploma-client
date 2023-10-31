import { Button } from 'shared/ui/button';

export const DirectionCard = () => {
  return (
    <div
      className='relative z-0 w-full overflow-hidden rounded-2xl bg-cover bg-center bg-no-repeat '
      style={{
        backgroundImage: `url(https://visitukraine.today/media/blog/previews/HQ71qWC4FTAw4JZqTDQFCALt87DiuTxtxv5bgKXy.jpg)`,
      }}
    >
      <div className='absolute inset-x-0 top-1/2 h-full w-full bg-neutral-800 opacity-80 blur-lg md:blur-3xl ' />
      <div className='relative flex flex-col gap-y-2 px-4 pb-4 pt-24 md:gap-y-3 md:px-6 md:pb-6 md:pt-48 lg:gap-y-4 lg:px-8 lg:pb-8 lg:pt-36 '>
        <p className='text-base font-bold text-white lg:text-xl'>Львів</p>
        <Button rounded className='px-2 py-1 md:px-2 md:py-1' variant='primary'>
          15 екскурсій
        </Button>
      </div>
    </div>
  );
};

import { Button } from 'shared/ui/button';

export const TourCard = () => {
  return (
    <div>
      <img
        className='h-28 w-full rounded-tl-2xl rounded-tr-2xl object-cover sm:h-44 md:h-48 lg:h-56'
        src='https://womo.ua/wp-content/uploads/2016/04/112.jpg'
        alt='Tour image'
      />
      <div className='flex flex-col divide-y divide-gray-200 rounded-bl-2xl rounded-br-2xl border border-t-0 border-neutral-200 p-3 md:px-6 md:py-4'>
        <div className='space-y-2 pb-2 md:pb-4'>
          <h6 className='text-sm font-bold leading-snug text-neutral-800 md:text-base'>
            Коллекция Эрмитажа и парадная жизнь Зимнего дворца
          </h6>
          <p className='hidden text-xs leading-tight text-neutral-500 md:block'>
            Двухчасовая экскурсия по Эрмитажу в мини-группе — история Зимнего дворца и шедевры
            мастеров Западной Европы.
          </p>
        </div>
        <div className='pt-2 md:pt-4'>
          <div className='w-40'>
            <span className='font-bold leading-relaxed md:text-xl'>от 2750 ₽ /</span>
            <span className='text-xs font-normal leading-relaxed'>с чел</span>
          </div>
        </div>
        <Button variant='primary' rounded fullWidth className='mt-2 md:hidden'>
          В корзину
        </Button>
      </div>
    </div>
  );
};

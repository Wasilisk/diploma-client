import { Link } from 'react-router-dom';
import { Tour } from 'shared/utils/types/tours.types';
import { endpoints } from 'shared/utils/constants';
import {
  sortTicketsByPrice,
} from 'shared/utils/libs/getMinPriceFromTicketTypes';
import { ReactNode } from 'react';

interface TourCardProps {
  tour: Tour;
  headerAction?: ReactNode;
}
export const TourCard = ({ tour, headerAction }: TourCardProps) => {
  const sortedTicketTypesByPrice = sortTicketsByPrice(tour.ticketTypes);
  return (
    <div className='group relative flex flex-col'>
      <Link to={`/${endpoints.tours}/${tour.id}`}>
        <img
          className='h-28 w-full rounded-tl-2xl rounded-tr-2xl object-cover sm:h-44 md:h-48 lg:h-56'
          src={tour.gallery[0]}
          alt='Tour image'
        />
      </Link>
      <div className='flex flex-1 flex-col divide-y divide-gray-200 rounded-bl-2xl rounded-br-2xl border border-t-0 border-neutral-200 p-3 md:px-6 md:py-4'>
        <div className='space-y-2 pb-2 md:pb-4'>
          <Link to={`${endpoints.tours}/${tour.id}`} className='line-clamp-2'>
            <h6 className='text-sm font-bold leading-snug text-neutral-800 md:text-base'>
              {tour.name}
            </h6>
          </Link>
          <div className='line-clamp-3'>
            <p className='hidden text-xs leading-tight text-neutral-500 md:block'>
              {tour.description}
            </p>
          </div>
        </div>
        <div className='md:pt-2'>
          <div className='flex items-center'>
            <span className='font-bold leading-relaxed md:text-xl'>
              від {sortedTicketTypesByPrice[0].price} грн
            </span>
            <span className='ml-1 text-xs font-normal leading-relaxed'>(за квиток)</span>
          </div>
        </div>
      </div>
      <div className='absolute right-2 top-2 hidden justify-end gap-x-1 group-hover:flex'>
        {headerAction}
      </div>
    </div>
  );
};

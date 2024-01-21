import { Link } from 'react-router-dom';
import { Button } from 'shared/ui/button';
import { Tour } from 'shared/utils/types/tours.types';
import { endpoints } from 'shared/utils/constants';
import { getMinPriceFromTicketTypes } from 'shared/utils/libs/getMinPriceFromTicketTypes';
import {ReactNode} from "react";

interface TourCardProps {
  tour: Tour;
  headerAction?: ReactNode
}
export const TourCard = ({ tour, headerAction }: TourCardProps) => {
  return (
    <div className='group flex flex-col relative'>
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
        <div className='pt-2 md:pt-4'>
          <div className='w-40'>
            <span className='font-bold leading-relaxed md:text-xl'>
              від {getMinPriceFromTicketTypes(tour.ticketTypes)} грн /
            </span>
            <span className='text-xs font-normal leading-relaxed'>с чол</span>
          </div>
        </div>
        <Button variant='primary' rounded fullWidth className='mt-2 md:hidden'>
          В корзину
        </Button>
      </div>
      <div className='hidden group-hover:flex justify-end gap-x-1 absolute right-2 top-2'>
        {headerAction}
      </div>
    </div>
  );
};

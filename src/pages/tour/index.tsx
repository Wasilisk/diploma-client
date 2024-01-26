import { useTour } from 'shared/utils/hooks/use-tour';
import { useParams } from 'react-router-dom';
import Carousel from 'react-multi-carousel';
import { BookingSection } from 'widgets/booking-section';
import Markdown from 'react-markdown';
import gfm from 'remark-gfm';
import { Role, Tour as TourType } from 'shared/utils/types';
import { useRole } from 'shared/utils/hooks/use-role';
import { useUserProfile } from 'shared/utils/hooks/use-user-profile';
import { Button } from 'shared/ui/button';
import {useTourModal} from "shared/utils/hooks/use-tour-modal";
import {CreateTour} from "features/tours/create-tour";

const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 1280 },
    items: 4,
  },
  desktop: {
    breakpoint: { max: 1280, min: 1024 },
    items: 3,
  },
  tablet: {
    breakpoint: { max: 1024, min: 640 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 640, min: 0 },
    items: 1,
  },
};

export const Tour = () => {
  const { tourId } = useParams();
  const role = useRole();
  const { setIsOpen, setSelectedDirection, setDefaultValue } = useTourModal();
  const { data: user } = useUserProfile();
  const { data: tour } = useTour(Number(tourId));

  const openModal = (tourData?: TourType) => {
    setDefaultValue(tourData ?? null);
    setSelectedDirection(tourData?.direction ?? null);
    setIsOpen(true);
  };

  return (
    <main className='container mx-auto my-10 flex flex-1 flex-col px-5'>
      <div className='flex flex-col justify-between sm:flex-row'>
        <h2 className='text-3xl font-bold leading-10 text-neutral-800'>{tour?.name}</h2>
        {([Role.ADMIN, Role.MODERATOR].includes(role) ||
          (role === Role.GUIDE && tour?.createdBy === user?.id)) && (
          <Button variant='primary' onClick={() => openModal(tour)}>
            Редагувати
          </Button>
        )}
      </div>
      {tour?.gallery && (
        <Carousel
          responsive={responsive}
          infinite={true}
          swipeable={false}
          draggable={false}
          autoPlay={true}
          autoPlaySpeed={5000}
          className='my-10'
        >
          {tour?.gallery.map((image, index) => (
            <img className='h-96 w-auto object-cover' key={index} src={image} alt='Tour image' />
          ))}
        </Carousel>
      )}
      <div className='flex flex-col gap-x-20 lg:flex-row '>
        <div className='flex-1 divide-y divide-gray-200 pb-10'>
          <p className='pb-5 leading-relaxed'>{tour?.description}</p>
          <div className='w-full pt-5'>
            <Markdown className='prose' remarkPlugins={[gfm]}>
              {tour?.content}
            </Markdown>
          </div>
        </div>
        {tour && <BookingSection tour={tour} />}
      </div>
      <CreateTour />
    </main>
  );
};

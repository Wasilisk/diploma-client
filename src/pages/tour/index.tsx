import { useTour } from 'shared/utils/hooks/use-tour';
import { useParams } from 'react-router-dom';
import Carousel from 'react-multi-carousel';
import { BookingSection } from 'widgets/booking-section';
import Markdown from 'react-markdown';
import gfm from 'remark-gfm';
import { TourInfo } from 'pages/tour/tour-info';
import { getMinPriceFromTicketTypes } from 'shared/utils/libs/getMinPriceFromTicketTypes';

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
  const { data: tour } = useTour(Number(tourId));

  return (
    <main className='container mx-auto my-10 flex flex-1 flex-col px-5'>
      <div className='flex flex-col justify-between sm:flex-row'>
        <h2 className='text-3xl font-bold leading-10 text-neutral-800'>{tour?.name}</h2>
        <div className='hidden flex-col text-right sm:flex'>
          <span className='whitespace-nowrap text-3xl font-bold text-neutral-800'>
            від {tour && getMinPriceFromTicketTypes(tour?.ticketTypes)} грн
            <br />
          </span>
          <span className='text-zinc-500'>з людини</span>
        </div>
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
      <div className='flex flex-col gap-x-20 lg:flex-row'>
        <div className='flex-1 pb-10'>
          <p className='leading-relaxed'>{tour?.description}</p>
          {tour?.tourInfo && <TourInfo tourInfo={tour.tourInfo} />}
          <Markdown className='prose' remarkPlugins={[gfm]}>
            {tour?.content}
          </Markdown>
        </div>
        {tour && <BookingSection tour={tour} />}
      </div>
    </main>
  );
};

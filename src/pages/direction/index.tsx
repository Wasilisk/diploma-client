import { useParams } from 'react-router-dom';
import { TourCard } from 'entities/tour/ui/tour-card';
import { useQuery } from 'react-query';
import { endpoints } from 'shared/utils/constants';
import { DirectionsService } from 'shared/services';
import { Filters } from 'widgets/filters';

export const Direction = () => {
  const { directionId } = useParams();
  const { data: directionData } = useQuery(
    `${endpoints.directions}/${directionId}`,
    async () => {
      const response = await DirectionsService.getById(Number(directionId));
      return response.data;
    },
    { enabled: !!directionId },
  );

  return (
    <div className='my-10'>
      <div className='mb-8 space-y-5'>
        <h2 className='text-5xl font-bold leading-10 text-neutral-800'>
          Экскурсії по напрямку: {directionData?.name}
        </h2>
        <p>Загальна кількість екскурсій: {directionData?._count.tours}</p>
      </div>
      <Filters filtersVisible={{ direction: false }} />
      <div className='grid grid-cols-2 gap-4 sm:grid-cols-3 md:gap-6 lg:grid-cols-4 lg:gap-8'>
        {directionData?.tours.map((tour) => <TourCard key={tour.id} tour={tour} />)}
      </div>
    </div>
  );
};

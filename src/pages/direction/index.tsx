import { useParams } from 'react-router-dom';
import { TourCard } from 'entities/tour/ui/tour-card';
import { useQuery } from 'react-query';
import { endpoints } from 'shared/utils/constants';
import { DirectionsService } from 'shared/services';
import { Filters } from 'widgets/filters';
import { PageHeader } from 'shared/ui/page-header';
import { Pagination } from 'features/pagination';
import { useState } from 'react';

export const Direction = () => {
  const { directionId } = useParams();
  const [currentPage, setCurrentPage] = useState(1);
  const { data: directionData } = useQuery(
    `${endpoints.directions}/${directionId}`,
    async () => {
      const response = await DirectionsService.getById(Number(directionId));
      return response.data;
    },
    { enabled: !!directionId },
  );

  return (
    <div className='my-6 sm:my-10'>
      <PageHeader
        title={`Экскурсії по напрямку: ${directionData?.name}`}
        description={`Загальна кількість екскурсій: ${directionData?._count.tours}`}
      />
      <Filters
        filtersVisible={{
          paymentType: true,
          priceRange: true,
          tourType: true,
          direction: false,
          dateRange: true,
        }}
      />
      <div className='grid grid-cols-2 gap-4 sm:grid-cols-3 md:gap-6 lg:grid-cols-4 lg:gap-8'>
        {directionData?.tours.map((tour) => <TourCard key={tour.id} tour={tour} />)}
      </div>
      {directionData?.tours && (
        <div className='f-wull flex justify-center'>
          <Pagination
            onPageChange={setCurrentPage}
            totalCount={directionData?._count.tours}
            currentPage={currentPage}
            pageSize={3}
          />
        </div>
      )}
    </div>
  );
};

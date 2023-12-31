import { useParams } from 'react-router-dom';
import { TourCard } from 'entities/tour/ui/tour-card';
import { Filters } from 'widgets/filters';
import { PageHeader } from 'shared/ui/page-header';
import { Pagination } from 'features/pagination';
import { useState } from 'react';
import { useDirectionById } from 'shared/utils/hooks/use-direction-by-id';
import { useTours } from 'shared/utils/hooks/use-tours';
import { TOURS_PAGE_SIZE } from 'shared/utils/constants';

export const Direction = () => {
  const { directionId } = useParams();
  const [currentPage, setCurrentPage] = useState(1);
  const { data: directionData } = useDirectionById(Number(directionId));
  const { data: tours } = useTours({
    directionId: Number(directionId),
    paginationParams: { page: currentPage - 1, size: TOURS_PAGE_SIZE },
  });

  return (
    <main className='container mx-auto flex flex-1 flex-col px-5'>
      <div className='my-6 sm:my-10'>
        <PageHeader
          title={`Экскурсії по напрямку: ${directionData?.name}`}
          description={`Загальна кількість екскурсій: ${tours?.totalItems}`}
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
          {tours?.items.map((tour) => <TourCard key={tour.id} tour={tour} />)}
        </div>
        {tours && tours.totalItems > TOURS_PAGE_SIZE && (
          <div className='f-wull flex justify-center'>
            <Pagination
              onPageChange={setCurrentPage}
              totalCount={tours?.totalItems}
              currentPage={currentPage}
              pageSize={TOURS_PAGE_SIZE}
            />
          </div>
        )}
      </div>
    </main>
  );
};

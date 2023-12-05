import { TourCard } from 'entities/tour/ui/tour-card';
import { useTours } from 'shared/utils/hooks/use-tours';
import { Filters } from 'widgets/filters';
import { Pagination } from 'features/pagination';
import { useState } from 'react';
import { PageHeader } from 'shared/ui/page-header';
import { TOURS_PAGE_SIZE } from 'shared/utils/constants';

export const Tours = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const { data: tours } = useTours({
    paginationParams: { page: currentPage - 1, size: TOURS_PAGE_SIZE },
  });

  return (
    <div className='my-6 sm:my-10'>
      <PageHeader
        title='Усі екскурсії'
        description={`Загальна кількість екскурсій: ${tours?.totalItems}`}
      />
      <Filters />
      <div className='mb-10 grid grid-cols-2 gap-4 sm:grid-cols-3 md:gap-6 lg:grid-cols-4 lg:gap-8'>
        {tours?.items.map((tour) => <TourCard tour={tour} key={tour.id} />)}
      </div>
      {tours && tours.totalItems > TOURS_PAGE_SIZE && (
        <div className='f-wull flex justify-center'>
          <Pagination
            onPageChange={setCurrentPage}
            totalCount={tours.totalItems}
            currentPage={currentPage}
            pageSize={TOURS_PAGE_SIZE}
          />
        </div>
      )}
    </div>
  );
};

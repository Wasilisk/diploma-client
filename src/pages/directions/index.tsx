import { Pagination } from 'features/pagination';
import { useState } from 'react';
import { DIRECTIONS_PAGE_SIZE } from 'shared/utils/constants';
import { useDirections } from 'shared/utils/hooks/use-directions';
import { DirectionCard } from 'entities/direction/ui/direction-card';
import { PageHeader } from 'shared/ui/page-header';
import { CreateDirection } from 'features/directions/create-direction';
import { DirectionCardSkeleton } from 'entities/direction/ui/direction-card-skeleton';
import { ContentState } from 'shared/ui/content-state';
import { parseContentState } from 'shared/ui/content-state/utils';
import { isEmpty } from 'shared/utils/libs';
import { Link } from 'react-router-dom';
import { Button } from 'shared/ui/button';
import { EditDirection } from 'features/directions/edit-direction';
import { useRole } from 'shared/utils/hooks/use-role';
import { Role } from 'shared/utils/types';
import {DeleteDirection} from "features/directions/delete-direction";

export const Directions = () => {
  const role = useRole();
  const [currentPage, setCurrentPage] = useState(1);
  const {
    data: directionsData,
    isLoading,
    isError,
    refetch,
  } = useDirections({
    paginationParams: {
      page: currentPage - 1,
      size: DIRECTIONS_PAGE_SIZE,
    },
  });

  const contentStateValue = parseContentState(isLoading, isError, isEmpty(directionsData?.items));

  return (
    <main className='container mx-auto flex flex-1 flex-col px-5'>
      <div className='my-6 sm:my-10'>
        <PageHeader
          title={`Усі напрямки`}
          description={`Загальна кількість напрямків: ${directionsData?.totalItems || 0}`}
          action={[Role.ADMIN, Role.MODERATOR].includes(role) && <CreateDirection />}
        />
        <ContentState
          state={contentStateValue}
          loadingPlaceholderComponent={
            <div className='my-8 grid grid-cols-2 gap-4 sm:grid-cols-3 md:gap-6 lg:grid-cols-4 lg:gap-8'>
              {Array.from({ length: DIRECTIONS_PAGE_SIZE }).map((_, index) => (
                <DirectionCardSkeleton key={index} />
              ))}
            </div>
          }
          onReload={refetch}
        >
          <div className='my-8 grid grid-cols-2 gap-4 sm:grid-cols-3 md:gap-6 lg:grid-cols-4 lg:gap-8'>
            {directionsData?.items.map((direction) => (
              <DirectionCard
                key={direction.id}
                {...direction}
                contentAction={
                  <Link to={`/directions/${direction.id}`} className='w-fit'>
                    <Button className='px-2 py-1 md:px-2 md:py-1' variant='primary'>
                      Екскурсій: {direction._count.tours}
                    </Button>
                  </Link>
                }
                headerAction={
                  [Role.ADMIN, Role.MODERATOR].includes(role) && (
                    <>
                      <EditDirection data={direction} />
                      {direction._count.tours === 0 && <DeleteDirection directionId={direction.id}/>}
                    </>
                  )
                }
              />
            ))}
          </div>
        </ContentState>
        {directionsData && directionsData.totalItems > DIRECTIONS_PAGE_SIZE && (
          <div className='f-wull flex justify-center'>
            <Pagination
              onPageChange={setCurrentPage}
              totalCount={directionsData?.totalItems}
              currentPage={currentPage}
              pageSize={DIRECTIONS_PAGE_SIZE}
            />
          </div>
        )}
      </div>
    </main>
  );
};

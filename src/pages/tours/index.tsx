import { TourCard } from 'entities/tour/ui/tour-card';
import { useTours } from 'shared/utils/hooks/use-tours';
import { Filters } from 'widgets/filters';
import { Pagination } from 'features/pagination';
import { useEffect, useState } from 'react';
import { PageHeader } from 'shared/ui/page-header';
import { TOURS_PAGE_SIZE } from 'shared/utils/constants';
import { DirectionCardSkeleton } from 'entities/direction/ui/direction-card-skeleton';
import { ContentState } from 'shared/ui/content-state';
import { parseContentState } from 'shared/ui/content-state/utils';
import { isEmpty } from 'shared/utils/libs';
import { Role, Tour } from 'shared/utils/types';
import { useRole } from 'shared/utils/hooks/use-role';
import { CreateTour } from 'features/tours/create-tour';
import { DeleteTour } from 'features/tours/delete-tour';
import { useUserProfile } from 'shared/utils/hooks/use-user-profile';
import { Button } from 'shared/ui/button';
import { useTourModal } from 'shared/utils/hooks/use-tour-modal';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { IconButton } from 'shared/ui/icon-button';
import { useSearchParams } from 'react-router-dom';
import { useDirectionById } from 'shared/utils/hooks/use-direction-by-id';
import { useFilters } from 'shared/utils/hooks/use-filters';

export const Tours = () => {
  const role = useRole();
  const { dateRange, priceRange, groupSize, setDateRange } = useFilters();
  const { setIsOpen, setSelectedDirection, setDefaultValue } = useTourModal();
  const { data: user } = useUserProfile();

  const [searchParams] = useSearchParams();
  const directionIdSearchParam = searchParams.get('directionId');
  const selectedDate = searchParams.get('selectedDate');

  const [currentPage, setCurrentPage] = useState(1);
  const { data: directionData } = useDirectionById(
    directionIdSearchParam ? Number(directionIdSearchParam) : undefined,
  );

  const {
    data: tours,
    isLoading,
    isError,
    refetch,
  } = useTours({
    filters: {
      directionId: directionIdSearchParam ? Number(directionIdSearchParam) : null,
      startDate: selectedDate ? selectedDate : dateRange.from,
      endDate: dateRange.to,
      minPrice: priceRange.min,
      maxPrice: priceRange.max,
      minGroupSize: groupSize.min,
      maxGroupSize: groupSize.max,
    },
    paginationParams: { page: currentPage - 1, size: TOURS_PAGE_SIZE },
  });

  const contentStateValue = parseContentState(isLoading, isError, isEmpty(tours?.items));
  const openModal = (tourData?: Tour) => {
    setDefaultValue(tourData ?? null);
    setSelectedDirection(directionData ?? null);
    setIsOpen(true);
  };

  useEffect(() => {
    if (selectedDate) {
      setDateRange({ from: selectedDate, to: dateRange.to });
    }
  }, []);

  return (
    <main className='container mx-auto my-6 flex flex-1 flex-col px-5 sm:my-10'>
      <PageHeader
        title={directionData ? `Экскурсії по напрямку: ${directionData?.name}` : 'Усі екскурсії'}
        description={`Загальна кількість екскурсій: ${tours?.totalItems}`}
        action={
          [Role.ADMIN, Role.MODERATOR, Role.GUIDE].includes(role) && (
            <Button variant='primary' onClick={() => openModal()}>
              Створити екскурсію
            </Button>
          )
        }
      />
      <Filters />
      <ContentState
        state={contentStateValue}
        loadingPlaceholderComponent={
          <div className='mb-10 grid grid-cols-2 gap-4 sm:grid-cols-3 md:gap-6 lg:grid-cols-4 lg:gap-8'>
            {Array.from({ length: TOURS_PAGE_SIZE }).map((_, index) => (
              <DirectionCardSkeleton key={index} />
            ))}
          </div>
        }
        onReload={refetch}
      >
        <div className='mb-10 grid grid-cols-2 gap-4 sm:grid-cols-3 md:gap-6 lg:grid-cols-4 lg:gap-8'>
          {tours?.items.map((tour) => (
            <TourCard
              tour={tour}
              key={tour.id}
              headerAction={
                ([Role.ADMIN, Role.MODERATOR].includes(role) ||
                  (role === Role.GUIDE && tour.createdBy === user?.id)) && (
                  <>
                    <IconButton
                      icon={<EditOutlinedIcon />}
                      onClick={() => openModal(tour)}
                      id={`edit-tour-${tour.id}`}
                      tooltipText='Редагувати'
                    />
                    <DeleteTour tourId={tour.id} />
                  </>
                )
              }
            />
          ))}
        </div>
      </ContentState>
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
      <CreateTour />
    </main>
  );
};

import { useState } from 'react';
import { TOURS_PAGE_SIZE } from 'shared/utils/constants';
import { useTours } from 'shared/utils/hooks/use-tours';
import { useUserProfile } from 'shared/utils/hooks/use-user-profile';
import { TourListItem } from 'pages/my-tours/tour-list-item';

export const MyTours = () => {
  const { data: userInfo } = useUserProfile();
  const [currentPage, setCurrentPage] = useState(1);
  const { data: userTours } = useTours({
    filters: {
      createdBy: userInfo?.id,
    },
    paginationParams: { page: currentPage - 1, size: TOURS_PAGE_SIZE },
  });
  console.log(setCurrentPage)
  return <div>{userTours?.items.map((tour) => <TourListItem data={tour} />)}</div>;
};

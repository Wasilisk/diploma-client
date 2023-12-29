import { useState } from 'react';
import { USERS_PAGE_SIZE } from 'shared/utils/constants';
import { parseContentState } from 'shared/ui/content-state/utils';
import { isEmpty } from 'shared/utils/libs';
import { ContentState } from 'shared/ui/content-state';
import { UserListItemSkeleton } from 'entities/user/ui/user-list-item-skeleton';
import { Pagination } from 'features/pagination';
import { useGuidePermissionRequests } from 'shared/utils/hooks/use-guide-permission-requests';
import { GuidePermissionRequestListItem } from 'entities/guide-permission-requests/ui/guide-permission-requests-list-item';
import { RequestsFilters } from 'features/guide-permission-request/requests-filters';
import {useRequestsFilters} from "features/guide-permission-request/requests-filters/use-requests-filters";

export const GuidePermissionRequests = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const { status, sorting } = useRequestsFilters();
  const {
    data: guidePermissionRequests,
    isError,
    isLoading,
    refetch,
  } = useGuidePermissionRequests({
    paginationParams: { page: currentPage - 1, size: USERS_PAGE_SIZE },
    sort: {
      createdAt: sorting,
    },
    filter: {
      status,
    },
  });

  const contentStateValue = parseContentState(
    isLoading,
    isError,
    isEmpty(guidePermissionRequests?.items),
  );

  return (
    <div>
      <RequestsFilters />
      <ContentState
        state={contentStateValue}
        loadingPlaceholderComponent={
          <div className='flex flex-col divide-y divide-gray-200'>
            {Array.from({ length: USERS_PAGE_SIZE }).map(() => (
              <UserListItemSkeleton />
            ))}
          </div>
        }
        onReload={refetch}
      >
        <div className='flex flex-col gap-y-2 divide-y divide-gray-200'>
          {guidePermissionRequests &&
            guidePermissionRequests.items.map((supportedMessage) => (
              <GuidePermissionRequestListItem data={supportedMessage} action={<></>} />
            ))}
        </div>
      </ContentState>
      {guidePermissionRequests && guidePermissionRequests.totalItems > USERS_PAGE_SIZE && (
        <div className='f-wull flex justify-center py-4'>
          <Pagination
            onPageChange={setCurrentPage}
            totalCount={guidePermissionRequests.totalItems}
            currentPage={currentPage}
            pageSize={USERS_PAGE_SIZE}
          />
        </div>
      )}
    </div>
  );
};

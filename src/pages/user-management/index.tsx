import { useUsers } from 'shared/utils/hooks/use-users';
import { useState } from 'react';
import { USERS_PAGE_SIZE } from 'shared/utils/constants';
import { Pagination } from 'features/pagination';
import { ContentState } from 'shared/ui/content-state';
import { parseContentState } from 'shared/ui/content-state/utils';
import { isEmpty } from 'shared/utils/libs';
import { UserFilters } from 'features/user-management/user-filters';
import { useUserFilters } from 'features/user-management/user-filters/use-user-filters';
import { UserListItem } from 'entities/user/ui/user-list-item';
import { UserListItemSkeleton } from 'entities/user/ui/user-list-item-skeleton';

export const UserManagement = () => {
  const { firstName, lastName, email, role } = useUserFilters();
  const [currentPage, setCurrentPage] = useState(1);
  const {
    data: users,
    isError,
    isLoading,
    refetch,
  } = useUsers({
    paginationParams: { page: currentPage - 1, size: USERS_PAGE_SIZE },
    searchParams: {
      firstName,
      lastName,
      email,
      role,
    },
  });

  const contentStateValue = parseContentState(isLoading, isError, isEmpty(users?.items));

  return (
    <div>
      <UserFilters />
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
        <div className='flex flex-col divide-y divide-gray-200'>
          {users && users.items.map((user) => <UserListItem key={user.id} userInfo={user} />)}
        </div>
      </ContentState>
      {users && users.totalItems > USERS_PAGE_SIZE && (
        <div className='f-wull flex justify-center py-4'>
          <Pagination
            onPageChange={setCurrentPage}
            totalCount={users.totalItems}
            currentPage={currentPage}
            pageSize={USERS_PAGE_SIZE}
          />
        </div>
      )}
    </div>
  );
};

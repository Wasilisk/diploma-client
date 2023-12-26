import { useUsers } from 'shared/utils/hooks/use-users';
import { useState } from 'react';
import { USERS_PAGE_SIZE } from 'shared/utils/constants';
import { Pagination } from 'features/pagination';
import { FullUserInfo, Role } from 'shared/utils/types';
import { ContentState } from 'shared/ui/content-state';
import { parseContentState } from 'shared/ui/content-state/utils';
import { isEmpty } from 'shared/utils/libs';
import { ToggleBanUser } from 'features/user-management/toggle-ban-user';
import { ChangeUserRole } from 'features/user-management/change-user-role';
import {useRole} from "shared/utils/hooks/use-role";

const UserItemSkeleton = () => (
  <div className='grid animate-pulse grid-cols-12 gap-x-4 gap-y-2 py-4 sm:flex-row sm:items-center'>
    <div className='col-span-2 flex items-center'>
      <div className='h-20 w-20 rounded-2xl bg-gray-300'></div>
    </div>
    <div className='col-span-2'>
      <div className='mb-1 h-4 w-20 bg-gray-300'></div>
      <div className='h-6 w-28 bg-gray-300'></div>
    </div>
    <div className='col-span-2'>
      <div className='mb-1 h-4 w-20 bg-gray-300'></div>
      <div className='h-6 w-28 bg-gray-300'></div>
    </div>
    <div className='col-span-3'>
      <div className='mb-1 h-4 w-20 bg-gray-300'></div>
      <div className='h-6 w-36 bg-gray-300'></div>
    </div>
    <div className='col-span-1'>
      <div className='mb-1 h-4 w-20 bg-gray-300'></div>
      <div className='h-6 w-16 bg-gray-300'></div>
    </div>
    <div className='col-span-2 flex justify-end gap-x-2'>
      <div className='h-12 w-12 rounded-full bg-gray-300'></div>
      <div className='h-12 w-12 rounded-full bg-gray-300'></div>
    </div>
  </div>
);

interface UserItemProps {
  userInfo: FullUserInfo;
}

const allowedRolesToChange: {[key: string]: Role[]} = {
    [Role.MODERATOR]: [Role.USER, Role.GUIDE],
    [Role.ADMIN]: [Role.USER, Role.GUIDE, Role.MODERATOR],
}

const UserItem = ({ userInfo }: UserItemProps) => {
    const role = useRole()
  return (
    <div
      className='grid grid-cols-12 gap-x-4 gap-y-2 py-4 sm:flex-row sm:items-center'
      key={userInfo.id}
    >
      <div className='col-span-2 flex items-center'>
        {userInfo.profile.profilePicture ? (
          <img
            className='h-20 w-20 rounded-2xl'
            src={userInfo.profile.profilePicture}
            alt='Profile image'
          />
        ) : (
          <div className='flex h-20 w-20 items-center justify-center rounded-2xl bg-sky-400 text-xl font-bold text-white'>
            {userInfo.profile.firstName[0].toUpperCase()}
          </div>
        )}
      </div>
      <div className='col-span-2'>
        <span className='text-sm font-semibold leading-relaxed text-neutral-800'>
          Ім'я
          <br />
        </span>
        <span className='text-base leading-relaxed text-neutral-800'>
          {userInfo.profile.firstName}
        </span>
      </div>
      <div className='col-span-2'>
        <span className='text-sm font-semibold leading-relaxed text-neutral-800'>
          Прізвище
          <br />
        </span>
        <span className='text-base leading-relaxed text-neutral-800'>
          {userInfo.profile.lastName}
        </span>
      </div>
      <div className='col-span-3'>
        <span className='text-sm font-semibold leading-relaxed text-neutral-800'>
          Емейл
          <br />
        </span>
        <span className='text-base leading-relaxed text-neutral-800'>{userInfo.email}</span>
      </div>
      <div className='col-span-1'>
        <span className='text-sm font-semibold leading-relaxed text-neutral-800'>
          Роль
          <br />
        </span>
        <span className='text-base leading-relaxed text-neutral-800'>{userInfo.role}</span>
      </div>
      {allowedRolesToChange[role].includes(userInfo.role) && (
        <div className='col-span-2 flex justify-end gap-x-2'>
          <ChangeUserRole userId={userInfo.id} role={userInfo.role} />
          <ToggleBanUser isBanned={userInfo.isBanned} userId={userInfo.id} />
        </div>
      )}
    </div>
  );
};

export const UserManagement = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const {
    data: users,
    isError,
    isLoading,
    refetch,
  } = useUsers({ page: currentPage - 1, size: USERS_PAGE_SIZE });

  const contentStateValue = parseContentState(isLoading, isError, isEmpty(users?.items));

  return (
    <div>
      <ContentState
        state={contentStateValue}
        loadingPlaceholderComponent={
          <div className='flex flex-col divide-y divide-gray-200'>
            {Array.from({ length: USERS_PAGE_SIZE }).map(() => (
              <UserItemSkeleton />
            ))}
          </div>
        }
        onReload={refetch}
      >
        <div className='flex flex-col divide-y divide-gray-200'>
          {users && users.items.map((user) => <UserItem key={user.id} userInfo={user} />)}
        </div>
      </ContentState>
      {users && users.totalItems > USERS_PAGE_SIZE && (
        <div className='f-wull flex justify-center py-4'>
          <Pagination
            onPageChange={setCurrentPage}
            totalCount={users?.totalItems}
            currentPage={currentPage}
            pageSize={USERS_PAGE_SIZE}
          />
        </div>
      )}
    </div>
  );
};

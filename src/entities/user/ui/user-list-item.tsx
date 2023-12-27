import { useRole } from 'shared/utils/hooks/use-role';
import { ChangeUserRole } from 'features/user-management/change-user-role';
import { ToggleBanUser } from 'features/user-management/toggle-ban-user';
import { FullUserInfo, Role } from 'shared/utils/types';

interface UserItemProps {
  userInfo: FullUserInfo;
}

const allowedRolesToChange: { [key: string]: Role[] } = {
  [Role.MODERATOR]: [Role.USER, Role.GUIDE],
  [Role.ADMIN]: [Role.USER, Role.GUIDE, Role.MODERATOR],
};

export const UserListItem = ({ userInfo }: UserItemProps) => {
  const role = useRole();
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

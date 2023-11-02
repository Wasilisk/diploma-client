import { Menu } from '@headlessui/react';

import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { MenuItems } from 'shared/ui/menu-items';
import { ProfileAvatar } from 'entities/profile/ui/profile-avatar';
import { useAuth } from 'shared/utils/hooks/use-auth';
import { useUserProfile } from 'shared/utils/hooks/use-user-profile';

export const UserProfileMenu = () => {
  const { logout } = useAuth();
  const { data, isLoading } = useUserProfile();

  const username = `${data?.profile.firstName} ${data?.profile.lastName}`;
  const links = [
    { to: '/profile/orders', label: 'Мої замовлення' },
    { to: '/profile/account-settings', label: 'Налаштування профіля' },
    { to: '/profile/support', label: 'Підтримка' },
  ];

  return (
    <Menu as='div' className='relative'>
      {isLoading ? (
        <div className=' aspect-square h-9 animate-pulse rounded-full bg-gray-200 md:h-[3rem]' />
      ) : (
        <Menu.Button as='button' className='flex appearance-none items-center'>
          <ProfileAvatar src={data?.profile.profilePicture} username={username} />
          <div className='no-wrap ml-2 hidden items-center gap-2 md:flex'>
            {username}
            <KeyboardArrowDownIcon />
          </div>
        </Menu.Button>
      )}
      <MenuItems items={links} className='origin-to-right right-0'>
        <Menu.Item
          as={'button'}
          className='w-full whitespace-nowrap py-2 text-left font-medium'
          onClick={logout}
        >
          Вийти
        </Menu.Item>
      </MenuItems>
    </Menu>
  );
};

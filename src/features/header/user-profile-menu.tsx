import { Menu } from '@headlessui/react';

import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { MenuItems } from 'shared/ui/menu-items';
import { ProfileAvatar } from 'entities/profile/ui/profile-avatar';

export const UserProfileMenu = () => {
  const links = [
    { to: '/account-settings', label: 'Мої замовлення' },
    { to: '/support', label: 'Налаштування профіля' },
    { to: '/license', label: 'Підтримка' },
  ];
  const user = {
    avatar:
      'https://static1.howtogeekimages.com/wordpress/wp-content/uploads/2021/07/Discord-Logo-Lede.png',
    username: 'Vasyl Petryna',
  };

  return (
    <Menu as='div' className='relative'>
      <Menu.Button as='button' className='flex appearance-none items-center'>
        <ProfileAvatar src={user.avatar} username={user.username} />
        <div className='no-wrap ml-2 hidden items-center gap-2 md:flex'>
          {user.username}
          <KeyboardArrowDownIcon />
        </div>
      </Menu.Button>
      <MenuItems items={links} className='origin-to-right right-0' />
    </Menu>
  );
};

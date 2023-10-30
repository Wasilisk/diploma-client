import { Menu } from '@headlessui/react';
import { Button } from 'shared/ui/button';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { MenuItems } from 'shared/ui/menu-items';

export const DirectionsMenu = () => {
  const links = [
    { to: '/account-settings', label: 'Яремче' },
    { to: '/support', label: 'Львів' },
    { to: '/license', label: 'Тернопіль' },
    { to: '/sign-out', label: 'Буковель' },
  ];

  return (
    <Menu as='div' className='relative'>
      <Menu.Button as={Button} variant='primary' rounded className='font-semibold'>
        <div className='no-wrap flex items-center gap-2'>
          Напрямок
          <KeyboardArrowDownIcon />
        </div>
      </Menu.Button>
      <MenuItems items={links} className='origin-to-left absolute left-0 ' />
    </Menu>
  );
};

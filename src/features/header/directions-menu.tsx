import { Menu } from '@headlessui/react';
import { Button } from 'shared/ui/button';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { MenuItems } from 'shared/ui/menu-items';
import { useDirections } from 'shared/utils/hooks/use-directions';
import { endpoints } from 'shared/utils/constants';

export const DirectionsMenu = () => {
  const { data: directions, isLoading } = useDirections();

  const linkDirections = directions?.map((direction) => ({
    label: direction.name,
    to: `/${endpoints.directions}/${direction.id}`,
  }));

  return (
    <Menu as='div' className='relative'>
      <Menu.Button
        as={Button}
        variant='primary'
        rounded
        className='font-semibold'
        disabled={isLoading}
      >
        <div className='no-wrap flex items-center gap-2'>
          Напрямок
          <KeyboardArrowDownIcon />
        </div>
      </Menu.Button>
      {linkDirections && (
        <MenuItems
          items={linkDirections}
          className='origin-to-left no-scrollbar absolute left-0 max-h-56 w-full overflow-auto'
        />
      )}
    </Menu>
  );
};

import { Menu } from '@headlessui/react';
import { Button } from 'shared/ui/button';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { MenuItems } from 'shared/ui/menu-items';
import { endpoints } from 'shared/utils/constants';
import { useInfiniteDirectionScroll } from 'shared/utils/hooks/use-infinite-direction-scroll';
import { useInView } from 'react-intersection-observer';
import { useEffect } from 'react';

export const DirectionsMenu = () => {
  const { ref, inView } = useInView();
  const { data, isLoading, hasNextPage, fetchNextPage } = useInfiniteDirectionScroll();

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage, hasNextPage]);

  const linkDirections = data?.pages
    .map((page) =>
      page.items.map((direction) => ({
        label: direction.name,
        to: `/${endpoints.directions}/${direction.name}`,
      })),
    )
    .flat();

  return (
    <Menu as='div' className='relative'>
      <Menu.Button
        as={Button}
        variant='primary'
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
          ref={ref}
          items={linkDirections}
          className='origin-to-left no-scrollbar absolute left-0 max-h-56 overflow-auto'
        />
      )}
    </Menu>
  );
};

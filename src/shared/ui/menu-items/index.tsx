import { Menu } from '@headlessui/react';
import { ReactNode, forwardRef, ForwardedRef } from 'react';
import { Link } from 'react-router-dom';

type MenuItemsProps = {
  items: Array<{ to: string; label: string }>;
  className?: string;
  children?: ReactNode;
};

export const MenuItems = forwardRef(
  ({ items, className, children }: MenuItemsProps, ref: ForwardedRef<HTMLDivElement>) => {
    return (
      <Menu.Items
        ref={ref}
        className={`absolute w-fit top-full z-20 mt-2 inline-flex flex-col items-start justify-start divide-y divide-gray-200 rounded-md bg-white px-6 py-2 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none ${className}`}
      >
        {items.map((item, index) => (
          <Menu.Item
            key={index}
            as={Link}
            to={item.to}
            ref={items.length === index + 1 ? ref : undefined}
            className='w-full whitespace-nowrap py-2 font-medium'
          >
            {item.label}
          </Menu.Item>
        ))}
        {children}
      </Menu.Items>
    );
  },
);

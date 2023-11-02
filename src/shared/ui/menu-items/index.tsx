import { Menu } from '@headlessui/react';
import { ReactNode } from 'react';
import { Link } from 'react-router-dom';

type MenuItemsProps = {
  items: Array<{ to: string; label: string }>;
  className?: string;
  children?: ReactNode;
};
export const MenuItems = ({ items, className, children }: MenuItemsProps) => {
  return (
    <Menu.Items
      className={`absolute top-full z-20 mt-2 inline-flex flex-col items-start justify-start divide-y divide-gray-200 rounded-md bg-white px-6 py-2 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none ${className}`}
    >
      {items.map((item) => (
        <Menu.Item
          key={item.to}
          as={Link}
          to={item.to}
          className='w-full whitespace-nowrap py-2 font-medium'
        >
          {item.label}
        </Menu.Item>
      ))}
      {children}
    </Menu.Items>
  );
};

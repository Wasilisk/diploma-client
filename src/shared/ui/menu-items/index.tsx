import { Menu } from '@headlessui/react';
import { Fragment } from 'react';

type MenuItemsProps = {
  items: Array<{ to: string; label: string }>;
  className?: string;
};
export const MenuItems = ({ items, className }: MenuItemsProps) => {
  return (
    <Menu.Items
      className={`absolute top-full mt-2 inline-flex flex-col items-start justify-start divide-y divide-gray-200 rounded-md bg-white px-6 py-4 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none ${className}`}
    >
      {items.map((item) => (
        <Menu.Item key={item.to} as={Fragment}>
          <a href={item.to} className='w-full whitespace-nowrap py-2 font-medium'>
            {item.label}
          </a>
        </Menu.Item>
      ))}
    </Menu.Items>
  );
};

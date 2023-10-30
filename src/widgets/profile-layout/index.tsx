import { Tab } from '@headlessui/react';
import { Fragment } from 'react';
import { Link, Outlet } from 'react-router-dom';

export const ProfileLayout = () => {
  const tabs = [
    {
      label: 'Мої замовлення',
      to: 'profile/orders',
    },
    {
      label: 'Налаштування профілю',
      to: 'profile/settings',
    },
    {
      label: 'Написати в підтримку',
      to: 'profile/support',
    },
  ];

  const handleScroll = (event: any) => {
    const container = event.target;
    const scrollAmount = event.deltaY;
    container.scrollTo({
      top: 0,
      left: container.scrollLeft + scrollAmount,
      behavior: 'smooth',
    });
  };

  return (
    <>
      <Tab.Group>
        <Tab.List
          onWheel={handleScroll}
          className='no-scrollbar mt-4 flex gap-x-5 overflow-x-scroll border-b border-gray-200 md:mt-10 md:gap-x-10'
        >
          {tabs.map((tab) => (
            <Tab as={Fragment} key={tab.to}>
              {({ selected }) => (
                <Link
                  className={`whitespace-nowrap pb-4 outline-none ${
                    selected && 'border-b-2 border-yellow-400 font-semibold'
                  }`}
                  to={tab.to}
                >
                  {tab.label}
                </Link>
              )}
            </Tab>
          ))}
        </Tab.List>
      </Tab.Group>
      <div className='my-6 flex flex-col gap-y-5 md:my-12 md:gap-y-10'>
        <Outlet />
      </div>
    </>
  );
};

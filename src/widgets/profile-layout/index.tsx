import { Tab } from '@headlessui/react';
import { Fragment, useEffect, useState } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';

const tabs = [
  {
    index: 0,
    label: 'Мої замовлення',
    to: '/profile/orders',
  },
  {
    index: 1,
    label: 'Налаштування профілю',
    to: '/profile/account-settings',
  },
  {
    index: 2,
    label: 'Написати в підтримку',
    to: '/profile/support',
  },
];

export const ProfileLayout = () => {
  const location = useLocation();
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    const currentTabIndex = tabs.find((tab) => tab.to === location.pathname)?.index || 0;
    setSelectedIndex(currentTabIndex);
  }, [location.pathname]);

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
      <Tab.Group selectedIndex={selectedIndex} onChange={setSelectedIndex}>
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

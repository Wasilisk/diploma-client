import {Tab} from '@headlessui/react';
import {Fragment, useEffect, useState, WheelEventHandler} from 'react';
import {Link, Outlet, useLocation} from 'react-router-dom';
import {useRole} from "shared/utils/hooks/use-role";
import {profileMenuConfig} from "widgets/profile-layout/config";

export const ProfileLayout = () => {
  const role = useRole()
  const location = useLocation();
  const [selectedIndex, setSelectedIndex] = useState(0);

  const availableTabs = profileMenuConfig.filter(tab => tab.role.includes(role))

  useEffect(() => {
    const currentTabIndex  = availableTabs.findIndex(tab => tab.to === location.pathname) || 0;
    setSelectedIndex(currentTabIndex);
  }, [location.pathname]);

  const handleScroll = (event: WheelEvent) => {
    const container = event.target as HTMLElement;
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
          onWheel={handleScroll as unknown as WheelEventHandler<HTMLDivElement>}
          className='no-scrollbar mt-4 flex gap-x-5 overflow-x-scroll border-b border-gray-200 md:mt-10 md:gap-x-10'
        >
          {availableTabs.map((tab) => (
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

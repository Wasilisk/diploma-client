import { Disclosure } from '@headlessui/react';
import { IconButton } from 'shared/ui/icon-button';
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined';
import { Tour, TourGroup } from 'shared/utils/types';

interface TourGroupListItemProps {
  tourData: Tour;
  tourGroup: TourGroup;
}
export const TourGroupListItem = ({ tourData, tourGroup }: TourGroupListItemProps) => {
  return (
    <Disclosure as='div' className='rounded-xl'>
      {({ open }) => (
        <>
          <Disclosure.Button className='flex w-full items-center h-12 justify-between gap-x-4 rounded-xl bg-gray-100 p-2 text-left text-sm font-medium focus:outline-none focus-visible:ring focus-visible:ring-purple-500/75'>
            <h6 className='space-x-6 font-bold text-gray-500'>
              <span>Час: {tourGroup.time}</span>
              <span>
                Заброньовано місць: {tourGroup.orders.reduce((acc, order) => acc + order.count, 0)}/
                {tourData.tourInfo.groupSize}
              </span>
            </h6>
            <IconButton
              icon={
                <KeyboardArrowDownOutlinedIcon
                  className={`${open ? 'rotate-180 transform' : ''} h-5 w-5`}
                />
              }
            />
          </Disclosure.Button>
          <Disclosure.Panel className='py-2 gap-y-2 flex flex-col'>
            {tourGroup.orders.map((order) => (
              <div
                className='grid grid-cols-12 gap-x-4 gap-y-2 rounded-2xl border p-2 sm:flex-row sm:items-center'
                key={order.id}
              >
                <div className='col-span-1 flex items-center'>
                  {order.user.profile.profilePicture ? (
                    <img
                      className='h-12 w-12 rounded-2xl'
                      src={order.user.profile.profilePicture}
                      alt='Profile image'
                    />
                  ) : (
                    <div className='flex h-12 w-12 items-center justify-center rounded-2xl bg-sky-400 text-xl font-bold text-white'>
                      {order.user.profile.firstName[0].toUpperCase()}
                    </div>
                  )}
                </div>
                <div className='col-span-2'>
                  <span className='text-sm font-semibold leading-relaxed text-neutral-800'>
                    Ім'я
                    <br />
                  </span>
                  <span className='text-base leading-relaxed text-neutral-800'>
                    {order.user.profile.firstName}
                  </span>
                </div>
                <div className='col-span-2'>
                  <span className='text-sm font-semibold leading-relaxed text-neutral-800'>
                    Прізвище
                    <br />
                  </span>
                  <span className='text-base leading-relaxed text-neutral-800'>
                    {order.user.profile.lastName}
                  </span>
                </div>
                <div className='col-span-3'>
                  <span className='text-sm font-semibold leading-relaxed text-neutral-800'>
                    Вид квитка
                    <br />
                  </span>
                  <span className='text-base leading-relaxed text-neutral-800'>
                    {order.ticketType.name}
                  </span>
                </div>
                <div className='col-span-2'>
                  <span className='text-sm font-semibold leading-relaxed text-neutral-800'>
                    К-сть квитків
                    <br />
                  </span>
                  <span className='text-base leading-relaxed text-neutral-800'>{order.count}</span>
                </div>
              </div>
            ))}
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
};

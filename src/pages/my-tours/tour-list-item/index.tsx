import { Disclosure } from '@headlessui/react';
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined';
import { IconButton } from 'shared/ui/icon-button';
import { Tour, TourGroup } from 'shared/utils/types';
import { useTourGroups } from 'shared/utils/hooks/use-tour-groups';
import { useMemo } from 'react';
import { format } from 'date-fns';
import { uk } from 'date-fns/locale';
import { isEmpty } from 'underscore';
import { TourGroupListItem } from 'pages/my-tours/tour-group-list-item';

interface TourListItem {
  data: Tour;
}

export const TourListItem = ({ data }: TourListItem) => {
  const { data: tourGroupsData, refetch } = useTourGroups({ tourId: data.id });

  const handleArrowClick = (isOpen: boolean) => {
    !isOpen && refetch();
  };
  const tourGroupsGroupedByDate = useMemo(
    () =>
      tourGroupsData?.reduce(
        (acc, tourGroup) => {
          if (isEmpty(tourGroup.orders)) return acc;
          if (acc[tourGroup.date]) {
            return { ...acc, [tourGroup.date]: [...acc[tourGroup.date], tourGroup] };
          }
          return { ...acc, [tourGroup.date]: [tourGroup] };
        },
        {} as Record<string, TourGroup[]>,
      ),
    [tourGroupsData],
  );
  return (
    <Disclosure as='div' className='rounded-3xl shadow'>
      {({ open }) => (
        <>
          <Disclosure.Button
            onClick={() => handleArrowClick(open)}
            className='flex w-full items-center justify-between gap-x-4 rounded-3xl bg-gray-100 p-2 text-left text-sm font-medium focus:outline-none focus-visible:ring focus-visible:ring-purple-500/75'
          >
            <div className='flex items-center'>
              <img className='h-20 w-20 rounded-2xl' src={data.gallery[0]} alt='Profile image' />
            </div>
            <div className='flex flex-1 flex-col'>
              <p className='line-clamp-2 text-base leading-relaxed text-neutral-800'>{data.name}</p>
            </div>
            <IconButton
              icon={
                <KeyboardArrowDownOutlinedIcon
                  className={`${open ? 'rotate-180 transform' : ''} h-5 w-5`}
                />
              }
            />
          </Disclosure.Button>
          <Disclosure.Panel className='divide-y divide-dashed divide-gray-200 p-4'>
            {tourGroupsGroupedByDate &&
              Object.entries(tourGroupsGroupedByDate).map(([date, tourGroups]) => (
                <div className='py-2'>
                  <h5 className='font-bold text-gray-500 pb-2'>
                    {format(new Date(date), 'd MMMM | EEEE', { locale: uk })}
                  </h5>
                  {tourGroups.map((tourGroup) => (
                    <TourGroupListItem tourGroup={tourGroup} tourData={data} />
                  ))}
                </div>
              ))}
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
};

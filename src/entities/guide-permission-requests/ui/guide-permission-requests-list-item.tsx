import { Disclosure } from '@headlessui/react';
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined';
import { IconButton } from 'shared/ui/icon-button';
import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import { Tooltip } from 'react-tooltip';
import { format } from 'date-fns';
import { ReactElement } from 'react';
import {
  GuidePermissionRequest,
  GuidePermissionRequestStatus,
} from 'shared/utils/types/guide-permission-request.types';
import { DeclineRequest } from 'features/guide-permission-request/decline-request';
import { AcceptRequest } from 'features/guide-permission-request/accept-request';

interface GuidePermissionRequestListItemProps {
  data: GuidePermissionRequest;
  action: ReactElement;
}

export const GuidePermissionRequestListItem = ({
  data,
  action,
}: GuidePermissionRequestListItemProps) => {
  return (
    <Disclosure as='div' className='rounded-3xl border border-gray-100 shadow'>
      {({ open }) => (
        <>
          <Disclosure.Button className='flex w-full items-center justify-between gap-x-4 rounded-3xl bg-gray-100 p-2 text-left text-sm font-medium focus:outline-none focus-visible:ring focus-visible:ring-purple-500/75'>
            <div className='flex items-center'>
              <div className='flex h-20 w-20 items-center justify-center rounded-2xl bg-sky-400 text-xl font-bold text-white'>
                {data.firstName[0].toUpperCase()}
              </div>
            </div>
            <div className='flex flex-1 flex-col'>
              <div className='flex gap-x-2'>
                <p className='text-sm font-semibold leading-relaxed text-gray-600'>
                  {format(new Date(data.createdAt), 'dd/MM/yyyy HH:mm')}
                </p>
                {data.status === GuidePermissionRequestStatus.ACCEPTED && (
                  <>
                    <CheckCircleOutlineOutlinedIcon
                      data-tooltip-id={`accepted-request-${data.id}`}
                      data-tooltip-content={'Прийнято'}
                    />
                    <Tooltip id={`accepted-request-${data.id}`} />
                  </>
                )}
                {data.status === GuidePermissionRequestStatus.DECLINED && (
                    <>
                      <CancelOutlinedIcon
                          data-tooltip-id={`declined-request-${data.id}`}
                          data-tooltip-content={'Відхилено'}
                      />
                      <Tooltip id={`declined-request-${data.id}`} />
                    </>
                )}
              </div>
              <p className='line-clamp-2 text-base leading-relaxed text-neutral-800'>
                {`${data.firstName} ${data.lastName}`}
              </p>
            </div>
            <div className='flex gap-x-2'>
              {data.status === GuidePermissionRequestStatus.PENDING && (
                <>
                  <AcceptRequest requestId={data.id} />
                  <DeclineRequest requestId={data.id} />
                </>
              )}
              <IconButton
                icon={
                  <KeyboardArrowDownOutlinedIcon
                    className={`${open ? 'rotate-180 transform' : ''} h-5 w-5`}
                  />
                }
              />
            </div>
          </Disclosure.Button>
          <Disclosure.Panel className='p-4'>
            <p className='text-sm text-gray-800'>
              <span className='text-sm font-semibold leading-relaxed text-gray-600'>
                Номер телефону:{' '}
              </span>
              {data.phone}
            </p>
            <p className='text-sm text-gray-800'>
              <span className='text-sm font-semibold leading-relaxed text-gray-600'>Е-mail: </span>
              {data.email}
            </p>
            <p className='text-sm text-gray-800'>
              <span className='text-sm font-semibold leading-relaxed text-gray-600'>Опис: </span>
              {data.description}
            </p>
            {action}
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
};

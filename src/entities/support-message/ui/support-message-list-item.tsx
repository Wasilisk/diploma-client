import { Disclosure } from '@headlessui/react';
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined';
import { IconButton } from 'shared/ui/icon-button';
import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined';
import { Tooltip } from 'react-tooltip';
import { SupportMessage, SupportMessageStatus } from 'shared/utils/types';
import { format } from 'date-fns';
import { ReactElement } from 'react';

interface SupportMessageListItemProps {
  data: SupportMessage;
  action: ReactElement;
}

export const SupportMessageListItem = ({ data, action }: SupportMessageListItemProps) => {
  return (
    <Disclosure as='div' className='rounded-3xl border border-gray-100 shadow'>
      {({ open }) => (
        <>
          <Disclosure.Button className='flex w-full items-center justify-between gap-x-4 rounded-3xl bg-gray-100 p-2 text-left text-sm font-medium focus:outline-none focus-visible:ring focus-visible:ring-purple-500/75'>
            <div className='flex items-center'>
              {data.user.profile.profilePicture ? (
                <img
                  className='h-20 w-20 rounded-2xl'
                  src={data.user.profile.profilePicture}
                  alt='Profile image'
                />
              ) : (
                <div className='flex h-20 w-20 items-center justify-center rounded-2xl bg-sky-400 text-xl font-bold text-white'>
                  {data.user.profile.firstName[0].toUpperCase()}
                </div>
              )}
            </div>
            <div className='flex flex-1 flex-col'>
              <div className='flex gap-x-2'>
                <p className='text-sm font-semibold leading-relaxed text-gray-600'>
                  {`${data.user.profile.firstName} ${data.user.profile.lastName}`} &#x2022;{' '}
                  {format(new Date(data.createdAt), 'dd/MM/yyyy HH:mm')}
                </p>
                {data.status === SupportMessageStatus.RESOLVED && (
                  <>
                    <CheckCircleOutlineOutlinedIcon
                      data-tooltip-id={`resolved-letter-${data.id}`}
                      data-tooltip-content={'Вирішено'}
                    />
                    <Tooltip id={`resolved-letter-${data.id}`} />
                  </>
                )}
              </div>
              <p className='line-clamp-2 text-base leading-relaxed text-neutral-800'>
                {data.subject}
              </p>
            </div>
            <IconButton
              icon={
                <KeyboardArrowDownOutlinedIcon
                  className={`${open ? 'rotate-180 transform' : ''} h-5 w-5`}
                />
              }
            />
          </Disclosure.Button>
          <Disclosure.Panel className='p-4'>
            <p className='text-sm text-gray-800'>
              <span className='text-sm font-semibold leading-relaxed text-gray-600'>
                Номер телефону:{' '}
              </span>
              {data.user.phone}
            </p>
            <p className='text-sm text-gray-800'>
              <span className='text-sm font-semibold leading-relaxed text-gray-600'>
                Вміст повідомлення:{' '}
              </span>
              {data.content}
            </p>
            {action}
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
};

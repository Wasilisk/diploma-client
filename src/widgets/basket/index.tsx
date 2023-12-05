import { IconButton } from 'shared/ui/icon-button';
import LocalMallOutlinedIcon from '@mui/icons-material/LocalMallOutlined';
import { useBasket } from 'widgets/basket/use-basket';
import { Dialog } from '@headlessui/react';
import { useState } from 'react';
import { format } from 'date-fns';
import { uk } from 'date-fns/locale';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { PaymentForm } from 'widgets/basket/payment-form';
import CloseIcon from '@mui/icons-material/Close';

export const Basket = () => {
  let [isOpen, setIsOpen] = useState(false);
  const { getTotalTicketsCount, tickets, addTicket, removeTicket } = useBasket();

  const totalTicketsCount = getTotalTicketsCount();
  const closeModal = () => setIsOpen(false);

  return (
    <>
      <div className='relative'>
        <IconButton icon={<LocalMallOutlinedIcon />} onClick={() => setIsOpen(true)} />
        <p className='absolute right-[-4px] top-[-4px] flex aspect-square h-6 w-6 items-center justify-center rounded-full bg-yellow-400 text-sm'>
          {totalTicketsCount}
        </p>
      </div>
      <Dialog as='div' className='relative z-10' onClose={closeModal} open={isOpen}>
        <div className='fixed inset-0 bg-black/25' />
        <div className='fixed inset-0 overflow-y-auto'>
          <div className='flex min-h-full items-center justify-center sm:py-4'>
            <Dialog.Panel className='relative w-full max-w-5xl transform overflow-hidden bg-white p-4 text-left align-middle shadow-xl sm:rounded-2xl sm:px-14 sm:py-10'>
              <div
                className='absolute right-2 top-2 cursor-pointer p-2 sm:right-4 sm:top-4'
                onClick={closeModal}
              >
                <CloseIcon />
              </div>
              <Dialog.Title
                as='h3'
                className='mb-10 text-center text-3xl font-bold leading-10 text-neutral-800'
              >
                Оформлення замовлення
              </Dialog.Title>
              <div className='mt-2 divide-y divide-gray-200 border-y border-gray-200'>
                {Object.values(tickets).map((ticket) => (
                  <div
                    className='grid grid-cols-12 gap-4 py-5 sm:flex-row sm:items-center'
                    key={ticket.id}
                  >
                    <div className='col-span-4 flex items-center gap-x-5'>
                      <img
                        className='h-20 w-20 rounded-2xl'
                        src={ticket.tour.image}
                        alt='Tour image'
                      />
                      <p className='max-w-xs font-normal leading-relaxed text-neutral-800'>
                        {ticket.tour.name}
                      </p>
                    </div>
                    <div className='col-span-3'>
                      <span className='text-sm font-semibold leading-relaxed text-neutral-800'>
                        Дата і час
                        <br />
                      </span>
                      <span className='text-base leading-relaxed text-neutral-800'>
                        {format(new Date(ticket.date), "d MMMM 'в' HH:mm | EEEE", { locale: uk })}
                      </span>
                    </div>
                    <div className='col-span-3'>
                      <p className='text-right text-sm font-semibold leading-relaxed text-neutral-800'>
                        {ticket.name}
                        <br />
                      </p>
                      <p className='text-base font-bold leading-relaxed text-neutral-800 sm:text-right'>
                        {ticket.price} грн
                      </p>
                    </div>
                    <div className='col-span-2 flex w-full items-center justify-between'>
                      <div className='flex items-center gap-x-2'>
                        <IconButton
                          className='h-9 md:h-9'
                          icon={<AddIcon />}
                          onClick={() => addTicket(ticket.id)}
                        />
                        {ticket.count}
                        <IconButton
                          className='h-9 md:h-9'
                          icon={<RemoveIcon />}
                          onClick={() => removeTicket(ticket.id)}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <PaymentForm />
            </Dialog.Panel>
          </div>
        </div>
      </Dialog>
    </>
  );
};

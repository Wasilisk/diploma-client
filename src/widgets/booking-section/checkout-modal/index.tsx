import { IconButton } from 'shared/ui/icon-button';
import { Dialog } from '@headlessui/react';
import { useState } from 'react';
import { format, parse } from 'date-fns';
import { uk } from 'date-fns/locale';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { PaymentForm } from 'widgets/booking-section/checkout-modal/payment-form';
import CloseIcon from '@mui/icons-material/Close';
import { Button } from 'shared/ui/button';
import { useBooking } from 'widgets/booking-section/use-booking';
import { useTour } from 'shared/utils/hooks/use-tour';

export const CheckoutModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { getTotalTicketsCount, tickets, orderInfo, addTicket, removeTicket, getTicketTypeById } =
    useBooking();
  const { data: tour } = useTour(orderInfo.tourId);

  const totalTicketsCount = getTotalTicketsCount();
  const closeModal = () => setIsOpen(false);
  const openModal = () => setIsOpen(true);

  const parsedTime = orderInfo.time && parse(orderInfo.time, 'HH:mm', orderInfo.date);

  return (
    <>
      <Button
        variant='primary'
        rounded
        fullWidth
        disabled={!orderInfo.time || totalTicketsCount === 0}
        onClick={openModal}
      >
        Оформити замовлення
      </Button>
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
              <div className='divide-y divide-gray-200 border-b border-gray-200'>
                <div className='grid grid-cols-12 gap-4 pb-5'>
                  <div className='col-span-5 flex items-center gap-x-5'>
                    <img
                      className='h-20 w-20 rounded-2xl'
                      src={tour?.gallery?.[0]}
                      alt='Tour image'
                    />
                    <p className='max-w-xs font-normal leading-relaxed text-neutral-800'>
                      {tour?.name}
                    </p>
                  </div>
                  <div className='col-span-3 flex flex-col justify-center'>
                    <span className='text-sm font-semibold leading-relaxed text-neutral-800'>
                      Дата і час
                      <br />
                    </span>
                    <span className='text-base leading-relaxed text-neutral-800'>
                      {parsedTime &&
                        format(new Date(parsedTime), "d MMMM 'в' HH:mm | EEEE", { locale: uk })}
                    </span>
                  </div>
                  <div className='col-span-2 flex flex-col justify-center'>
                    <span className='text-sm font-semibold leading-relaxed text-neutral-800'>
                      Тривалість
                      <br />
                    </span>
                    <span className='text-base leading-relaxed text-neutral-800'>
                      {tour?.tourInfo.duration}
                    </span>
                  </div>
                  <div className='col-span-2 flex flex-col justify-center'>
                    <span className='text-right text-sm font-semibold leading-relaxed text-neutral-800'>
                      Кількість квитків
                      <br />
                    </span>
                    <span className='text-right text-base leading-relaxed text-neutral-800'>
                      {getTotalTicketsCount()}
                    </span>
                  </div>
                </div>
                {tickets &&
                  Object.entries(tickets).map(([ticketTypeId, count]) => {
                    const ticketType = getTicketTypeById(ticketTypeId);
                    if (!ticketType) return;
                    return (
                      <div
                        className='grid grid-cols-12 gap-4 py-5 sm:flex-row sm:items-center'
                        key={ticketTypeId}
                      >
                        <div className='col-span-3'>
                          <p className='text-sm font-semibold leading-relaxed text-neutral-800'>
                            Назва квитка
                            <br />
                          </p>
                          <p className='text-base leading-relaxed text-neutral-800'>
                            {ticketType.name}
                          </p>
                        </div>
                        <div className='col-span-3'>
                          <p className='text-right text-sm font-semibold leading-relaxed text-neutral-800'>
                            Вартість квитка
                            <br />
                          </p>
                          <p className='text-base font-bold leading-relaxed text-neutral-800 sm:text-right'>
                            {ticketType.price} грн
                          </p>
                        </div>
                        <div className='col-span-3'>
                          <p className='text-right text-sm font-semibold leading-relaxed text-neutral-800'>
                            Передоплата (10%)
                            <br />
                          </p>
                          <p className='text-base font-bold leading-relaxed text-neutral-800 sm:text-right'>
                            {ticketType.price * 0.1} грн
                          </p>
                        </div>
                        <div className='col-span-3 flex w-full items-center justify-end'>
                          <div className='flex items-center gap-x-2'>
                            <IconButton
                              className='h-9 md:h-9'
                              icon={<AddIcon />}
                              onClick={() => addTicket(Number(ticketTypeId))}
                            />
                            {count}
                            <IconButton
                              className='h-9 md:h-9'
                              icon={<RemoveIcon />}
                              onClick={() => removeTicket(Number(ticketTypeId))}
                            />
                          </div>
                        </div>
                      </div>
                    );
                  })}
              </div>
              <PaymentForm />
            </Dialog.Panel>
          </div>
        </div>
      </Dialog>
    </>
  );
};

import { Button } from 'shared/ui/button';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { IconButton } from 'shared/ui/icon-button';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { useBooking } from 'widgets/booking-section/use-booking';
import { useEffect } from 'react';
import { addDays, format, isEqual, startOfDay } from 'date-fns';
import DatePicker from 'react-datepicker';
import { Tour, TourSchedule } from 'shared/utils/types';
import { CheckoutModal } from 'widgets/booking-section/checkout-modal';
import { SelectorFilter } from 'shared/ui/filters';

const tomorrowDate = startOfDay(addDays(new Date(), 1));

type BookingSectionProps = {
  tour: Tour;
};

export const BookingSection = ({ tour }: BookingSectionProps) => {
  const {
    orderInfo: { date, tourId, time },
    tickets,
    reset,
    removeTicket,
    addTicket,
    setOrderInfo,
    setTicketTypes,
    getTotalTicketsPrice,
  } = useBooking();

  const tomorrowDateSelected = isEqual(date, tomorrowDate);
  const selectedDayName = format(new Date(date), 'iiii').toLowerCase();
  const daySchedule = tour.schedule[selectedDayName as keyof TourSchedule] as string[];

  useEffect(() => {
    setTicketTypes(tour.ticketTypes);
    setOrderInfo({ tourId: tour.id, time, date });
    return reset;
  }, []);

  return (
    <aside className='h-fit max-w-none rounded-2xl bg-neutral-100 lg:max-w-md'>
      <div className='rounded-2xl border border-neutral-200 bg-white p-8'>
        <h3 className='text-2xl font-bold leading-9 text-black'>Забронювати экскурсію</h3>
        <div className='my-6 flex flex-col gap-3 sm:flex-row'>
          <Button
            variant={tomorrowDateSelected ? 'primary' : 'secondary'}
            className='w-full text-sm font-normal sm:w-1/2 sm:flex-grow'
            onClick={() => setOrderInfo({ tourId, time, date: tomorrowDate })}
            rounded
          >
            Завтра
          </Button>
          <div className='sm:w-1/2 sm:flex-grow'>
            <DatePicker
              className='w-full'
              selected={date}
              minDate={new Date(tour.schedule.startDate)}
              maxDate={new Date(tour.schedule.endDate)}
              onChange={(date) =>
                setOrderInfo({ tourId, time, date: date ? startOfDay(date) : tomorrowDate })
              }
              wrapperClassName='w-full'
              customInput={
                <Button
                  variant={tomorrowDateSelected ? 'secondary' : 'primary'}
                  className='flex justify-center gap-x-2 whitespace-nowrap text-sm font-normal'
                  rounded
                  fullWidth
                >
                  <CalendarMonthIcon />
                  {tomorrowDateSelected ? 'Дата' : format(date, 'dd.MM')}
                </Button>
              }
            />
          </div>
        </div>
        <SelectorFilter
          value={time}
          onChange={(value) => setOrderInfo({ tourId, time: value, date })}
          label='Час'
          placeholder='Оберіть час'
          items={daySchedule}
          renderItemValue={(time) => time}
        />
        <div className='divide-y divide-gray-200'>
          {tour.ticketTypes.map((ticketType) => (
            <div key={ticketType.id} className='flex justify-between gap-x-5 py-4'>
              <div className='flex flex-1 flex-col flex-wrap items-start sm:flex-row sm:items-center sm:justify-between'>
                <p className='whitespace-nowrap text-sm font-medium leading-relaxed text-zinc-700'>
                  {ticketType.name}
                </p>
                <p className='text-sm font-bold leading-relaxed text-zinc-700'>
                  {ticketType.price} ₴
                </p>
              </div>
              <div className='flex items-center gap-x-2'>
                <IconButton
                  className='h-9 md:h-9'
                  icon={<AddIcon />}
                  onClick={() => addTicket(ticketType.id)}
                />
                {tickets?.[ticketType.id] ?? 0}
                <IconButton
                  className='h-9 md:h-9'
                  icon={<RemoveIcon />}
                  disabled={!tickets || !tickets[ticketType.id]}
                  onClick={() => removeTicket(ticketType.id)}
                />
              </div>
            </div>
          ))}
          <div className='flex items-center justify-between py-4'>
            <p className='text-sm font-medium text-zinc-700'>В сумі</p>
            <p className='text-2xl font-semibold leading-relaxed text-zinc-700'>
              {getTotalTicketsPrice()} ₴
            </p>
          </div>
        </div>
        <CheckoutModal />
      </div>
      <div className='flex flex-col gap-y-4 p-8'>
        <div className='flex flex-col justify-between gap-x-4 sm:flex-row'>
          <p className='text-sm font-bold leading-relaxed text-zinc-700'>Місце зустрічі:</p>
          <p className='text-sm leading-normal text-zinc-700'>{tour.tourInfo.meetingPlace}</p>
        </div>
        <div className='flex flex-col justify-between gap-x-4 sm:flex-row'>
          <p className='text-sm font-bold leading-relaxed text-zinc-700'>Місце закінчення:</p>
          <p className='text-sm leading-normal text-zinc-700'> {tour.tourInfo.endingPlace}</p>
        </div>
        <div className='flex flex-col justify-between gap-x-4 sm:flex-row'>
          <p className='text-sm font-bold leading-relaxed text-zinc-700'>Тривалість:</p>
          <p className='text-sm leading-normal text-zinc-700'>{tour.tourInfo.duration}</p>
        </div>
        <div className='flex flex-col justify-between gap-x-4 sm:flex-row'>
          <p className='text-sm font-bold leading-relaxed text-zinc-700'>Розмір групи:</p>
          <p className='text-sm leading-normal text-zinc-700'>{tour.tourInfo.groupSize} (чоловік)</p>
        </div>
      </div>
    </aside>
  );
};

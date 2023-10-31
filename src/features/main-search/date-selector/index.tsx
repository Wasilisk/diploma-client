import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined';
import DatePicker from 'react-datepicker';
import { useState } from 'react';

export const DateSelector = () => {
  const [startDate, setStartDate] = useState<Date | null>(new Date());

  return (
    <div className='relative flex w-full items-center gap-x-4'>
      <div className='aspect-square rounded-full border border-zinc-300 bg-white p-2'>
        <CalendarTodayOutlinedIcon />
      </div>
      <DatePicker
        selected={startDate}
        placeholderText='Дата'
        onChange={(date) => setStartDate(date)}
        className='w-full text-base font-medium text-neutral-500 outline-none'
      />
    </div>
  );
};

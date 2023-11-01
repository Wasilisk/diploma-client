import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined';
import DatePicker from 'react-datepicker';

interface DateSelectorProps {
  date: Date | null;
  setDate: (date: Date | null) => void;
}
export const DateSelector = ({ date, setDate }: DateSelectorProps) => {
  return (
    <div className='relative flex w-full items-center gap-x-4'>
      <div className='aspect-square rounded-full border border-zinc-300 bg-white p-2'>
        <CalendarTodayOutlinedIcon />
      </div>
      <DatePicker
        selected={date}
        placeholderText='Дата'
        onChange={(date) => setDate(date)}
        className='w-full text-base font-medium text-neutral-500 outline-none'
      />
    </div>
  );
};

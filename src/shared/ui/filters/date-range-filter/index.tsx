import DatePicker from 'react-datepicker';
import { useState } from 'react';
import { FilterChip } from 'shared/ui/filters/filter-chip';

interface DateRangeFilterProps {
  label: string;
}
export const DateRangeFilter = ({ label }: DateRangeFilterProps) => {
  const [from, setFrom] = useState<Date | null>(new Date());
  const [to, setTo] = useState<Date | null>(new Date());

  return (
    <div className='flex flex-wrap items-center gap-x-3 gap-y-1'>
      <div className='font-medium leading-relaxed text-zinc-700'>{label}</div>
      <div className='flex items-center gap-x-2'>
        <div>
          <DatePicker
            selected={from}
            placeholderText='Дата'
            onChange={(date) => setFrom(date)}
            customInput={<FilterChip />}
            dateFormat='dd.MM'
          />
        </div>
        <p>-</p>
        <div>
          <DatePicker
            selected={to}
            placeholderText='Дата'
            onChange={(date) => setTo(date)}
            customInput={<FilterChip />}
            dateFormat='dd.MM'
          />
        </div>
      </div>
    </div>
  );
};

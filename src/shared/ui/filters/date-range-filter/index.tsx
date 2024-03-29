import DatePicker from 'react-datepicker';
import { FilterChip } from 'shared/ui/filters/filter-chip';
import { FilterRange } from 'shared/utils/types';

interface DateRangeFilterProps {
  label: string;
  dateRange: FilterRange;
  setDateRange: (dateRange: FilterRange) => void;
}
export const DateRangeFilter = ({ label, dateRange, setDateRange }: DateRangeFilterProps) => {
  return (
    <div className='flex flex-wrap items-center gap-x-3 gap-y-1'>
      <div className='font-medium leading-relaxed text-zinc-700'>{label}</div>
      <div className='flex items-center gap-x-2'>
        <div>
          <DatePicker
            selected={new Date(dateRange.from!)}
            placeholderText='Дата'
            onChange={(date) =>
              setDateRange({ ...dateRange, from: date?.toISOString() ?? new Date().toISOString() })
            }
            customInput={<FilterChip />}
            dateFormat='dd.MM'
          />
        </div>
        <p>-</p>
        <div>
          <DatePicker
            selected={new Date(dateRange.to!)}
            placeholderText='Дата'
            onChange={(date) =>
              setDateRange({ ...dateRange, to: date?.toISOString() ?? new Date().toISOString() })
            }
            customInput={<FilterChip />}
            dateFormat='dd.MM'
          />
        </div>
      </div>
    </div>
  );
};

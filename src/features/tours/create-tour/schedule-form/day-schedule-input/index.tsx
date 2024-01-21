import { IconButton } from 'shared/ui/icon-button';
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';
import { Control, useFieldArray } from 'react-hook-form';
import { useState } from 'react';
import { daysOfWeek } from 'shared/utils/constants';
import { CreateTourFormValues } from 'shared/utils/types';
import DatePicker from 'react-datepicker';
import { format, setHours, setMinutes } from 'date-fns';
import { FilterChip } from 'shared/ui/filters/filter-chip';

export const daysOfWeekLocalization: Record<string, string> = {
  monday: 'Понеділок',
  tuesday: 'Вівторок',
  wednesday: 'Середа',
  thursday: 'Четвер',
  friday: "П'ятниця",
  saturday: 'Субота',
  sunday: 'Неділя',
};

interface DayScheduleInputProps {
  control: Control<CreateTourFormValues>;
  day: (typeof daysOfWeek)[number];
}

export const DayScheduleInput = ({ control, day }: DayScheduleInputProps) => {
  const defaultTime = setHours(setMinutes(new Date(), 0), 12)
  const [date, setDate] = useState<Date | null>(defaultTime);
  const { fields, append, remove } = useFieldArray({
    control,
    name: `schedule.weekSchedule.${day}`,
  });

  const addTime = () => {
    if (date) {
      append({ time: format(date, 'HH:mm') });
      setDate(defaultTime);
    }
  };

  return (
    <div className='flex items-center gap-x-4'>
      <p className='w-20'>{daysOfWeekLocalization[day]}</p>
      <div className='flex flex-1 gap-x-2 overflow-scroll'>
        {fields.map((time, index) => (
          <div
            className='flex h-14 items-center gap-x-2 rounded-lg bg-zinc-100 pl-4 pr-2'
            key={time.id}
          >
            <p>{fields[index]?.time}</p>
            <div className='cursor-pointer' onClick={() => remove(index)}>
              <CloseIcon />
            </div>
          </div>
        ))}
      </div>
      <div className='flex gap-x-2'>
        <div>
          <DatePicker
            selected={date}
            onChange={(date) => setDate(date)}
            showTimeSelect
            showTimeSelectOnly
            timeIntervals={15}
            timeCaption='Час'
            dateFormat='HH:mm'
            customInput={<FilterChip className='h-14 w-20 rounded-lg' />}
          />
        </div>
        <IconButton className='h-14 rounded-lg' icon={<AddIcon />} onClick={addTime} />
      </div>
    </div>
  );
};

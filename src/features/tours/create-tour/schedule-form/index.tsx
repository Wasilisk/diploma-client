import { ErrorMessageController } from 'shared/ui/error-message-controller';
import { Controller, useFormContext } from 'react-hook-form';
import { CreateTourFormValues } from 'shared/utils/types';
import { Tab } from '@headlessui/react';
import DatePicker from 'react-datepicker';
import { FilterChip } from 'shared/ui/filters/filter-chip';
import { daysOfWeek } from 'shared/utils/constants';
import { DayScheduleInput } from 'features/tours/create-tour/schedule-form/day-schedule-input';

export const ScheduleForm = () => {
  const {
    formState: { errors },
    control,
  } = useFormContext<CreateTourFormValues>();

  return (
    <Tab.Panel as='div' className='flex flex-col divide-y divide-gray-200'>
      <ErrorMessageController error={errors.schedule?.weekSchedule} className='top-2'>
        <div className='flex items-center gap-x-8 pb-4'>
          <div className='flex items-center gap-x-2'>
            <p>Дата початку: </p>
            <div>
              <Controller
                control={control}
                name='schedule.startDate'
                render={({ field }) => (
                  <DatePicker
                    selected={new Date(field.value)}
                    placeholderText='Дата'
                    onChange={(date) => field.onChange(date?.toISOString())}
                    customInput={<FilterChip />}
                    dateFormat='dd.MM.yy'
                  />
                )}
              />
            </div>
          </div>
          <div className='flex items-center gap-x-2'>
            <p>Дата завершення: </p>
            <div>
              <Controller
                control={control}
                name='schedule.endDate'
                render={({ field }) => (
                  <DatePicker
                    selected={new Date(field.value)}
                    placeholderText='Дата'
                    onChange={(date) => field.onChange(date?.toISOString())}
                    customInput={<FilterChip />}
                    dateFormat='dd.MM.yy'
                  />
                )}
              />
            </div>
          </div>
        </div>
      </ErrorMessageController>
      {daysOfWeek.map((daysOfWeek) => (
        <div className='py-2'>
          <DayScheduleInput control={control} day={daysOfWeek} />
        </div>
      ))}
    </Tab.Panel>
  );
};

import { ErrorMessageController } from 'shared/ui/error-message-controller';
import { Input } from 'shared/ui/input';
import { Controller, useFieldArray, useFormContext } from 'react-hook-form';
import { CreateTourFormValues } from 'shared/utils/types';
import { Tab } from '@headlessui/react';
import { IconButton } from 'shared/ui/icon-button';
import CloseIcon from '@mui/icons-material/Close';

export const TicketsForm = () => {
  const {
    formState: { errors },
    control,
    register,
  } = useFormContext<CreateTourFormValues>();
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'tickets',
  });

  return (
    <Tab.Panel as='div' className='flex flex-col gap-y-4'>
      {fields.map((ticket, index) => (
        <div className='flex w-full gap-x-2' key={ticket.id}>
          <Input
            className='w-3/4'
            placeholder='Назва квитка'
            {...register(`tickets.${index}.name`)}
          />
          <Controller
            control={control}
            name={`tickets.${index}.price`}
            render={({ field: { onChange, value } }) => (
              <Input
                className='w-1/4'
                placeholder='Ціна (грн)'
                value={value}
                type='number'
                onChange={(event) => onChange(parseInt(event.target.value))}
              />
            )}
          />
          <IconButton
            className='h-14 rounded-lg'
            icon={<CloseIcon />}
            onClick={() => remove(index)}
          />
        </div>
      ))}
      <ErrorMessageController
        error={Array.isArray(errors.tickets) ? errors.tickets?.[0].name : errors.tickets}
      >
        <div
          onClick={() => append({ name: '', price: 0 })}
          className='box-border flex h-14 cursor-pointer items-center justify-center rounded-lg border-2 border-dashed border-zinc-300 font-semibold'
        >
          <p className='text-gray-500 '>Додати квиток</p>
        </div>
      </ErrorMessageController>
    </Tab.Panel>
  );
};

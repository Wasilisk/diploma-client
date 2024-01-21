import { ErrorMessageController } from 'shared/ui/error-message-controller';
import { MultipleImageInput } from 'shared/ui/multiple-image-input';
import { Input } from 'shared/ui/input';
import { TextArea } from 'shared/ui/text-area';
import { Controller, useFormContext } from 'react-hook-form';
import { Tab } from '@headlessui/react';
import { DirectionAutocomplete } from 'features/directions/direction-autocomplete';
import { CreateTourFormValues } from 'shared/utils/types';

export const GeneralInfoForm = () => {
  const {
    formState: { errors },
    control,
    register,
  } = useFormContext<CreateTourFormValues>();
  return (
    <Tab.Panel as='div' className='flex flex-col gap-y-4'>
      <ErrorMessageController error={errors.files} className='top-2'>
        <MultipleImageInput />
      </ErrorMessageController>
      <ErrorMessageController error={errors.direction}>
        <div className='w-full rounded-lg bg-zinc-100 px-6 py-4'>
          <Controller
            control={control}
            name='direction'
            render={({ field: { value, onChange } }) => (
              <DirectionAutocomplete
                value={value}
                onChange={onChange}
                inputClassname='font-normal'
              />
            )}
          />
        </div>
      </ErrorMessageController>
      <ErrorMessageController error={errors.name}>
        <Input placeholder='Назва туру' {...register(`name`)} />
      </ErrorMessageController>
      <ErrorMessageController error={errors.description}>
        <Input placeholder='Короткий опис' {...register(`description`)} />
      </ErrorMessageController>
      <ErrorMessageController error={errors.content}>
        <TextArea placeholder='Детальний опис (Markdown)' {...register(`content`)} />
      </ErrorMessageController>
    </Tab.Panel>
  );
};

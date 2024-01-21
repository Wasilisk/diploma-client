import { ErrorMessageController } from 'shared/ui/error-message-controller';
import { Input } from 'shared/ui/input';
import { useFormContext } from 'react-hook-form';
import { CreateTourFormValues } from 'shared/utils/types';
import { Tab } from '@headlessui/react';

export const AdditionalInfoForm = () => {
  const {
    formState: { errors },
    register,
  } = useFormContext<CreateTourFormValues>();

  return (
    <Tab.Panel as='div' className='flex flex-col gap-y-4'>
      <ErrorMessageController error={errors.tourInfo?.meetingPlace}>
        <Input placeholder='Місце зустрічі' {...register(`tourInfo.meetingPlace`)} />
      </ErrorMessageController>
      <ErrorMessageController error={errors.tourInfo?.endingPlace}>
        <Input placeholder='Місце закінчення' {...register(`tourInfo.endingPlace`)} />
      </ErrorMessageController>
      <ErrorMessageController error={errors.tourInfo?.duration}>
        <Input placeholder='Тривалість' {...register(`tourInfo.duration`)} />
      </ErrorMessageController>
      <ErrorMessageController error={errors.tourInfo?.groupSize}>
        <Input placeholder='Розмір групи' {...register(`tourInfo.groupSize`)} />
      </ErrorMessageController>
    </Tab.Panel>
  );
};

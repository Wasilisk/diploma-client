import { Input } from 'shared/ui/input';
import { TextArea } from 'shared/ui/text-area';
import { Button } from 'shared/ui/button';
import { useMutation } from 'react-query';
import { AxiosError } from 'axios';
import { AxiosErrorResponseData, GuideRegistrationFormData } from 'shared/utils/types';
import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { guideRegistrationFormSchema } from 'shared/utils/validations/guide-registration-form-schema';
import { GuidePermissionService } from 'shared/services/guide-permission-service';
import { useUserProfile } from 'shared/utils/hooks/use-user-profile';

export const GuideRegistrationForm = () => {
  const { data: userProfileData } = useUserProfile();
  const { mutate: registerGuide, isLoading } = useMutation(GuidePermissionService.createRequest, {
    onSuccess: () => {
      toast.success('Запит на отримання статусу гіда успішно створенно!');
    },
    onError: (error: AxiosError<AxiosErrorResponseData>) => {
      toast.error(error.response?.data.message);
    },
  });
  const { register, handleSubmit } = useForm<GuideRegistrationFormData>({
    values: userProfileData
      ? {
          firstName: userProfileData?.profile.firstName,
          lastName: userProfileData?.profile.lastName,
          email: userProfileData?.email,
          phone: userProfileData?.phone,
          description: '',
        }
      : undefined,
    resolver: zodResolver(guideRegistrationFormSchema),
  });

  const onValid = (data: GuideRegistrationFormData) => registerGuide(data);

  return (
    <div id='guide-registration' className='w-full max-w-3xl'>
      <h6 className='my-16 text-center text-3xl font-bold text-neutral-800'>Реєстрація гіда</h6>
      <div className='flex flex-col items-center gap-y-5'>
        <div className='flex w-full gap-x-5'>
          <Input placeholder="Ім'я" {...register('firstName')} />
          <Input placeholder='Прізвище' {...register('lastName')} />
        </div>
        <div className='flex w-full gap-x-5'>
          <Input placeholder='E-mail' {...register('email')} />
          <Input placeholder='Телефон' {...register('phone')} />
        </div>
        <TextArea
          placeholder='Про себе (хобі, досвід роботи)'
          rows={5}
          {...register('description')}
        />
        <Button variant='primary' disabled={isLoading} onClick={handleSubmit(onValid)}>
          Відправити заявку
        </Button>
      </div>
    </div>
  );
};

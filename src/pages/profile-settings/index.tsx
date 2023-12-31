import { useUserProfile } from 'shared/utils/hooks/use-user-profile';
import { useState } from 'react';
import { Button } from 'shared/ui/button';
import NoPhotographyOutlinedIcon from '@mui/icons-material/NoPhotographyOutlined';
import { Input } from 'shared/ui/input';
import { AxiosErrorResponseData, UserProfileFormData } from 'shared/utils/types';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { UserProfileFormSchema } from 'shared/utils/validations/user-profile-form-schema';
import { useMutation, useQueryClient } from 'react-query';
import { AccountService } from 'shared/services';
import { toast } from 'react-toastify';
import { endpoints } from 'shared/utils/constants';
import { createFormData } from 'pages/profile-settings/utils';
import { ProfileEditFieldData } from 'pages/profile-settings/types';
import { AxiosError } from 'axios';
import {ImageInput} from "shared/ui/image-input";

export const ProfileSettings = () => {
  const [currentImage, setCurrentImage] = useState<File | null>(null);
  const [isEditMode, setIsEditMode] = useState(false);

  const queryClient = useQueryClient();
  const { data } = useUserProfile();
  const { register, reset, setValue, handleSubmit } = useForm<UserProfileFormData>({
    values: data
      ? {
          firstName: data.profile.firstName,
          lastName: data.profile.lastName,
          email: data.email,
          phone: data.phone,
          profilePicture: data.profile.profilePicture,
        }
      : undefined,
    resolver: zodResolver(UserProfileFormSchema),
  });
  const { mutate: updateUserProfile, isLoading } = useMutation(AccountService.updateUserProfile, {
    onSuccess: () => {
      toast.success('Профіль успішно оновлено!');
      setIsEditMode(false);
      reset();
      setCurrentImage(null);
      return queryClient.invalidateQueries({ queryKey: endpoints.account.profile });
    },
    onError: (error: AxiosError<AxiosErrorResponseData>) => {
      toast.error(error.response?.data.message);
    },
  });

  const fields: ProfileEditFieldData[] = [
    {
      key: 'firstName',
      label: "Ім'я",
      value: data?.profile.firstName,
    },
    {
      key: 'lastName',
      label: 'Прізвище',
      value: data?.profile.lastName,
    },
    {
      key: 'email',
      label: 'Електрона пошта',
      value: data?.email,
    },
    {
      key: 'phone',
      label: 'Номер телефону',
      value: data?.phone,
    },
  ];

  const enableEditMode = () => setIsEditMode(true);

  const disableEditMode = () => {
    setIsEditMode(false);
  };

  const deleteProfileImage = () => setValue('profilePicture', '');

  const onValid = (data: UserProfileFormData) => {
    updateUserProfile(createFormData(data, currentImage));
  };

  return (
    <div className='flex flex-col gap-x-14 gap-y-5 md:flex-row'>
      {!isEditMode ? (
        <div className='relative aspect-square w-full md:w-96'>
          {data?.profile.profilePicture ? (
            <img
              className='h-full w-full rounded-2xl object-cover'
              src={data?.profile.profilePicture}
              alt='Profile avatar'
            />
          ) : (
            <div className='flex aspect-square w-full flex-col items-center justify-center rounded-2xl border-2 border-dashed border-zinc-300 object-cover text-gray-500 md:w-96'>
              <div className='flex h-full flex-col items-center justify-center pb-6 pt-5 text-gray-500'>
                <NoPhotographyOutlinedIcon style={{ fontSize: 60 }} color='inherit' />
              </div>
            </div>
          )}
        </div>
      ) : (
        <ImageInput
          defaultValue={data?.profile.profilePicture || ''}
          onChange={setCurrentImage}
          onProfileImageDelete={deleteProfileImage}
        />
      )}
      <div className='flex-1'>
        <h6 className='mb-4 text-xl font-semibold'>Контактна інформація</h6>
        <div className='divide-y divide-neutral-200'>
          {fields.map((field) => (
            <div
              className={`flex items-center justify-between ${isEditMode ? 'py-2' : 'py-4'}`}
              key={field.key}
            >
              <p>{field.label}:</p>
              {isEditMode ? (
                <Input
                  inputClassName='px-4 py-2'
                  className='min-w-16 w-1/4 '
                  {...register(field.key)}
                />
              ) : (
                <p>{field.value}</p>
              )}
            </div>
          ))}
        </div>
        <p className='text-xs text-neutral-400'>
          Ваша контактна інформація відображається лише після підтвердження бронювання, щоб з вами
          можна було зв'язатися.
        </p>
        <div className='mt-4 flex justify-end gap-x-2'>
          {isEditMode ? (
            <>
              <Button variant='secondary' onClick={disableEditMode}>
                Скасувати
              </Button>
              <Button variant='primary' onClick={handleSubmit(onValid)} disabled={isLoading}>
                Зберегти
              </Button>
            </>
          ) : (
            <Button variant='secondary' onClick={enableEditMode}>
              Редагувати профіль
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

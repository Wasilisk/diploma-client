import { PasswordInput } from 'shared/ui/password-input';
import { Button } from 'shared/ui/button';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from 'react-query';
import { AuthService } from 'shared/services';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { PasswordResetFormData } from 'shared/utils/types';
import { PasswordResetFormSchema } from 'shared/utils/validations/password-reset-form-schema';
import { toast } from 'react-toastify';

export const PasswordResetForm = () => {
  const { token } = useParams();
  const navigate = useNavigate();

  const { mutate: resetPassword, isLoading } = useMutation(
    (data: PasswordResetFormData) => AuthService.resetPassword(token!, data),
    {
      onSuccess: () => {
        navigate('/login');
        toast.success('Пароль успішно змінено !');
      },
    },
  );

  const { register, handleSubmit } = useForm<PasswordResetFormData>({
    resolver: zodResolver(PasswordResetFormSchema),
  });

  useEffect(() => {
    token && AuthService.checkResetPasswordToken(token).catch(() => navigate('/'));
  }, []);
  const onValid = (data: PasswordResetFormData) => {
    resetPassword(data);
  };

  return (
    <form className='space-y-3'>
      <PasswordInput placeholder='Новий пароль' {...register('password')} />
      <PasswordInput placeholder='Підтвердіть пароль' {...register('confirmPassword')} />
      <Button variant='primary' fullWidth onClick={handleSubmit(onValid)} disabled={isLoading}>
        Скинути пароль
      </Button>
    </form>
  );
};

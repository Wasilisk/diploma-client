import { Input } from 'shared/ui/input';
import { PasswordInput } from 'shared/ui/password-input';
import { Button } from 'shared/ui/button';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { RegistrationFormSchema } from 'shared/utils/validations/registration-form-schema';
import { useRef } from 'react';
import { ReCAPTCHA } from 'react-google-recaptcha';
import { useMutation } from 'react-query';
import { AuthService } from 'shared/services';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { AxiosErrorResponseData, RegistrationFormData } from 'shared/utils/types';
import { AxiosError } from 'axios';

export const RegistrationForm = () => {
  const navigate = useNavigate();
  const { mutate: registerUser, isLoading } = useMutation(AuthService.signup, {
    onSuccess: () => {
      navigate('/login');
      toast.success('Ваш акаунт успішно створено !');
    },
    onError: (error: AxiosError<AxiosErrorResponseData>) => {
      toast.error(error.response?.data.message);
    },
  });
  const captchaRef = useRef<ReCAPTCHA | null>(null);
  const { register, handleSubmit } = useForm<RegistrationFormData>({
    resolver: zodResolver(RegistrationFormSchema),
  });

  const onValid = async (data: RegistrationFormData) => {
    const token = captchaRef.current?.getValue();
    if (token) {
      try {
        await AuthService.verifyCaptcha(token);
        registerUser(data);
      } catch {
        toast.error('Помилки при валідації токена !');
      }
    }
  };

  return (
    <form className='flex flex-col gap-y-3'>
      <div className='flex flex-col gap-3 sm:flex-row'>
        <Input placeholder="Ім'я" {...register('firstName')} />
        <Input placeholder='Прізвище' {...register('lastName')} />
      </div>
      <Input placeholder='E-mail' {...register('email')} />
      <Input placeholder='Телефон' {...register('phone')} />
      <PasswordInput placeholder='Пароль' {...register('password')} />
      <PasswordInput placeholder='Повторіть пароль' {...register('confirmPassword')} />
      <ReCAPTCHA sitekey={import.meta.env.VITE_RECAPTCHA_KEY} ref={captchaRef} />
      <Button variant='primary' fullWidth onClick={handleSubmit(onValid)} disabled={isLoading}>
        Зареєструватись
      </Button>
    </form>
  );
};

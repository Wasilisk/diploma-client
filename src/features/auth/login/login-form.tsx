import { Input } from 'shared/ui/input';
import { PasswordInput } from 'shared/ui/password-input';
import { Button } from 'shared/ui/button';
import { LoginFormSchema } from 'shared/utils/validations/login-form-schema';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { StyledLink } from 'shared/ui/styled-link';
import { useNavigate } from 'react-router-dom';
import { useMutation } from 'react-query';
import { AuthService } from 'shared/services';
import { toast } from 'react-toastify';
import { AxiosError } from 'axios';
import { AxiosErrorResponseData, LoginFormData } from 'shared/utils/types';

export const LoginForm = () => {
  const navigate = useNavigate();
  const { mutate: loginUser, isLoading } = useMutation(AuthService.login, {
    onSuccess: () => {
      navigate('/');
    },
    onError: (error: AxiosError<AxiosErrorResponseData>) => {
      toast.error(error.response?.data.message);
    },
  });
  const { register, handleSubmit } = useForm<LoginFormData>({
    resolver: zodResolver(LoginFormSchema),
  });

  const onValid = (data: LoginFormData) => loginUser(data);

  return (
    <form>
      <div className='space-y-3'>
        <Input placeholder='Email' {...register('email')} />
        <PasswordInput placeholder='Password' {...register('password')} />
      </div>
      <div className='mb-6 mt-2 flex flex-wrap justify-between'>
        <div className='text-center text-sm'>
          Забули пароль?{' '}
          <StyledLink to='/password-reset' native>
            Відновіть його
          </StyledLink>
        </div>
      </div>
      <Button variant='primary' fullWidth onClick={handleSubmit(onValid)} disabled={isLoading}>
        Війти
      </Button>
    </form>
  );
};

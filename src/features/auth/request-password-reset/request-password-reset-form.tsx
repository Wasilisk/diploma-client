import { Input } from 'shared/ui/input';
import { Button } from 'shared/ui/button';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { RequestPasswordResetFormSchema } from 'shared/utils/validations/request-password-reset-form-schema';
import { useMutation } from 'react-query';
import { toast } from 'react-toastify';
import { AuthService } from 'shared/services';

type ResetPasswordFormData = z.infer<typeof RequestPasswordResetFormSchema>;

export const RequestPasswordResetForm = () => {
  const { mutate: sendResetPasswordRequest, isLoading } = useMutation(
    AuthService.resetPasswordRequest,
    {
      onSuccess: () => {
        toast.success(
          'Якщо для цієї адреси електронної пошти існує обліковий запис, ми надішлемо вам електронною поштою' +
            ' інструкції зі зміни пароля',
        );
      },
    },
  );

  const { register, handleSubmit } = useForm<ResetPasswordFormData>({
    resolver: zodResolver(RequestPasswordResetFormSchema),
  });

  const onValid = (data: ResetPasswordFormData) => sendResetPasswordRequest(data);

  return (
    <form className='space-y-3'>
      <Input placeholder='E-mail' {...register('email')} />
      <Button variant='primary' fullWidth disabled={isLoading} onClick={handleSubmit(onValid)}>
        Надіслати запит
      </Button>
    </form>
  );
};

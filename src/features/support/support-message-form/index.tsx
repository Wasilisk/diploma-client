import { Input } from 'shared/ui/input';
import { TextArea } from 'shared/ui/text-area';
import { Button } from 'shared/ui/button';
import { useMutation } from 'react-query';
import { SupportMessagesService } from 'shared/services';
import { AxiosError } from 'axios';
import { AxiosErrorResponseData } from 'shared/utils/types';
import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { SupportMessageFormData } from 'shared/utils/types';
import { SupportMessageFormSchema } from 'shared/utils/validations/support-message-form-schema';

export const SupportMessageForm = () => {
  const { mutate: sendMessage, isLoading } = useMutation(
    SupportMessagesService.createNewSupportMessage,
    {
      onSuccess: () => {
        toast.success('Ваше повідомлення успішно відправлено!');
      },
      onError: (error: AxiosError<AxiosErrorResponseData>) => {
        toast.error(error.response?.data.message);
      },
    },
  );
  const { register, handleSubmit } = useForm<SupportMessageFormData>({
    resolver: zodResolver(SupportMessageFormSchema),
  });

  const onValid = (data: SupportMessageFormData) => sendMessage(data);

  return (
    <form className='flex flex-col gap-y-6 rounded-2xl border border-gray-200 p-5 md:p-10'>
      <div className='flex flex-col gap-y-4'>
        <label>Тема повідомлення</label>
        <Input placeholder='Наприклад: не пройшла оплата' {...register('subject')} />
      </div>
      <div className='flex flex-col gap-y-4'>
        <label>Повідомлення</label>
        <TextArea placeholder='Опишіть вашу проблему' rows={5} {...register('content')} />
      </div>
      <div className='text-xs text-neutral-400'>
        Зазвичай, ми відповідаємо протягом 24 годин після обробки запиту.
      </div>
      <Button variant='primary' rounded disabled={isLoading} onClick={handleSubmit(onValid)}>
        Відправити
      </Button>
    </form>
  );
};

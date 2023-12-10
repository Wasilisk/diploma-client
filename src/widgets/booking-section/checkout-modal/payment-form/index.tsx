import { Input } from 'shared/ui/input';
import { Button } from 'shared/ui/button';
import { PaymentService } from 'shared/services';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { PaymentFormSchema } from 'shared/utils/validations/payment-form-schema';
import { PaymentFormData } from 'shared/utils/types/orders.types';
import { useUserProfile } from 'shared/utils/hooks/use-user-profile';
import { toast } from 'react-toastify';
import { useBooking } from 'widgets/booking-section/use-booking';

export const PaymentForm = () => {
  const { orderInfo, tickets, getTotalTicketsPrice } = useBooking();
  const { data } = useUserProfile();
  const {
    register,
    formState: { isValid },
  } = useForm<PaymentFormData>({
    reValidateMode: 'onChange',
    resolver: zodResolver(PaymentFormSchema),
    defaultValues: {
      username: data?.profile ? `${data.profile.firstName} ${data.profile.lastName}` : '',
      phone: data?.phone,
    },
  });

  const totalPrice = getTotalTicketsPrice();
  const prepayment = totalPrice * 0.1;

  const handleSubmit = async () => {
    if (!orderInfo || !tickets) return;
    await PaymentService.submitOrders({
      tourId: orderInfo.tourId,
      date: new Date(orderInfo.date).toISOString(),
      time: '12:00',
      orders: Object.entries(tickets).map(([ticketTypeId, count]) => ({
        ticketTypeId: Number(ticketTypeId),
        count,
      })),
    })
      .then((response) => {
        window.location.href = response.data.url;
      })
      .catch(() => {
        toast.error('Помилка під час оплати !');
      });
  };

  return (
    <div className='mt-10 flex flex-col gap-x-10 rounded-2xl border border-zinc-100 p-4  md:flex-row md:px-10 md:py-8'>
      <div className='flex flex-1 flex-col gap-y-5'>
        <div className='space-y-2'>
          <p className='text-left'>Як вас звати</p>
          <Input
            placeholder='Введіть ваше ім`я'
            className='rounded-full'
            {...register('username')}
          />
        </div>
        <div className='space-y-2'>
          <p className='text-left'>Контактний телефон</p>
          <Input
            placeholder='+3 (___) ___ - __ - __'
            className='rounded-full'
            {...register('phone')}
          />
        </div>
        <Button variant='primary' fullWidth rounded onClick={handleSubmit} disabled={!isValid}>
          Внести передоплату {prepayment} грн
        </Button>
      </div>
      <div className='mt-8 flex flex-1 flex-col justify-between gap-y-2 rounded-2xl bg-neutral-100 px-8 py-6'>
        <div className='space-y-1'>
          <div className='flex flex-col justify-between sm:flex-row'>
            <p className='font-normal leading-relaxed text-neutral-800'>Загальна вартість:</p>
            <p className='font-bold leading-relaxed text-neutral-800'>{totalPrice} грн</p>
          </div>
          <div className='flex flex-col justify-between sm:flex-row'>
            <p className='font-normal leading-relaxed text-neutral-800'>Оплата на місці:</p>
            <p className='font-bold leading-relaxed text-neutral-800'>
              {totalPrice - prepayment} грн
            </p>
          </div>
        </div>
        <div className='flex flex-col justify-between sm:flex-row'>
          <p className='font-bold leading-relaxed text-neutral-800'>До оплати зараз</p>
          <p className='font-bold leading-relaxed text-neutral-800'>{prepayment} грн</p>
        </div>
      </div>
    </div>
  );
};

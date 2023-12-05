import { Input } from 'shared/ui/input';
import { Button } from 'shared/ui/button';
import { PaymentService } from 'shared/services';
import { useBasket } from 'widgets/basket/use-basket';
import { TicketInfo } from 'shared/utils/types/ticket';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { PaymentFormSchema } from 'shared/utils/validations/payment-form-schema';
import { PaymentFormData } from 'shared/utils/types/orders.types';
import { useUserProfile } from 'shared/utils/hooks/use-user-profile';
import { toast } from 'react-toastify';

export const PaymentForm = () => {
  const { calculateTotalPrice, tickets, resetBasket } = useBasket();
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

  const totalPrice = calculateTotalPrice();
  const prepayment = totalPrice * 0.2;

  const parseTickets = (tickets: Record<string, TicketInfo & { count: number }>) => {
    return Object.values(tickets).map((ticket) => ({
      tourId: ticket.tour.id,
      ticketTypeId: ticket.id,
      count: ticket.count,
      price: ticket.price,
      date: new Date(ticket.date).toISOString(),
    }));
  };

  const handleSubmit = async () => {
    await PaymentService.submitOrders(parseTickets(tickets))
      .then((response) => {
        window.location.href = response.data.url;
        resetBasket();
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

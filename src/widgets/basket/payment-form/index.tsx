import { Input } from 'shared/ui/input';

type PaymentForm = {
  totalPrice: number;
};
export const PaymentForm = ({ totalPrice }: PaymentForm) => {
  const prepayment = totalPrice * 0.2;
  return (
    <div className='mt-10 flex gap-x-10 rounded-2xl border border-zinc-100 px-10 py-8'>
      <div className='flex flex-1 flex-col gap-y-5'>
        <div className='space-y-2'>
          <p className='text-left'>Як вас звати</p>
          <Input placeholder='Введіть ваше ім`я' className='rounded-full' />
        </div>
        <div className='space-y-2'>
          <p className='text-left'>Контактний телефон</p>
          <Input placeholder='+3 (___) ___ - __ - __' className='rounded-full' />
        </div>
      </div>
      <div className='mt-8 flex flex-1 flex-col justify-between rounded-2xl bg-neutral-100 px-8 py-6'>
        <div className='space-y-1'>
          <div className='flex justify-between'>
            <p className='font-normal leading-relaxed text-neutral-800'>Загальна вартість:</p>
            <p className='font-bold leading-relaxed text-neutral-800'>{totalPrice} грн</p>
          </div>
          <div className='flex justify-between'>
            <p className='font-normal leading-relaxed text-neutral-800'>Оплата на місці:</p>
            <p className='font-bold leading-relaxed text-neutral-800'>
              {totalPrice - prepayment} грн
            </p>
          </div>
        </div>
        <div className='flex justify-between'>
          <p className='font-bold leading-relaxed text-neutral-800'>До оплати зараз</p>
          <p className='font-bold leading-relaxed text-neutral-800'>{prepayment} грн</p>
        </div>
      </div>
    </div>
  );
};

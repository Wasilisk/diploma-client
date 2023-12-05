import { SuccessPaymentImage } from 'shared/assets/success-payment-image';

export const SuccessPayment = () => {
  return (
    <div className='my-10 flex flex-1 flex-col items-center justify-center'>
      <SuccessPaymentImage />
      <h6 className='text-center  text-3xl font-bold leading-10 text-neutral-800'>
        Дякуємо, що забронювали екскурсію !
      </h6>
      <p className='mt-5 text-center leading-loose text-neutral-800'>
        В найближчий час з Вами зв'яжеться гід.
      </p>
    </div>
  );
};

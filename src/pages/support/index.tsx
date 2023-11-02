import { SupportMessageForm } from 'features/support/support-message-form';

export const Support = () => {
  return (
    <>
      <p className='text-xl font-bold text-neutral-800'>Запит в техпідтримку</p>
      <SupportMessageForm />
    </>
  );
};

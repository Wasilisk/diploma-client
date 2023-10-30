import { TextArea } from '@src/shared/ui/text-area';
import { Button } from 'shared/ui/button';
import { Input } from 'shared/ui/input';

export const Support = () => {
  return (
    <>
      <p className='text-xl font-bold text-neutral-800'>Запит в техпідтримку</p>
      <div className='flex flex-col gap-y-6 rounded-2xl border border-gray-200 p-5 md:p-10'>
        <div className='flex flex-col gap-y-4'>
          <label>Тема повідомлення</label>
          <Input placeholder='Наприклад: не пройшла оплата' />
        </div>
        <div className='flex flex-col gap-y-4'>
          <label>Повідомлення</label>
          <TextArea placeholder='Опишіть вашу проблему' rows={5} />
        </div>
        <div className='text-xs text-neutral-400'>
          Зазвичай, ми відповідаємо протягом 24 годин після обробки запиту.
        </div>
        <Button variant='primary' rounded>
          Відправити
        </Button>
      </div>
    </>
  );
};

export const ProfileSettings = () => {
  const fields = [
    {
      label: "Ім'я",
      value: 'Василь',
    },
    {
      label: 'Прізвище',
      value: 'Петрина',
    },
    {
      label: 'Електрона пошта',
      value: 'vasyl.petryna@gmail.com',
    },
    {
      label: 'Номер телефону',
      value: '+ 380 741 32 413',
    },
  ];
  return (
    <div className='flex flex-col gap-x-14 gap-y-5 md:flex-row'>
      <img
        className='aspect-square w-full rounded-2xl object-cover md:w-96'
        src='https://www.thestatesman.com/wp-content/uploads/2021/10/f3739843f5001109ed90e7c05b34fb5f.jpg'
        alt='Profile avatar'
      />
      <div className='w-full'>
        <h6 className='mb-4 text-xl font-semibold'>Контактна інформація</h6>
        <div className='divide-y divide-neutral-200'>
          {fields.map((field) => (
            <div className='flex justify-between py-4' key={field.label}>
              <p>{field.label}:</p>
              <p>{field.value}</p>
            </div>
          ))}
        </div>
        <span className='text-xs text-neutral-400'>
          Ваша контактна інформація відображається лише після підтвердження бронювання, щоб з вами
          можна було зв'язатися.
        </span>
      </div>
    </div>
  );
};

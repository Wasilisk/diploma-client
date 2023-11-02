import { useUserProfile } from 'shared/utils/hooks/use-user-profile';

export const ProfileSettings = () => {
  const { data } = useUserProfile();
  const fields = [
    {
      label: "Ім'я",
      value: data?.profile.firstName,
    },
    {
      label: 'Прізвище',
      value: data?.profile.lastName,
    },
    {
      label: 'Електрона пошта',
      value: data?.email,
    },
    {
      label: 'Номер телефону',
      value: data?.phone,
    },
  ];
  return (
    <div className='flex flex-col gap-x-14 gap-y-5 md:flex-row'>
      <img
        className='aspect-square w-full rounded-2xl object-cover md:w-96'
        src={data?.profile.profilePicture}
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

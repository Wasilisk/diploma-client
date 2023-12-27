import { SearchFilter } from 'shared/ui/filters/search-filter';
import { SelectorFilter } from 'shared/ui/filters';
import { Role } from 'shared/utils/types';
import { useUserFilters } from 'features/user-management/user-filters/use-user-filters';

export const UserFilters = () => {
  const { firstName, lastName, email, role, setFirstName, setLastName, setEmail, setRole } =
    useUserFilters();
  return (
    <div className='mb-4 flex flex-wrap items-center gap-x-8 gap-y-2 border-y border-zinc-100 py-2'>
      <div className='font-medium leading-relaxed text-zinc-700'>Фільтри:</div>
      <SearchFilter label="Ім'я" value={firstName} onChange={setFirstName} placeholder='Пошук...' />
      <SearchFilter
        label='Прізвище'
        value={lastName}
        onChange={setLastName}
        placeholder='Пошук...'
      />
      <SearchFilter label='Емейл' value={email} onChange={setEmail} placeholder='Пошук...' />
      <SelectorFilter
        value={role}
        onChange={setRole}
        label='Роль'
        placeholder='Усі ролі'
        items={Object.values(Role)}
        renderItemValue={(item) => item}
      />
    </div>
  );
};

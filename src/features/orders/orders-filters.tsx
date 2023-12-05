interface OrdersFiltersProps {
  activeFilter: string;
  onChange: (filter: string) => void;
}

const filtersLocalization: Record<string, string> = {
  ALL: 'Всі',
  ACTIVE: 'Активні',
  COMPLETED: 'Завершені',
  CANCELED: 'Відмінені',
};

const filters = ['ALL', 'ACTIVE', 'COMPLETED', 'CANCELED'];
export const OrdersFilters = ({ activeFilter, onChange }: OrdersFiltersProps) => {
  return (
    <div className='flex gap-x-4'>
      {filters.map((filter, index) => (
        <div
          key={index}
          className={`${
            activeFilter === filter && 'bg-yellow-400 font-semibold'
          } cursor-pointer rounded-2xl px-3 py-1`}
          onClick={() => onChange(filter)}
        >
          {filtersLocalization[filter]}
        </div>
      ))}
    </div>
  );
};

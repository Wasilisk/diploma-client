import { useState } from 'react';

export const OrdersFilters = () => {
  const filters = ['Всі', 'Активні', 'Завершені'];

  const [activeFilter, setActiveFilter] = useState('Всі');

  const handleFilterClick = (filter: string) => {
    setActiveFilter(filter);
  };

  return (
    <div className='flex gap-x-4'>
      {filters.map((filter) => (
        <div
          className={`${
            activeFilter === filter && 'bg-yellow-400 font-semibold'
          } cursor-pointer rounded-2xl px-3 py-1`}
          onClick={() => handleFilterClick(filter)}
        >
          {filter}
        </div>
      ))}
    </div>
  );
};

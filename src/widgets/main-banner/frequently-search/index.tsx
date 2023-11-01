import { Chip } from 'shared/ui/chip';
import { useDirections } from 'shared/utils/hooks/use-directions';
import { endpoints } from 'shared/utils/constants';

export const FrequentlySearch = () => {
  const { data: directions } = useDirections();
  return (
    <div className='mb-6 mt-14 flex flex-wrap items-center justify-center gap-x-4 sm:mt-28'>
      <p className='text-sm font-medium'>Часто шукають:</p>
      {directions?.map((direction) => (
        <Chip
          key={direction.id}
          label={direction.name}
          to={`${endpoints.directions}/${direction.id}`}
        />
      ))}
    </div>
  );
};

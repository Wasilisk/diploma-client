import { Chip } from 'shared/ui/chip';
import { useDirections } from 'shared/utils/hooks/use-directions';
import { endpoints } from 'shared/utils/constants';
import { isEmpty } from 'shared/utils/libs';

export const FrequentlySearch = () => {
  const { data: directions, isLoading } = useDirections();

  return (
    <div className='mb-6 mt-14 flex flex-wrap items-center justify-center gap-x-2 gap-y-2 sm:mt-28 sm:gap-x-4'>
      {!(isLoading || isEmpty(directions)) && (
        <>
          <p className='text-sm font-medium'>Часто шукають:</p>
          {directions
            ?.slice(0, 6)
            .map((direction) => (
              <Chip
                key={direction.id}
                label={direction.name}
                to={`${endpoints.directions}/${direction.id}`}
              />
            ))}
        </>
      )}
    </div>
  );
};

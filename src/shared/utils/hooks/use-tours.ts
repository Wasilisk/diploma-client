import { useQuery } from 'react-query';
import { endpoints } from 'shared/utils/constants';
import { ToursService } from 'shared/services/tours-service';
import { GetToursParams } from 'shared/utils/types';
import { useDebounce } from '@uidotdev/usehooks';

export const useTours = (params: GetToursParams) => {
  const searchParams = useDebounce(params, 500);
  return useQuery(
    [endpoints.tours, searchParams],
    async () => {
      const response = await ToursService.getAll(params);
      return response.data;
    },
    {
      retry: false,
    },
  );
};

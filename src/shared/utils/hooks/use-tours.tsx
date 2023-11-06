import { useQuery } from 'react-query';
import { endpoints } from 'shared/utils/constants';
import { ToursService } from 'shared/services/tours-service';
import { GetToursParams } from 'shared/utils/types';

export const useTours = (params: GetToursParams) => {
  return useQuery(
    [endpoints.tours, params],
    async () => {
      const response = await ToursService.getAll(params);
      return response.data;
    },
    {
      retry: false,
    },
  );
};

import { useQuery } from 'react-query';
import { endpoints } from 'shared/utils/constants';
import { ToursService } from 'shared/services/tours-service';
import { GetToursParams } from 'shared/utils/types';
import {useDebounce} from "shared/utils/hooks/use-debounce";

export const useTours = (params?: GetToursParams) => {
    console.log('params', params)
  const searchParams = useDebounce(params, 500);
  return useQuery(
    [endpoints.tours, searchParams],
    async () => {
      const response = await ToursService.getAll(params!);
      return response.data;
    },
    {
      enabled: !!params,
      retry: false,
    },
  );
};

import { useQuery } from 'react-query';
import { endpoints } from 'shared/utils/constants';
import { ToursService } from 'shared/services/tours-service';

export const useTour = (tourId?: number) => {
  return useQuery(
    [endpoints.tours, tourId],
    async () => {
      const response = await ToursService.getById(tourId!);
      return response.data;
    },
    {
      enabled: !!tourId,
    },
  );
};

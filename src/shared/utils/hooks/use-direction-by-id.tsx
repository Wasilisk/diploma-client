import { useQuery } from 'react-query';
import { endpoints } from 'shared/utils/constants';
import { DirectionsService } from 'shared/services/directions-service';

export const useDirectionById = (directionId?: number) => {
  return useQuery(
    [endpoints.directions, directionId],
    async () => {
      const response = await DirectionsService.getById(directionId!);
      return response.data;
    },
    {
      enabled: !!directionId,
    },
  );
};

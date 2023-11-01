import { useQuery } from 'react-query';
import { endpoints } from 'shared/utils/constants';
import { DirectionsService } from 'shared/services/directions-service';

export const useDirections = () => {
  return useQuery(endpoints.directions, async () => {
    const response = await DirectionsService.getAll();
    return response.data;
  });
};

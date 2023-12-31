import { useQuery } from 'react-query';
import { endpoints } from 'shared/utils/constants';
import { DirectionsService } from 'shared/services/directions-service';
import {GetAllDirectionsParams} from "shared/utils/types";

export const useDirections = (params: GetAllDirectionsParams) => {
  return useQuery([endpoints.directions, params], async () => {
    const response = await DirectionsService.getAll(params);
    return response.data;
  });
};

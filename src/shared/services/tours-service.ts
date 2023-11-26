import { $api } from 'shared/configs/axios-config';
import { AxiosResponse } from 'axios';
import { endpoints } from 'shared/utils/constants';
import { Tour } from 'shared/utils/types/tours.types';
import { GetToursParams, PaginatedResource } from 'shared/utils/types';

export class ToursService {
  static async getAll({
    directionId,
    paginationParams,
  }: GetToursParams): Promise<AxiosResponse<PaginatedResource<Tour>>> {
    return $api.get(endpoints.tours, {
      params: {
        ...paginationParams,
        ...(directionId && { filter: `directionId:eq:${directionId}` }),
      },
    });
  }

  static async getById(tourId: number): Promise<AxiosResponse<Tour>> {
    return $api.get(`${endpoints.tours}/${tourId}`);
  }
}

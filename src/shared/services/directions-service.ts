import { $api } from 'shared/configs/axios-config';
import { AxiosResponse } from 'axios';
import { Direction, DirectionWithTours } from 'shared/utils/types/directions.types';
import { endpoints } from 'shared/utils/constants';
import { GetAllDirectionsParams, PaginatedResource } from 'shared/utils/types';
import { parseParams } from 'shared/utils/libs/parse-params';

export class DirectionsService {
  static async create(data: FormData) {
    return $api.post(endpoints.directions, data);
  }

  static async update(data: FormData) {
    return $api.put(endpoints.directions, data);
  }

  static async delete(directionId: number) {
    return $api.delete(`${endpoints.directions}/${directionId}`);
  }

  static async getAll(
    params: GetAllDirectionsParams,
  ): Promise<AxiosResponse<PaginatedResource<Direction>>> {
    return $api.get(endpoints.directions, {
      params: {
        ...params.paginationParams,
        filter: parseParams(params.filter),
        sort: parseParams(params.sort),
      },
    });
  }

  static async getById(directionId: number): Promise<AxiosResponse<DirectionWithTours>> {
    return $api.get(`${endpoints.directions}/${directionId}`);
  }
}

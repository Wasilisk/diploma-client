import { $api } from 'shared/configs/axios-config';
import { AxiosResponse } from 'axios';
import { Direction, DirectionWithTours } from 'shared/utils/types/directions.types';
import { endpoints } from 'shared/utils/constants';

export class DirectionsService {
  static async getAll(): Promise<AxiosResponse<Direction[]>> {
    return $api.get(endpoints.directions);
  }

  static async getById(directionId: number): Promise<AxiosResponse<DirectionWithTours>> {
    return $api.get(`${endpoints.directions}/${directionId}`);
  }
}

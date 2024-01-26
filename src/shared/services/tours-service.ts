import { $api } from 'shared/configs/axios-config';
import { AxiosResponse } from 'axios';
import { endpoints } from 'shared/utils/constants';
import { Tour } from 'shared/utils/types/tours.types';
import {
  AddTicketTypesData, AddTourData,
  AddTourScheduleData,
  GetToursParams,
  PaginatedResource, UpdateTicketTypesData, UpdateTourData, UpdateTourScheduleData,
} from 'shared/utils/types';
import {parseParams} from "shared/utils/libs/parse-params";

export class ToursService {
  static async getAll({
    filters,
    paginationParams,
  }: GetToursParams): Promise<AxiosResponse<PaginatedResource<Tour>>> {
    return $api.get(endpoints.tours, {
      params: {
        ...paginationParams,
        filter: parseParams(filters),
      },
    });
  }

  static async getById(tourId: number): Promise<AxiosResponse<Tour>> {
    return $api.get(`${endpoints.tours}/${tourId}`);
  }

  static async create(data: AddTourData): Promise<AxiosResponse<Omit<Tour, 'schedule' | 'ticketTypes'>>> {
    return $api.post(endpoints.tours, data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  }

  static async update(data: UpdateTourData): Promise<AxiosResponse<Omit<Tour, 'schedule' | 'ticketTypes'>>> {
    return $api.patch(endpoints.tours, data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  }

  static async addSchedule(data: AddTourScheduleData) {
    return $api.post(endpoints.tourSchedule, data);
  }

  static async updateSchedule(data: UpdateTourScheduleData) {
    return $api.patch(endpoints.tourSchedule, data);
  }

  static async addTicketTypes(data: AddTicketTypesData[]) {
    return $api.post(endpoints.ticketTypes, data);
  }

  static async updateTicketTypes(data: UpdateTicketTypesData[]) {
    return $api.patch(endpoints.ticketTypes, data);
  }

  static async delete(tourId: number) {
    return $api.delete(`${endpoints.tours}/${tourId}`);
  }
}

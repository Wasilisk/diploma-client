import { $api } from 'shared/configs/axios-config';
import { AxiosResponse } from 'axios';
import { endpoints } from 'shared/utils/constants';
import { GetOrdersParams, Order } from 'shared/utils/types/orders.types';
import { PaginatedResource } from 'shared/utils/types';

export class OrdersService {
  static async getUserOrders(
    params: GetOrdersParams,
  ): Promise<AxiosResponse<PaginatedResource<Order>>> {
    return $api.get(endpoints.orders, {
      params: {
        ...params.paginationParams,
        ...(params.status && { filter: `status:eq:${params.status}` }),
      },
    });
  }
}

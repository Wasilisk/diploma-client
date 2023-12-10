import { $api } from 'shared/configs/axios-config';
import { AxiosResponse } from 'axios';
import { endpoints } from 'shared/utils/constants';
import { OrderData } from 'shared/utils/types/orders.types';

export class PaymentService {
  static async submitOrders(orderData: OrderData): Promise<AxiosResponse<{ url: string }>> {
    return $api.post(endpoints.payment.createCheckoutSession, orderData);
  }
}

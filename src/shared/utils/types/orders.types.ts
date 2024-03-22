import { z } from 'zod';
import { PaymentFormSchema } from 'shared/utils/validations/payment-form-schema';
import { Tour, TourGroup } from 'shared/utils/types/tours.types';
import { TicketType } from 'shared/utils/types/ticket';
import { Direction } from 'shared/utils/types/directions.types';
import { PaginationParams } from 'shared/utils/types/pagination.types';
import {FullUserInfo} from 'shared/utils/types/account.types';

export interface GetOrdersParams {
  status?: string;
  paginationParams: PaginationParams;
}

export type OrderData = {
  tourId: number;
  date: string;
  time: string;
  orders: Array<{ ticketTypeId: number; count: number }>;
};

export type PaymentFormData = z.infer<typeof PaymentFormSchema>;

export type OrderStatusType = 'ACTIVE' | 'CANCELED' | 'COMPLETED';

export type Order = {
  id: number;
  count: number;
  status: OrderStatusType;
  date: Date;
  userId: number;
  tourId: number;
  ticketTypeId: number;
  tour: Tour & { direction: Direction };
  ticketType: TicketType;
  tourGroup: TourGroup;
  user: FullUserInfo;
};

export interface BookingOrderInfo {
  tourId: number | null;
  date: Date;
  time: string | null;
}

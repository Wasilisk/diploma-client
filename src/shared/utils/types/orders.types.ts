import { z } from 'zod';
import { PaymentFormSchema } from 'shared/utils/validations/payment-form-schema';

export type OrdersPayload = {
  orders: OrderData[];
};

export type OrderData = {
  tourId: number;
  ticketTypeId: number;
  count: number;
  date: string;
};

export type PaymentFormData = z.infer<typeof PaymentFormSchema>;

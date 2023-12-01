import { z } from 'zod';

export const PaymentFormSchema = z.object({
  username: z.string().min(3),
  phone: z.string().min(10),
});

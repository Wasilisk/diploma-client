import { z } from 'zod';

export const RequestPasswordResetFormSchema = z.object({
  email: z.string().email(),
});

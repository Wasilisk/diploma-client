import { z } from 'zod';

export const SupportMessageFormSchema = z.object({
  subject: z.string(),
  content: z.string(),
});

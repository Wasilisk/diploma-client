import { SupportMessageFormSchema } from 'shared/utils/validations/support-message-form-schema';
import { z } from 'zod';

export type SupportMessageFormData = z.infer<typeof SupportMessageFormSchema>;

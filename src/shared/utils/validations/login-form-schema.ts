import { z } from 'zod';
import { PasswordSchema } from 'shared/utils/validations/entities/password-schema';

export const LoginFormSchema = z.object({
  email: z.string().email(),
  password: PasswordSchema,
});

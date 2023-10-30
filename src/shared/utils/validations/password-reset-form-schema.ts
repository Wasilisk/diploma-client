import { z } from 'zod';
import { PasswordSchema } from 'shared/utils/validations/entities/password-schema';

export const PasswordResetFormSchema = z
  .object({
    password: PasswordSchema,
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });

import { z } from 'zod';
import { PasswordSchema } from 'shared/utils/validations/entities/password-schema';

export const RegistrationFormSchema = z
  .object({
    firstName: z.string(),
    lastName: z.string(),
    email: z.string().email(),
    password: PasswordSchema,
    phone: z.string(),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });

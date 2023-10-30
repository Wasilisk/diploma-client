import { z } from 'zod';

export const PasswordSchema = z.string().min(8);

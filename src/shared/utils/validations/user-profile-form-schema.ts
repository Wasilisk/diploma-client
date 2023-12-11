import { z } from 'zod';

export const UserProfileFormSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  phone: z.string(),
  email: z.string(),
  profilePicture: z.string(),
});

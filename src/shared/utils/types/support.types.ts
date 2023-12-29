import { SupportMessageFormSchema } from 'shared/utils/validations/support-message-form-schema';
import { z } from 'zod';
import { Profile, User } from 'shared/utils/types/account.types';

export type SupportMessageFormData = z.infer<typeof SupportMessageFormSchema>;

export enum SupportMessageStatus {
  ACTIVE = 'ACTIVE',
  RESOLVED = 'RESOLVED',
}

export type SupportMessage = {
  id: number;
  userId: number;
  subject: string;
  content: string;
  status: SupportMessageStatus;
  createdAt: string;
  user: Pick<User, 'id' | 'phone'> & { profile: Profile };
};

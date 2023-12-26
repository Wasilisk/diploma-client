import { UserProfileFormSchema } from 'shared/utils/validations/user-profile-form-schema';
import { z } from 'zod';

export enum Role {
  ADMIN = 'ADMIN',
  MODERATOR = 'MODERATOR',
  GUIDE = 'GUIDE',
  USER = 'USER',
}

export interface User {
  id: number;
  email: string;
  phone: string;
  createdAt: Date;
  updatedAt: Date;
  role: Role;
  isBanned: boolean;
}

export interface Profile {
  firstName: string;
  lastName: string;
  profilePicture: string;
}

export type FullUserInfo = User & {
  profile: Profile;
};

export type UserProfileFormData = z.infer<typeof UserProfileFormSchema>;

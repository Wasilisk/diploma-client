export interface User {
  id: number;
  email: string;
  phone: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Profile {
  firstName: string;
  lastName: string;
  profilePicture: string;
}

export type FullUserInfo = User & {
  profile: Profile;
};

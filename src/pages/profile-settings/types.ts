export type ProfileEditFields = 'firstName' | 'lastName' | 'email' | 'phone';

export type ProfileEditFieldData = {
  key: ProfileEditFields;
  label: string;
  value: string | undefined;
};

import { UserProfileFormData } from 'shared/utils/types';

export const createFormData = (data: UserProfileFormData, currentImage: File | null) => {
  const formData = new FormData();
  formData.append('firstName', data.firstName);
  formData.append('lastName', data.lastName);
  formData.append('email', data.email);
  formData.append('phone', data.phone);
  formData.append('profilePicture', data.profilePicture ?? '');

  if (currentImage) {
    formData.append('file', currentImage);
  }

  return formData;
};

import { useQuery } from 'react-query';
import { endpoints } from 'shared/utils/constants';
import { AccountService } from 'shared/services';

export const useUserProfile = () => {
  return useQuery(endpoints.account.profile, async () => {
    const response = await AccountService.getUserProfile();
    return response.data;
  });
};

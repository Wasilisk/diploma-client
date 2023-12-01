import { useQuery } from 'react-query';
import { endpoints } from 'shared/utils/constants';
import { AccountService } from 'shared/services';
import { useAuth } from 'shared/utils/hooks/use-auth';

export const useUserProfile = () => {
  const { isAuth } = useAuth();
  return useQuery(
    endpoints.account.profile,
    async () => {
      const response = await AccountService.getUserProfile();
      return response.data;
    },
    {
      enabled: isAuth,
    },
  );
};

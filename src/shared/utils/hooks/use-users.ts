import { GetAllUsersParams } from 'shared/utils/types';
import { useQuery } from 'react-query';
import { endpoints } from 'shared/utils/constants';
import { AccountService } from 'shared/services';
import { useDebounce } from 'shared/utils/hooks/use-debounce';

export const useUsers = (params: GetAllUsersParams) => {
  const searchParams = useDebounce(params.searchParams, 1000);
  return useQuery([endpoints.account.allUsers, params.paginationParams, searchParams], async () => {
    const response = await AccountService.getAllUsers(params);
    return response.data;
  });
};

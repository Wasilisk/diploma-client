import { PaginationParams } from 'shared/utils/types';
import { useQuery } from 'react-query';
import { endpoints } from 'shared/utils/constants';
import { AccountService } from 'shared/services';

export const useUsers = (paginationParams: PaginationParams) => {
  return useQuery(
    [endpoints.account.allUsers, paginationParams],
    async () => {
      const response = await AccountService.getAllUsers(paginationParams);
      return response.data;
    },
  );
};

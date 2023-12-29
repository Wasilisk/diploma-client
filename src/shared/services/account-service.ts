import { $api } from 'shared/configs/axios-config';
import { AxiosResponse } from 'axios';
import { endpoints } from 'shared/utils/constants';
import {
  ChangeUserRoleParams,
  FullUserInfo,
  GetAllUsersParams,
  PaginatedResource,
} from 'shared/utils/types';
import {parseParams} from "shared/utils/libs/parse-params";

export class AccountService {
  static async getUserProfile(): Promise<AxiosResponse<FullUserInfo>> {
    return $api.get(endpoints.account.profile);
  }

  static async updateUserProfile(data: FormData): Promise<AxiosResponse<void>> {
    return $api.patch(endpoints.account.profile, data);
  }

  static async getAllUsers(
    params: GetAllUsersParams,
  ): Promise<AxiosResponse<PaginatedResource<FullUserInfo>>> {
    return $api.get(endpoints.account.allUsers, {
      params: {
        ...params.paginationParams,
        filter: parseParams(params.searchParams),
      },
    });
  }

  static async toggleBanUser(userId: number): Promise<AxiosResponse<void>> {
    return $api.post(endpoints.account.banUser, { userId });
  }

  static async changeUserRole(data: ChangeUserRoleParams): Promise<AxiosResponse<void>> {
    return $api.post(endpoints.account.changeRole, data);
  }
}

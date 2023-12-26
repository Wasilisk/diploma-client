import { $api } from 'shared/configs/axios-config';
import { AxiosResponse } from 'axios';
import { endpoints } from 'shared/utils/constants';
import {ChangeUserRoleParams, FullUserInfo, PaginatedResource, PaginationParams} from 'shared/utils/types';

export class AccountService {
  static async getUserProfile(): Promise<AxiosResponse<FullUserInfo>> {
    return $api.get(endpoints.account.profile);
  }

  static async updateUserProfile(data: FormData): Promise<AxiosResponse<void>> {
    return $api.patch(endpoints.account.profile, data);
  }

  static async getAllUsers(
    params: PaginationParams,
  ): Promise<AxiosResponse<PaginatedResource<FullUserInfo>>> {
    return $api.get(endpoints.account.allUsers, { params });
  }

  static async toggleBanUser(userId: number): Promise<AxiosResponse<void>> {
    return $api.post(endpoints.account.banUser, { userId });
  }

  static async changeUserRole(data: ChangeUserRoleParams): Promise<AxiosResponse<void>> {
    return $api.post(endpoints.account.changeRole, data);
  }
}

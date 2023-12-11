import { $api } from 'shared/configs/axios-config';
import { AxiosResponse } from 'axios';
import { endpoints } from 'shared/utils/constants';
import { FullUserInfo } from 'shared/utils/types';

export class AccountService {
  static async getUserProfile(): Promise<AxiosResponse<FullUserInfo>> {
    return $api.get(endpoints.account.profile);
  }

  static async updateUserProfile(data: FormData): Promise<AxiosResponse<void>> {
    return $api.patch(endpoints.account.profile, data);
  }
}

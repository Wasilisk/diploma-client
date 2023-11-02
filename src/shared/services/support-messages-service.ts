import { $api } from 'shared/configs/axios-config';
import { AxiosResponse } from 'axios';
import { endpoints } from 'shared/utils/constants';
import { SupportMessageFormData } from 'shared/utils/types/support.types';

export class SupportMessagesService {
  static async createNewSupportMessage(data: SupportMessageFormData): Promise<AxiosResponse<void>> {
    return $api.post(endpoints.supportMessage, data);
  }
}

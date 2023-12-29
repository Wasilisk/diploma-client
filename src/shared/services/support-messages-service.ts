import { $api } from 'shared/configs/axios-config';
import { AxiosResponse } from 'axios';
import { endpoints } from 'shared/utils/constants';
import { SupportMessage, SupportMessageFormData } from 'shared/utils/types/support.types';
import {
  GetAllSupportMessagesParams,
  PaginatedResource,
  ReplyToMessageData,
  UpdateSupportMessageStatusData,
} from 'shared/utils/types';
import { parseParams } from 'shared/utils/libs/parse-params';

export class SupportMessagesService {
  static async createNewSupportMessage(data: SupportMessageFormData): Promise<AxiosResponse<void>> {
    return $api.post(endpoints.supportMessage.message, data);
  }

  static async getAllSupportMessages(
    params: GetAllSupportMessagesParams,
  ): Promise<AxiosResponse<PaginatedResource<SupportMessage>>> {
    return $api.get(endpoints.supportMessage.message, {
      params: {
        ...params.paginationParams,
        filter: parseParams(params.filter),
        sort: parseParams(params.sort),
      },
    });
  }

  static async setStatusAsResolved(
    data: UpdateSupportMessageStatusData,
  ): Promise<AxiosResponse<void>> {
    return $api.patch(endpoints.supportMessage.updateStatus, data);
  }

  static async replyToMessage(data: ReplyToMessageData) {
    return $api.post(endpoints.supportMessage.reply, data);
  }

  static async deleteMessage(messageId: number) {
    return $api.delete(`${endpoints.supportMessage.message}/${messageId}`);
  }
}

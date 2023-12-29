import { $api } from 'shared/configs/axios-config';
import { endpoints } from 'shared/utils/constants';
import {
  GetAllGuidePermissionRequestsParams,
  GuideRegistrationFormData,
  PaginatedResource,
  UpdateGuidePermissionRequestStatusData,
} from 'shared/utils/types';
import { AxiosResponse } from 'axios';
import { parseParams } from 'shared/utils/libs/parse-params';
import { GuidePermissionRequest } from 'shared/utils/types/guide-permission-request.types';

export class GuidePermissionService {
  static async createRequest(data: GuideRegistrationFormData) {
    return $api.post(endpoints.guidePermission.request, data);
  }

  static async getAllGuidePermissionRequests(
    params: GetAllGuidePermissionRequestsParams,
  ): Promise<AxiosResponse<PaginatedResource<GuidePermissionRequest>>> {
    return $api.get(endpoints.guidePermission.request, {
      params: {
        ...params.paginationParams,
        filter: parseParams(params.filter),
        sort: parseParams(params.sort),
      },
    });
  }

  static async updateRequestStatus(data: UpdateGuidePermissionRequestStatusData) {
    return $api.patch(endpoints.guidePermission.updateStatus, data);
  }

  static async deleteRequest(requestId: number) {
    return $api.delete(`${endpoints.guidePermission.request}/${requestId}`);
  }
}

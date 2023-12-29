import {GetAllGuidePermissionRequestsParams} from 'shared/utils/types';
import { useQuery } from 'react-query';
import { endpoints } from 'shared/utils/constants';
import { useDebounce } from '@uidotdev/usehooks';
import {GuidePermissionService} from "shared/services/guide-permission-service";

export const useGuidePermissionRequests = (params: GetAllGuidePermissionRequestsParams) => {
  const searchParams = useDebounce({...params.filter, ...params.sort}, 500);
  return useQuery([endpoints.guidePermission.request, params.paginationParams, searchParams], async () => {
    const response = await GuidePermissionService.getAllGuidePermissionRequests(params);
    return response.data;
  });
};

import { GetAllSupportMessagesParams } from 'shared/utils/types';
import { useQuery } from 'react-query';
import { endpoints } from 'shared/utils/constants';
import { SupportMessagesService } from 'shared/services';
import {useDebounce} from "shared/utils/hooks/use-debounce";


export const useSupportMessages = (params: GetAllSupportMessagesParams) => {
  const searchParams = useDebounce(params, 1000);
  return useQuery([endpoints.supportMessage.message, params.paginationParams, searchParams], async () => {
    const response = await SupportMessagesService.getAllSupportMessages(params);
    return response.data;
  });
};

import { IconButton } from 'shared/ui/icon-button';
import { useMutation, useQueryClient } from 'react-query';
import { toast } from 'react-toastify';
import { endpoints } from 'shared/utils/constants';
import { AxiosError } from 'axios';
import { AxiosErrorResponseData } from 'shared/utils/types';
import { GuidePermissionService } from 'shared/services/guide-permission-service';
import { GuidePermissionRequestStatus } from 'shared/utils/types/guide-permission-request.types';
import CheckIcon from '@mui/icons-material/Check';

interface AcceptRequestProps {
  requestId: number;
}

export const AcceptRequest = ({ requestId }: AcceptRequestProps) => {
  const queryClient = useQueryClient();
  const { mutate: updateRequestStatus, isLoading } = useMutation(
    GuidePermissionService.updateRequestStatus,
    {
      onSuccess: () => {
        toast.success('Запит успішно прийнято');
        return queryClient.invalidateQueries({ queryKey: endpoints.guidePermission.request });
      },
      onError: (error: AxiosError<AxiosErrorResponseData>) => {
        toast.error(error.response?.data.message);
      },
    },
  );

  const handleClick = () =>
    updateRequestStatus({ id: requestId, status: GuidePermissionRequestStatus.ACCEPTED });

  return (
    <IconButton
      icon={<CheckIcon />}
      id={`decline-request-${requestId}`}
      tooltipText={'Прийняти'}
      className='bg-white'
      disabled={isLoading}
      onClick={handleClick}
    />
  );
};

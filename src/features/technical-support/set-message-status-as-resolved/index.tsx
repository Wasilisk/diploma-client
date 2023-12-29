import MarkEmailReadOutlinedIcon from '@mui/icons-material/MarkEmailReadOutlined';
import { IconButton } from 'shared/ui/icon-button';
import { Tooltip } from 'react-tooltip';
import { useMutation, useQueryClient } from 'react-query';
import { SupportMessagesService } from 'shared/services';
import { toast } from 'react-toastify';
import { endpoints } from 'shared/utils/constants';
import { AxiosError } from 'axios';
import { AxiosErrorResponseData, SupportMessageStatus } from 'shared/utils/types';

interface SetMessageStatusAsResolvedProps {
  messageId: number;
}
export const SetMessageStatusAsResolved = ({ messageId }: SetMessageStatusAsResolvedProps) => {
  const queryClient = useQueryClient();
  const { mutate: setStatusAsResolved, isLoading } = useMutation(
    SupportMessagesService.setStatusAsResolved,
    {
      onSuccess: () => {
        toast.success('Статус успішно зміненно');
        return queryClient.invalidateQueries({ queryKey: endpoints.supportMessage.message });
      },
      onError: (error: AxiosError<AxiosErrorResponseData>) => {
        toast.error(error.response?.data.message);
      },
    },
  );

  const handleClick = () =>
    setStatusAsResolved({
      id: messageId,
      status: SupportMessageStatus.RESOLVED,
    });

  return (
    <>
      <IconButton
        icon={<MarkEmailReadOutlinedIcon />}
        id={`set-resolved-status-${messageId}`}
        tooltipText={'Позначити як "Вирішено"'}
        onClick={handleClick}
        disabled={isLoading}
      />
      <Tooltip id={`set-resolved-status-${messageId}`} />
    </>
  );
};

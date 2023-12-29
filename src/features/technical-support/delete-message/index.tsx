import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { IconButton } from 'shared/ui/icon-button';
import { Tooltip } from 'react-tooltip';
import { useMutation, useQueryClient } from 'react-query';
import { SupportMessagesService } from 'shared/services';
import { toast } from 'react-toastify';
import { endpoints } from 'shared/utils/constants';
import { AxiosError } from 'axios';
import { AxiosErrorResponseData } from 'shared/utils/types';

interface DeleteMessage {
  messageId: number;
}

export const DeleteMessage = ({ messageId }: DeleteMessage) => {
  const queryClient = useQueryClient();
  const { mutate: deleteMessage, isLoading } = useMutation(SupportMessagesService.deleteMessage, {
    onSuccess: () => {
      toast.success('Повідомлення успішно видалено');
      return queryClient.invalidateQueries({ queryKey: endpoints.supportMessage.message });
    },
    onError: (error: AxiosError<AxiosErrorResponseData>) => {
      toast.error(error.response?.data.message);
    },
  });

  const handleClick = () => deleteMessage(messageId);

  return (
    <>
      <IconButton
        icon={<DeleteOutlineOutlinedIcon />}
        id={`delete-message-${messageId}`}
        tooltipText={'Видалити'}
        disabled={isLoading}
        onClick={handleClick}
      />
      <Tooltip id={`delete-message-${messageId}`} />
    </>
  );
};

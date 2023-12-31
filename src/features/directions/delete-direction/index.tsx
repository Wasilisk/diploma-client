import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { IconButton } from 'shared/ui/icon-button';
import { Tooltip } from 'react-tooltip';
import { useMutation, useQueryClient } from 'react-query';
import {DirectionsService} from 'shared/services';
import { toast } from 'react-toastify';
import { endpoints } from 'shared/utils/constants';
import { AxiosError } from 'axios';
import { AxiosErrorResponseData } from 'shared/utils/types';

interface DeleteDirectionProps {
  directionId: number;
}

export const DeleteDirection = ({ directionId }: DeleteDirectionProps) => {
  const queryClient = useQueryClient();
  const { mutate: deleteDirection, isLoading } = useMutation(DirectionsService.delete, {
    onSuccess: () => {
      toast.success('Напрямок успішно видалено');
      return queryClient.invalidateQueries({ queryKey: endpoints.directions });
    },
    onError: (error: AxiosError<AxiosErrorResponseData>) => {
      toast.error(error.response?.data.message);
    },
  });

  const handleClick = () => deleteDirection(directionId);

  return (
    <>
      <IconButton
        icon={<DeleteOutlineOutlinedIcon />}
        id={`delete-direction-${directionId}`}
        tooltipText={'Видалити'}
        disabled={isLoading}
        onClick={handleClick}
      />
      <Tooltip id={`delete-direction-${directionId}`} />
    </>
  );
};

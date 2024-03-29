import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { IconButton } from 'shared/ui/icon-button';
import { Tooltip } from 'react-tooltip';
import { useMutation, useQueryClient } from 'react-query';
import {DirectionsService} from 'shared/services';
import { toast } from 'react-toastify';
import { endpoints } from 'shared/utils/constants';
import { AxiosError } from 'axios';
import { AxiosErrorResponseData } from 'shared/utils/types';
import {ConfirmationModal} from "shared/ui/confirmation-modal";
import {useState} from "react";

interface DeleteDirectionProps {
  directionId: number;
}

export const DeleteDirection = ({ directionId }: DeleteDirectionProps) => {
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
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

  const onSubmit = () => {
    setIsConfirmationModalOpen(false);
    deleteDirection(directionId)
  };
  const openConfirmationModal = () => {
    setIsConfirmationModalOpen(true);
  };

  const cancelDelete = () => {
    setIsConfirmationModalOpen(false);
  };

  return (
    <>
      <IconButton
        icon={<DeleteOutlineOutlinedIcon />}
        id={`delete-direction-${directionId}`}
        tooltipText={'Видалити'}
        disabled={isLoading}
        onClick={openConfirmationModal}
      />
      <Tooltip id={`delete-direction-${directionId}`} />
      <ConfirmationModal
          isOpen={isConfirmationModalOpen}
          onClose={cancelDelete}
          onSubmit={onSubmit}
          title={'Підтвердження видалення'}
          description={'Ви впевнені що хочете видалити цей напрямок ?'}
      />
    </>
  );
};

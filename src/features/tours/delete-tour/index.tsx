import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { IconButton } from 'shared/ui/icon-button';
import { Tooltip } from 'react-tooltip';
import { useMutation, useQueryClient } from 'react-query';
import { toast } from 'react-toastify';
import { endpoints } from 'shared/utils/constants';
import { AxiosError } from 'axios';
import { AxiosErrorResponseData } from 'shared/utils/types';
import { ToursService } from 'shared/services/tours-service';
import { ConfirmationModal } from 'shared/ui/confirmation-modal';
import { useState } from 'react';

interface DeleteTourProps {
  tourId: number;
}

export const DeleteTour = ({ tourId }: DeleteTourProps) => {
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
  const queryClient = useQueryClient();
  const { mutate: deleteTour, isLoading } = useMutation(ToursService.delete, {
    onSuccess: () => {
      toast.success('Екскурсію успішно видалено');
      return queryClient.invalidateQueries({ queryKey: endpoints.tours });
    },
    onError: (error: AxiosError<AxiosErrorResponseData>) => {
      toast.error(error.response?.data.message);
    },
  });

  const onSubmit = () => {
    setIsConfirmationModalOpen(false);
    deleteTour(tourId);
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
        id={`delete-tour-${tourId}`}
        tooltipText={'Видалити'}
        disabled={isLoading}
        onClick={openConfirmationModal}
      />
      <Tooltip id={`delete-direction-${tourId}`} />
      <ConfirmationModal
        isOpen={isConfirmationModalOpen}
        onClose={cancelDelete}
        onSubmit={onSubmit}
        title={'Підтвердження видалення'}
        description={'Ви впевнені що хочете видалити цю екскурсію ?'}
      />
    </>
  );
};

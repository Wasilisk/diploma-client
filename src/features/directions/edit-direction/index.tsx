import { Button } from 'shared/ui/button';
import { Dialog } from '@headlessui/react';
import CloseIcon from '@mui/icons-material/Close';
import { ChangeEvent, useState } from 'react';
import { ImageInput } from 'shared/ui/image-input';
import { Input } from 'shared/ui/input';
import { useMutation, useQueryClient } from 'react-query';
import { endpoints } from 'shared/utils/constants';
import { DirectionsService } from 'shared/services';
import { toast } from 'react-toastify';
import { AxiosError } from 'axios';
import { AxiosErrorResponseData, Direction } from 'shared/utils/types';
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import {IconButton} from "shared/ui/icon-button";

interface EditDirectionProps {
  data: Direction;
}

export const EditDirection = ({ data }: EditDirectionProps) => {
  const queryClient = useQueryClient();
  const [isOpen, setIsOpen] = useState(false);

  const [name, setName] = useState(data.name);
  const [image, setImage] = useState<File | null>(null);

  const closeModal = () => setIsOpen(false);
  const openModal = () => setIsOpen(true);

  const { mutate: updateDirection, isLoading } = useMutation(DirectionsService.update, {
    onSuccess: () => {
      toast.success('Напрямок успішно оновлено!');
      setIsOpen(false);
      setImage(null);
      return queryClient.invalidateQueries({ queryKey: endpoints.directions });
    },
    onError: (error: AxiosError<AxiosErrorResponseData>) => {
      toast.error(error.response?.data.message);
    },
  });

  const handleSubmit = () => {
    const formData = new FormData();
    if (name) {
      formData.append('id', data.id.toString());
      formData.append('name', name);
      formData.append('image', data.image);
      image && formData.append('file', image)
      updateDirection(formData);
    }
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  return (
    <>
      <IconButton icon={<EditOutlinedIcon />} onClick={openModal} id={`edit-direction-${data.id}`} tooltipText="Редагувати"/>
      <Dialog as='div' className='relative z-10' onClose={closeModal} open={isOpen}>
        <div className='fixed inset-0 bg-black/25' />
        <div className='fixed inset-0 overflow-y-auto'>
          <div className='flex min-h-full items-center justify-center sm:py-4'>
            <Dialog.Panel className='relative w-full max-w-[27rem] transform overflow-hidden bg-white p-4 text-left align-middle shadow-xl sm:rounded-2xl sm:px-6 sm:py-6'>
              <div
                className='absolute right-0 top-0 cursor-pointer p-2'
                onClick={closeModal}
              >
                <CloseIcon />
              </div>
              <Dialog.Title
                as='h3'
                className='mb-6 text-center text-3xl font-bold leading-10 text-neutral-800'
              >
                Редагування напрямку
              </Dialog.Title>
              <div className='flex flex-col items-center gap-y-4'>
                <ImageInput defaultValue={data.image} onChange={setImage} />
                <Input placeholder='Назва напрямку' onChange={handleInputChange} value={name} />
                <div className='flex w-full justify-end gap-x-2'>
                  <Button variant='secondary'>Скасувати</Button>
                  <Button variant='primary' onClick={handleSubmit} disabled={isLoading}>
                    Оновити
                  </Button>
                </div>
              </div>
            </Dialog.Panel>
          </div>
        </div>
      </Dialog>
    </>
  );
};

import { Dialog } from '@headlessui/react';
import CloseIcon from '@mui/icons-material/Close';
import { Button } from 'shared/ui/button';

interface ConfirmationModalProps {
  isOpen: boolean;
  title: string;
  description: string;
  onSubmit: () => void;
  onClose: () => void;
}

export const ConfirmationModal = ({
  isOpen,
  title,
  description,
  onSubmit,
  onClose,
}: ConfirmationModalProps) => {
  return (
    <Dialog as='div' className='relative z-10' onClose={onClose} open={isOpen}>
      <div className='fixed inset-0 bg-black/25' />
      <div className='fixed inset-0 overflow-y-auto'>
        <div className='flex min-h-full items-center justify-center sm:py-4'>
          <Dialog.Panel className='relative w-full max-w-[27rem] transform overflow-hidden bg-white text-left align-middle shadow-xl sm:rounded-2xl p-4'>
            <div className='absolute right-0 top-0 cursor-pointer p-2' onClick={onClose}>
              <CloseIcon />
            </div>
            <Dialog.Title
              as='h5'
              className='mb-2 text-center text-xl font-bold leading-10 text-neutral-800'
            >
              {title}
            </Dialog.Title>
            <Dialog.Description className='mb-4 text-center leading-10 text-gray-800'>{description}</Dialog.Description>
            <div className='flex w-full justify-end gap-x-2'>
              <Button variant='secondary'>Скасувати</Button>
              <Button variant='primary' className="bg-red-400 text-white" onClick={onSubmit}>
                Видалити
              </Button>
            </div>
          </Dialog.Panel>
        </div>
      </div>
    </Dialog>
  );
};

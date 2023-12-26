import {IconButton} from 'shared/ui/icon-button';
import {useMutation, useQueryClient} from 'react-query';
import {AccountService} from 'shared/services';
import {AxiosError} from 'axios';
import {AxiosErrorResponseData, Role} from 'shared/utils/types';
import {toast} from 'react-toastify';
import {endpoints} from 'shared/utils/constants';
import PermIdentityOutlinedIcon from '@mui/icons-material/PermIdentityOutlined';
import {Dialog, RadioGroup} from '@headlessui/react';
import CloseIcon from '@mui/icons-material/Close';
import {useState} from 'react';
import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined';
import {Button} from 'shared/ui/button';
import {useRole} from "shared/utils/hooks/use-role";

interface ChangeUserRoleProps {
  userId: number;
  role: Role;
}

const allowedRolesToChange: {[key: string]: Role[]} = {
  [Role.MODERATOR]: [Role.USER, Role.GUIDE],
  [Role.ADMIN]: [Role.USER, Role.GUIDE, Role.MODERATOR],
}

export const ChangeUserRole = ({ userId, role }: ChangeUserRoleProps) => {
  const userRole = useRole()
  const queryClient = useQueryClient();
  const [newRole, setNewRole] = useState(role);
  const [isOpen, setIsOpen] = useState(false);
  const { mutate: changeUserRole, isLoading } = useMutation(AccountService.changeUserRole, {
    onSuccess: () => {
      toast.success('Роль успішно змінено');
      closeModal()
      return queryClient.invalidateQueries({ queryKey: endpoints.account.allUsers });
    },
    onError: (error: AxiosError<AxiosErrorResponseData>) => {
      toast.error(error.response?.data.message);
    },
  });

  const closeModal = () => setIsOpen(false);
  const openModal = () => setIsOpen(true);
  const handleClick = () => changeUserRole({ id: userId, role: newRole });

  return (
    <>
      <IconButton
        id='add-permission'
        tooltipText='Change permission'
        disabled={isLoading}
        onClick={openModal}
        icon={<PermIdentityOutlinedIcon />}
      />
      <Dialog as='div' className='relative z-10' onClose={closeModal} open={isOpen}>
        <div className='fixed inset-0 bg-black/25' />
        <div className='fixed inset-0 overflow-y-auto'>
          <div className='flex min-h-full items-center justify-center sm:py-4'>
            <Dialog.Panel className='relative w-full max-w-2xl transform overflow-hidden bg-white p-4 text-left align-middle shadow-xl sm:rounded-2xl sm:px-8 sm:py-6'>
              <div
                className='absolute right-2 top-2 cursor-pointer p-2 sm:right-4 sm:top-4'
                onClick={closeModal}
              >
                <CloseIcon />
              </div>
              <Dialog.Title
                as='h5'
                className='mb-10 text-center text-2xl font-bold leading-10 text-neutral-800'
              >
                Зміна ролі користувача
              </Dialog.Title>
              <RadioGroup value={newRole} onChange={setNewRole} className='flex flex-col gap-y-2'>
                <RadioGroup.Label className='sr-only'>Roles</RadioGroup.Label>
                {allowedRolesToChange[userRole].map((roleOption, index) => (
                  <RadioGroup.Option
                    key={index}
                    value={roleOption}
                    className={({ active, checked }) =>
                      `${active ? 'ring-2 ring-gray-400' : ''}
                  ${checked ? 'bg-gray-200' : 'bg-white'}
                    relative box-border flex cursor-pointer rounded-lg px-5 py-4 shadow-md focus:outline-none`
                    }
                  >
                    {({ checked }) => (
                      <>
                        <div className='flex w-full items-center justify-between'>
                          <div className='flex items-center'>
                            <div className='text-sm'>
                              <RadioGroup.Label as='p' className={`font-medium text-gray-900 leading-6`}>
                                {roleOption}
                              </RadioGroup.Label>
                              <RadioGroup.Description as='span' className='inline text-gray-500'>
                                {roleOption === role && 'Роль користувача'}
                              </RadioGroup.Description>
                            </div>
                          </div>
                          {checked && (
                              <CheckCircleOutlineOutlinedIcon/>
                          )}
                        </div>
                      </>
                    )}
                  </RadioGroup.Option>
                ))}
              </RadioGroup>
              <div className='mt-4 flex justify-end gap-x-2'>
                <Button variant='secondary' onClick={closeModal}>
                  Скасувати
                </Button>
                <Button variant='primary' onClick={handleClick}>
                  Зберегти
                </Button>
              </div>
            </Dialog.Panel>
          </div>
        </div>
      </Dialog>
    </>
  );
};

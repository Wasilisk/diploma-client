import { IconButton } from 'shared/ui/icon-button';
import {useMutation, useQueryClient} from 'react-query';
import { AccountService } from 'shared/services';
import { AxiosError } from 'axios';
import { AxiosErrorResponseData } from 'shared/utils/types';
import { toast } from 'react-toastify';
import LockPersonOutlinedIcon from '@mui/icons-material/LockPersonOutlined';
import LockOpenOutlinedIcon from '@mui/icons-material/LockOpenOutlined';
import {endpoints} from "shared/utils/constants";

interface ToggleBanUserProps {
  isBanned: boolean;
  userId: number;
}

export const ToggleBanUser = ({ userId, isBanned }: ToggleBanUserProps) => {
  const queryClient = useQueryClient();
  const { mutate: toggleBanUser, isLoading } = useMutation(AccountService.toggleBanUser, {
    onSuccess: () => {
      toast.success(isBanned ? 'Користувача розблоковано' : 'Користувача заблоковано');
      return queryClient.invalidateQueries({ queryKey: endpoints.account.allUsers });
    },
    onError: (error: AxiosError<AxiosErrorResponseData>) => {
      toast.error(error.response?.data.message);
    },
  });

  const handleClick = () => toggleBanUser(userId);

  return (
    <IconButton
      id='toggle-ban-user'
      tooltipText={isBanned ? 'Unban user' : 'Ban user'}
      disabled={isLoading}
      onClick={handleClick}
      icon={isBanned ? <LockOpenOutlinedIcon /> : <LockPersonOutlinedIcon />}
    />
  );
};

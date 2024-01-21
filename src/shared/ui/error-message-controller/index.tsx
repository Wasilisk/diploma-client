import { ReactNode } from 'react';
import ErrorOutlineOutlinedIcon from '@mui/icons-material/ErrorOutlineOutlined';
import { Tooltip } from 'react-tooltip';
import {twMerge} from "tailwind-merge";

interface ErrorMessageControllerProps <T>{
  children: ReactNode;
  error?: T | undefined;
  className?: string
}

export const ErrorMessageController = <T extends {message?: string}>({ children, error, className }: ErrorMessageControllerProps<T>) => {
  return (
    <div className='relative w-full'>
      {children}
      {error?.message && (
        <>
          <ErrorOutlineOutlinedIcon
            className={twMerge('absolute right-2 top-4 text-red-600', className)}
            data-tooltip-id={`error`}
            data-tooltip-content={error.message}
          />
          <Tooltip id={`error`} />
        </>
      )}
    </div>
  );
};

import { ReactNode } from 'react';
import CloudOffOutlinedIcon from '@mui/icons-material/CloudOffOutlined';

interface EmptyStateProps {
  icon?: ReactNode;
  heading: string;
  description?: string;
  action?: ReactNode;
}

export const EmptyState = ({ heading, description, icon, action }: EmptyStateProps) => {
  return (
    <div className='flex w-full flex-col items-center justify-center gap-y-2 py-12'>
      {icon ? (
        icon
      ) : (
        <CloudOffOutlinedIcon
          style={{ height: '100px', width: '100px' }}
          className='text-gray-500'
        />
      )}
      <h6 className='text-2xl font-bold text-gray-500'>{heading}</h6>
      <p>{description}</p>
      {action}
    </div>
  );
};

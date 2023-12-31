import { ReactNode } from 'react';

interface PageHeaderProps {
  title: string;
  description: string;
  action?: ReactNode;
}
export const PageHeader = ({ title, description, action }: PageHeaderProps) => {
  return (
    <div className='space-y-2 sm:space-y-5'>
      <div className='flex justify-between'>
        <h2 className='text-3xl font-bold leading-10 text-neutral-800 sm:text-5xl'>{title}</h2>
        {action}
      </div>
      <p className='text-sm sm:text-base'>{description}</p>
    </div>
  );
};

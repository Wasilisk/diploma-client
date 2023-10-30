import { ReactNode } from 'react';

type AuthContainerProps = {
  title: string;
  children: ReactNode;
};
export const AuthContainer = ({ title, children }: AuthContainerProps) => {
  return (
    <div className='fixed inset-0 flex justify-center sm:items-center'>
      <div className='relative flex w-full flex-col justify-center bg-white px-6 py-5 sm:max-w-md sm:rounded-[20px] sm:px-12 sm:py-10 '>
        <p className='mb-7 text-center text-3xl font-bold text-neutral-800'>{title}</p>
        <div className='flex flex-col gap-y-3'>{children}</div>
      </div>
    </div>
  );
};

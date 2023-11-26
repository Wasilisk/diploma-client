import { ButtonHTMLAttributes, ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';

type IconButtonProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children'> & {
  icon: ReactNode;
};
export const IconButton = ({ icon, className, ...otherProps }: IconButtonProps) => {
  return (
    <button
      {...otherProps}
      className={twMerge(
        'aspect-square h-9 rounded-full bg-neutral-100 transition duration-300 ease-in-out hover:bg-opacity-90 md:h-[3rem]',
        className,
      )}
    >
      {icon}
    </button>
  );
};

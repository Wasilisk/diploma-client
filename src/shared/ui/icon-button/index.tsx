import { ButtonHTMLAttributes, ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';
import {Tooltip} from "react-tooltip";

type IconButtonProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children'> & {
  icon: ReactNode;
  tooltipText?: string;
};
export const IconButton = ({ id, icon, className, tooltipText, ...otherProps }: IconButtonProps) => {
  return (
      <>
        <button
            {...otherProps}
            data-tooltip-id={id} data-tooltip-content={tooltipText}
            className={twMerge(
                'aspect-square rounded-full bg-neutral-100 transition duration-300 ease-in-out hover:bg-opacity-90 h-12',
                className,
            )}
        >
          {icon}
        </button>
        { tooltipText && <Tooltip id={id} />}
      </>
  );
};

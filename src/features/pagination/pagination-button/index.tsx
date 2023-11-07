import { HTMLAttributes } from 'react';
import { twMerge } from 'tailwind-merge';

type PaginationButtonProps = HTMLAttributes<HTMLLIElement> & {
  selected?: boolean;
  disabled?: boolean;
};
export const PaginationButton = ({
  className,
  selected,
  disabled,
  ...otherProps
}: PaginationButtonProps) => {
  return (
    <li
      {...otherProps}
      className={twMerge(
        'flex h-6 w-6 cursor-pointer items-center justify-center rounded-full text-xs font-medium text-stone-900 hover:bg-neutral-300 sm:h-8 sm:w-8',
        disabled && 'pointer-events-none border border-dashed border-neutral-400 hover:bg-none',
        selected && 'bg-yellow-400',
        className,
      )}
    />
  );
};

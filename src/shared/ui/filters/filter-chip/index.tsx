import { ButtonHTMLAttributes, forwardRef } from 'react';
import { twMerge } from 'tailwind-merge';

export const FilterChip = forwardRef<HTMLButtonElement, ButtonHTMLAttributes<HTMLButtonElement>>(
  ({ className, children, value, ...otherProps }, ref) => (
    <button
      className={twMerge(
        'relative w-fit rounded-full bg-neutral-100 px-3 py-2 outline-none',
        className,
      )}
      ref={ref}
      {...otherProps}
    >
      {children ? children : value}
    </button>
  ),
);

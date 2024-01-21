import { forwardRef, InputHTMLAttributes, ReactElement } from 'react';
import { twMerge } from 'tailwind-merge';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  inputAdornment?: ReactElement;
  inputClassName?: string;
}
export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, inputClassName, inputAdornment, ...inputProps }, ref) => {
    const classes = twMerge(
      `w-full rounded-lg bg-zinc-100 px-6 py-4 outline-none placeholder:text-base placeholder:font-normal placeholder:text-neutral-400`,
      inputClassName,
    );
    return (
      <div className={twMerge('relative w-full', className)}>
        <input ref={ref} {...inputProps} className={classes} />
        {inputAdornment}
      </div>
    );
  },
);

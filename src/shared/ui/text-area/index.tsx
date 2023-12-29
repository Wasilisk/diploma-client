import { forwardRef, TextareaHTMLAttributes } from 'react';
import { twMerge } from 'tailwind-merge';

export const TextArea = forwardRef<
  HTMLTextAreaElement,
  TextareaHTMLAttributes<HTMLTextAreaElement>
>(({ className, ...inputProps }, ref) => {
  return (
    <textarea
      ref={ref}
      {...inputProps}
      className={twMerge(
        `w-full rounded-lg bg-zinc-100 px-6 py-4 outline-none placeholder:text-base placeholder:font-normal placeholder:text-neutral-400`,
        className,
      )}
    />
  );
});

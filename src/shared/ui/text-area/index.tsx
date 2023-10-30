import { forwardRef, TextareaHTMLAttributes } from 'react';

export const TextArea = forwardRef<
  HTMLTextAreaElement,
  TextareaHTMLAttributes<HTMLTextAreaElement>
>(({ className, ...inputProps }, ref) => {
  return (
    <textarea
      ref={ref}
      {...inputProps}
      className={`w-full rounded-lg bg-zinc-100 px-6 py-4 outline-none placeholder:text-base placeholder:font-normal placeholder:text-neutral-400 ${className}`}
    />
  );
});

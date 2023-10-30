import { ButtonHTMLAttributes, forwardRef } from 'react';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant: 'primary' | 'secondary';
  rounded?: boolean;
  fullWidth?: boolean;
};
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant, rounded, fullWidth = false, className, disabled, ...otherProps }, ref) => {
    return (
      <button
        ref={ref}
        {...otherProps}
        className={`
          px-4 py-2 text-base font-medium text-neutral-800 transition duration-300 
          ease-in-out  
          hover:bg-opacity-90 md:px-6 md:py-3
          ${variant === 'primary' ? 'bg-yellow-400' : 'bg-zinc-100'} 
          ${rounded ? 'rounded-full' : 'rounded-lg'} 
          ${fullWidth ? 'w-full' : 'w-fit'} 
          ${disabled ? 'cursor-not-allowed opacity-50' : ''}
          ${className} 
        `}
        disabled={disabled}
      />
    );
  },
);

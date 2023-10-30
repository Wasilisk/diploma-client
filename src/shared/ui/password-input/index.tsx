import { forwardRef, InputHTMLAttributes, useState } from 'react';
import { Input } from 'shared/ui/input';
import { Visibility, VisibilityOff } from '@mui/icons-material';

type PasswordInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'type'>;
export const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>((props, ref) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  return (
    <div className='relative'>
      <Input ref={ref} {...props} type={showPassword ? 'text' : 'password'} />
      <div
        className='absolute inset-y-0 right-0 flex cursor-pointer items-center pr-3 text-sm leading-5'
        onClick={handleClickShowPassword}
      >
        {showPassword ? <VisibilityOff /> : <Visibility />}
      </div>
    </div>
  );
});

import { Input } from 'shared/ui/input';
import { ChangeEvent } from 'react';
import ClearIcon from '@mui/icons-material/Clear';

interface SearchFilterProps {
  label: string;
  value: string | null;
  onChange: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
}

export const SearchFilter = ({ label, value, onChange, ...inputProps }: SearchFilterProps) => {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => onChange(event.target.value);
  const handleClearClick = () => onChange('');

  return (
    <div className='flex flex-wrap items-center gap-x-3 gap-y-1'>
      <div className='font-medium leading-relaxed text-zinc-700'>{label}</div>
      <Input
        value={value ?? ''}
        {...inputProps}
        onChange={handleChange}
        className='w-auto rounded-full px-4 py-2'
        inputAdornment={
          value ? (
            <div
              className='absolute bottom-0 right-0 top-0 flex cursor-pointer items-center px-3 text-gray-500'
              onClick={handleClearClick}
            >
              <ClearIcon fontSize='small' />
            </div>
          ) : undefined
        }
      />
    </div>
  );
};

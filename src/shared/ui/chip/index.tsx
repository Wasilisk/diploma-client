import { Link } from 'react-router-dom';

interface ChipProps {
  label: string;
  to: string;
}
export const Chip = ({ label, to }: ChipProps) => (
  <Link
    to={to}
    className='cursor-pointer rounded-3xl bg-neutral-800 bg-opacity-20 px-2 py-1 transition-opacity hover:bg-opacity-60 sm:px-4 sm:py-2'
  >
    <p className='text-center text-sm font-medium text-white'>{label}</p>
  </Link>
);

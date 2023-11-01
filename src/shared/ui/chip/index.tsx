import { Link } from 'react-router-dom';

interface ChipProps {
  label: string;
  to: string;
}
export const Chip = ({ label, to }: ChipProps) => (
  <Link
    to={to}
    className='cursor-pointer rounded-3xl bg-neutral-800 bg-opacity-20 px-4 py-2 transition-opacity hover:bg-opacity-60'
  >
    <p className='text-center text-sm font-medium text-white'>{label}</p>
  </Link>
);

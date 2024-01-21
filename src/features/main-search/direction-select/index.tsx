import FmdGoodOutlinedIcon from '@mui/icons-material/FmdGoodOutlined';
import { Direction } from 'shared/utils/types';
import { DirectionAutocomplete } from 'features/directions/direction-autocomplete';

interface DirectionSelectProps {
  direction: Direction | null;
  setDirection: (direction: Direction | null) => void;
}
export const DirectionSelect = ({ direction, setDirection }: DirectionSelectProps) => {
  return (
    <div className='relative flex w-full gap-x-4'>
      <div className='aspect-square rounded-full border border-zinc-300 bg-white p-2'>
        <FmdGoodOutlinedIcon />
      </div>
      <DirectionAutocomplete value={direction} onChange={setDirection} />
    </div>
  );
};

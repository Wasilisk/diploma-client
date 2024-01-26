import { Button } from '@src/shared/ui/button';
import { DirectionSelect } from 'features/main-search/direction-select';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import { DateSelector } from 'features/main-search/date-selector';
import { useState } from 'react';
import { createSearchParams, useNavigate } from 'react-router-dom';
import { Direction } from 'shared/utils/types';

export const MainSearch = () => {
  const navigate = useNavigate();
  const [selectedDirection, setSelectedDirection] = useState<Direction | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());

  const applySearchParams = () => {
    if (selectedDate && selectedDirection) {
      navigate({
        pathname: '/tours',
        search: `?${createSearchParams({
          directionId: selectedDirection.id.toString(),
          selectedDate: selectedDate.toISOString(),
        })}`,
      });
    }
  };

  return (
    <div className='flex w-full max-w-screen-md flex-col items-center justify-between gap-4 rounded-2xl bg-white px-4 py-3 shadow sm:flex-row sm:gap-8 sm:rounded-full'>
      <div className='flex w-full flex-col items-center justify-between gap-4 divide-gray-200 sm:flex-row sm:gap-8'>
        <DirectionSelect direction={selectedDirection} setDirection={setSelectedDirection} />
        <DateSelector date={selectedDate} setDate={setSelectedDate} />
      </div>
      <Button
        variant='primary'
        rounded
        className='flex w-full items-center justify-center sm:w-auto'
        onClick={applySearchParams}
        disabled={!selectedDirection || !selectedDate}
      >
        <SearchOutlinedIcon />
        Знайти
      </Button>
    </div>
  );
};

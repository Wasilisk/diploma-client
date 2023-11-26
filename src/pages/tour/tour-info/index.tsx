import GroupsIcon from '@mui/icons-material/Groups';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import PeopleIcon from '@mui/icons-material/People';
import PaidIcon from '@mui/icons-material/Paid';
import { TourInfo as TourInfoType } from 'shared/utils/types';

type TourInfoProps = {
  tourInfo: TourInfoType;
};

export const TourInfo = ({ tourInfo }: TourInfoProps) => {
  const { groupSize, groupType, duration, paymentInfo } = tourInfo;
  return (
    <div className='my-10 flex flex-col flex-wrap justify-between gap-y-2 border border-x-0 border-neutral-200 py-6 sm:flex-row'>
      <div className='flex items-center gap-x-2'>
        <GroupsIcon />
        <p>{groupType}</p>
      </div>
      <div className='flex items-center gap-x-2'>
        <AccessTimeIcon />
        <p>Тривалість: {duration}</p>
      </div>
      {groupSize && (
        <div className='flex items-center gap-x-2'>
          <PeopleIcon />
          <p>{groupSize}</p>
        </div>
      )}
      {paymentInfo && (
        <div className='flex items-center gap-x-2'>
          <PaidIcon />
          <p>{paymentInfo}</p>
        </div>
      )}
    </div>
  );
};

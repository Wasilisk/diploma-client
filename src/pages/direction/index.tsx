import { useParams } from 'react-router-dom';

export const Direction = () => {
  let { directionId } = useParams();
  return <>{directionId}</>;
};

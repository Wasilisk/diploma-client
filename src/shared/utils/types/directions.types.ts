import { Tour } from 'shared/utils/types/tours.types';

export type Direction = {
  id: number;
  name: string;
  image: string;
  _count: {
    tours: number,
  }
};

export type DirectionWithTours = Direction & {
  tours: Tour[];
};

import { create, StateCreator } from 'zustand';
import { persist, PersistOptions } from 'zustand/middleware';
import { Direction, FilterRange } from 'shared/utils/types';
import { addWeeks } from 'date-fns';
import { NumericRange } from 'shared/ui/multi-range-slider/types';
import {
  DEFAULT_MAX_GROUP_SIZE,
  DEFAULT_MAX_PRICE,
  DEFAULT_MIN_GROUP_SIZE,
  DEFAULT_MIN_PRICE,
} from 'widgets/filters/constants';

interface FiltersState {
  direction: Direction | null;
  priceRange: NumericRange;
  groupSize: NumericRange;
  dateRange: FilterRange;
  setDirection: (value: Direction | null) => void;
  setPriceRange: (value: NumericRange) => void;
  setDateRange: (value: FilterRange) => void;
  setGroupSize: (value: NumericRange) => void;
}

type FiltersPersist = (
  config: StateCreator<FiltersState>,
  options: PersistOptions<FiltersState>,
) => StateCreator<FiltersState>;

export const useFilters = create<FiltersState>(
  (persist as FiltersPersist)(
    (set) => ({
      direction: null,
      priceRange: {
        min: DEFAULT_MIN_PRICE,
        max: DEFAULT_MAX_PRICE,
      },
      groupSize: {
        min: DEFAULT_MIN_GROUP_SIZE,
        max: DEFAULT_MAX_GROUP_SIZE,
      },
      dateRange: { from: new Date().toISOString(), to: addWeeks(new Date(), 1).toISOString() },
      setDirection: (value) => set({ direction: value }),
      setPriceRange: (value) => set({ priceRange: value }),
      setDateRange: (value) => set({ dateRange: value }),
      setGroupSize: (value) => set({ groupSize: value }),
    }),
    { name: 'tours-filters' },
  ),
);

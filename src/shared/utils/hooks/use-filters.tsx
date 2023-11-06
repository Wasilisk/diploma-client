import { create, StateCreator } from 'zustand';
import { persist, PersistOptions } from 'zustand/middleware';
import { DateRange, Direction, FilterOption, PriceRange } from 'shared/utils/types';
import { addWeeks } from 'date-fns';

interface FiltersState {
  direction: Direction | null;
  priceRange: FilterOption<PriceRange> | null;
  paymentType: FilterOption<string> | null;
  tourType: FilterOption<string> | null;
  dateRange: DateRange;
  setDirection: (value: Direction | null) => void;
  setPriceRange: (value: FilterOption<PriceRange> | null) => void;
  setPaymentType: (value: FilterOption<string> | null) => void;
  setDateRange: (value: DateRange) => void;
  setTourType: (value: FilterOption<string> | null) => void;
}

type FiltersPersist = (
  config: StateCreator<FiltersState>,
  options: PersistOptions<FiltersState>,
) => StateCreator<FiltersState>;

export const useFilters = create<FiltersState>(
  (persist as FiltersPersist)(
    (set) => ({
      direction: null,
      priceRange: null,
      paymentType: null,
      tourType: null,
      dateRange: { from: new Date(), to: addWeeks(new Date(), 1) },
      setDirection: (value) => set({ direction: value }),
      setPriceRange: (value) => set({ priceRange: value }),
      setPaymentType: (value) => set({ paymentType: value }),
      setDateRange: (value) => set({ dateRange: value }),
      setTourType: (value) => set({ tourType: value }),
    }),
    { name: 'filters' },
  ),
);

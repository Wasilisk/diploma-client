import { create } from 'zustand';
import {SortingDirection, SupportMessageStatus} from 'shared/utils/types';

interface TechnicalSupportMessagesFiltersState {
  status: SupportMessageStatus | null;
  sorting: SortingDirection;
  setSorting: (value: string | null) => void;
  setStatus: (value: SupportMessageStatus | null) => void;
}

export const useTechnicalSupportMessagesFilters = create<TechnicalSupportMessagesFiltersState>(
  (set) => ({
    status: null,
    sorting: 'desc',
    setSorting: (value) => set({ sorting: value as SortingDirection }),
    setStatus: (value) => set({ status: value }),
  }),
);

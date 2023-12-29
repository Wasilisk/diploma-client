import { create } from 'zustand';
import {SortingDirection} from 'shared/utils/types';
import {GuidePermissionRequestStatus} from "shared/utils/types/guide-permission-request.types";

interface RequestsFiltersState {
  status: GuidePermissionRequestStatus | null;
  sorting: SortingDirection;
  setSorting: (value: string | null) => void;
  setStatus: (value: GuidePermissionRequestStatus | null) => void;
}

export const useRequestsFilters = create<RequestsFiltersState>(
  (set) => ({
    status: null,
    sorting: 'desc',
    setSorting: (value) => set({ sorting: value as SortingDirection }),
    setStatus: (value) => set({ status: value }),
  }),
);

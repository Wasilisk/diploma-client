export interface FilterRange {
  from: string;
  to: string;
}

export type FilterTypes = 'direction' | 'dateRange' | 'priceRange' | 'paymentType' | 'groupSize';
export type SortingDirection = 'desc' | 'asc';
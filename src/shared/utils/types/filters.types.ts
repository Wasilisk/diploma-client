export type FilterOption<T> = {
  label: string;
  value: T;
};

export interface PriceRange {
  from: number | null;
  to: number | null;
}

export interface DateRange {
  from: Date | null;
  to: Date | null;
}

export type FilterTypes = 'direction' | 'dateRange' | 'priceRange' | 'paymentType' | 'tourType';
export type SortingDirection = 'desc' | 'asc';
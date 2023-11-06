export interface PaginationParams {
  page: number;
  size: number;
}

export type PaginatedResource<T> = {
  totalItems: number;
  items: T[];
  page: number;
  size: number;
};

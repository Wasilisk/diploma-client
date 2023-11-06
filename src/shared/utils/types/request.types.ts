import { PaginationParams } from 'shared/utils/types/pagination.types';

export interface GetToursParams {
  directionId?: number;
  paginationParams: PaginationParams;
}

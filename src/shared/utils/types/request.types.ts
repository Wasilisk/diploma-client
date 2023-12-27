import { PaginationParams } from 'shared/utils/types/pagination.types';
import {Role} from "shared/utils/types/account.types";

export interface GetToursParams {
  directionId?: number;
  paginationParams: PaginationParams;
}

export interface ChangeUserRoleParams {
  id: number;
  role: Role;
}

export interface GetAllUsersParams {
  paginationParams: PaginationParams;
  searchParams: {
    firstName: string | null;
    lastName: string | null;
    email: string | null;
    role: Role | null;
  }
}
import { PaginationParams } from 'shared/utils/types/pagination.types';
import { Role } from 'shared/utils/types/account.types';
import { SupportMessageStatus } from 'shared/utils/types/support.types';

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
  };
}

export interface GetAllSupportMessagesParams {
  paginationParams: PaginationParams;
  filter: {
    status: string | null;
  };
  sort: {
    createdAt: string | null;
  };
}

export interface UpdateSupportMessageStatusData {
  id: number;
  status: SupportMessageStatus;
}

export interface ReplyToMessageData {
  id: number;
  content: string;
}

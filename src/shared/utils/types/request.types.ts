import { PaginationParams } from 'shared/utils/types/pagination.types';
import { Role } from 'shared/utils/types/account.types';
import { SupportMessageStatus } from 'shared/utils/types/support.types';
import { GuidePermissionRequestStatus } from 'shared/utils/types/guide-permission-request.types';

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

export interface GetAllDirectionsParams {
  paginationParams: PaginationParams;
  filter?: {
    name: string | null;
  };
  sort?: {
    tours: string | null;
  };
}

export interface GetAllGuidePermissionRequestsParams {
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

export interface UpdateGuidePermissionRequestStatusData {
  id: number;
  status: GuidePermissionRequestStatus;
}

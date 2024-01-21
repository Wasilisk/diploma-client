import {
  PaginationParams,
  Role,
  SupportMessageStatus,
  GuidePermissionRequestStatus,
  Tour,
} from 'shared/utils/types';
import { daysOfWeek } from 'shared/utils/constants';

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

export interface AddTicketTypesData {
  tourId: number;
  name: string;
  price: number;
}

export interface UpdateTicketTypesData {
  id: number;
  name: string;
  price: number;
}

export type AddTourScheduleData = {
  tourId: number;
  startDate: string;
  endDate: string;
} & { [key in (typeof daysOfWeek)[number]]: string[] };

export type UpdateTourScheduleData = AddTourScheduleData;

export interface AddTourData extends Pick<Tour, 'name' | 'description' | 'content'> {
  directionId: string;
  files: File[];
}
export interface UpdateTourData extends Pick<Tour, 'name' | 'description' | 'content'> {
  id: string;
  directionId: string;
  files: File[];
  gallery: string[];
}

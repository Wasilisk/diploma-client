export interface GuidePermissionRequest {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  description: string;
  status: GuidePermissionRequestStatus;
  createdAt: string;
}

export enum GuidePermissionRequestStatus {
  PENDING = 'PENDING',
  DECLINED = 'DECLINED',
  ACCEPTED = 'ACCEPTED',
}

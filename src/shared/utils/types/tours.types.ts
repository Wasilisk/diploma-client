import { TicketType } from 'shared/utils/types/ticket';

export type Tour = {
  id: number;
  name: string;
  description: string;
  content: string;
  directionId: number;
  gallery: string[];
  tourInfo: TourInfo;
  ticketTypes: TicketType[];
  schedule: TourSchedule;
};

export type TourInfo = {
  meetingPlace: string;
  endingPlace: string;
  duration: string;
  groupSize?: string;
  groupType: string;
  paymentInfo?: string;
};

export type TourSchedule = {
  tourId: number;
  startDate: string;
  endDate: string;
  daysOff: string[];
  monday: string[];
  tuesday: string[];
  wednesday: string[];
  thursday: string[];
  friday: string[];
  saturday: string[];
  sunday: string[];
};

export type TourGroup = {
  id: number;
  date: Date;
  time: string;
};

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
};

export type TourInfo = {
  meetingPlace: string;
  endingPlace: string;
  duration: string;
  groupSize?: string;
  groupType: string;
  paymentInfo?: string;
};

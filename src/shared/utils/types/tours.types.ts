import { TicketType } from 'shared/utils/types/ticket';
import {daysOfWeek} from "shared/utils/constants";
import {z} from "zod";
import {createTourFormSchema} from "shared/utils/validations/create-tour-form-schema";
import {Direction} from "shared/utils/types/directions.types";
import {Order} from "shared/utils/types/orders.types";


export type Tour = {
  id: number;
  name: string;
  description: string;
  content: string;
  directionId: number;
  gallery: string[];
  tourInfo: TourInfo;
  ticketTypes: TicketType[];
  direction: Direction;
  schedule: TourSchedule;
  createdBy: number;
};

export type TourInfo = {
  meetingPlace: string;
  endingPlace: string;
  duration: string;
  groupSize: number;
};

export type TourSchedule = {
  tourId: number;
  startDate: string;
  endDate: string;
  daysOff: string[];
} & Record<(typeof daysOfWeek)[number], string[]>;

export type TourGroup = {
  id: number;
  date: string;
  time: string;
  orders: Order[]
};

export type CreateTourFormValues = z.infer<typeof createTourFormSchema>;

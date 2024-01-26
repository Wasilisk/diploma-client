import { CreateTourFormValues, Direction, Tour } from 'shared/utils/types';
import { addDays } from 'date-fns';
import {isEmpty, omit} from 'underscore';
import {daysOfWeek} from "shared/utils/constants";

export const parseDefaultValues = (
  defaultValues: Tour | null,
  selectedDirection: Direction | null,
): CreateTourFormValues => {

  return {
    name: defaultValues?.name || '',
    description: defaultValues?.description || '',
    direction: selectedDirection || defaultValues?.direction || null,
    content: defaultValues?.content || '',
    files: [],
    tourInfo: defaultValues?.tourInfo || {
      meetingPlace: '',
      endingPlace: '',
      groupSize: 1,
      duration: '',
    },
    tickets:
      defaultValues?.ticketTypes.map((ticket) => ({
        id: ticket.id,
        name: ticket.name,
        price: ticket.price,
      })) ?? [],
    schedule: {
      startDate: defaultValues?.schedule?.startDate ?? new Date().toISOString(),
      endDate: defaultValues?.schedule?.endDate ?? addDays(new Date(), 1).toISOString(),
      weekSchedule: Object.entries(
        omit(defaultValues?.schedule, 'tourId', 'id', 'startDate', 'endDate') || {},
      ).reduce(
        (schedule, [key, value]) => ({ ...schedule, [key]: !isEmpty(value) ? value.map((time) => ({ time })) : [] }),
        {} as Record<(typeof daysOfWeek)[number], { time: string }[]>,
      ),
    },
    gallery: defaultValues?.gallery.map((image) => ({ url: image })) ?? [],
  };
};

export const parseTourScheduleForPayload = (tourId: number, schedule: CreateTourFormValues['schedule']) => {
  return {
    tourId,
    startDate: schedule.startDate,
    endDate: schedule.endDate,
    ...Object.entries(schedule.weekSchedule).reduce(
        (schedule, [key, value]) => ({ ...schedule, [key]: value.map((obj) => obj.time) }),
        {} as Record<(typeof daysOfWeek)[number], string[]>,
    ),
  }
}
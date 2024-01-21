import { z } from 'zod';
import { daysOfWeek } from 'shared/utils/constants';
import { Direction } from 'shared/utils/types';
import { isEmpty } from 'shared/utils/libs';

export const isTimeValid = (value: string) => /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/.test(value);

const dayScheduleSchema = z.object({
  time: z.string().refine(isTimeValid, { message: 'Invalid time format. Use HH:MM.' }),
});

const weekScheduleSchema = z
  .record(z.enum(daysOfWeek), z.array(dayScheduleSchema))
  .refine(
    (data) => {
      return Object.values(data).some((daySchedule) => daySchedule.length > 0);
    },
    {
      message: "At least one day's schedule must have time.",
    },
  )

const imagesSchema = z
  .object({
    files: z.custom<{ file: File }[]>(),
    gallery: z.array(z.object({ url: z.string() })),
  })
  .refine((data) => data.files.length > 0 || !isEmpty(data.gallery), {
    message: 'Please select at least one image',
    path: ['files'],
  });

export const createTourFormSchema = z.intersection(
  imagesSchema,
  z.object({
    name: z.string().min(1, { message: 'Name is required' }),
    description: z.string().min(1, { message: 'Description is required' }),
    content: z.string().min(1, { message: 'Content is required' }),
    direction: z.custom<Direction>().nullable().refine((data) => !!data, {
      message: 'Please select direction',
    }),
    files: z.custom<{ file: File }[]>(),
    gallery: z.array(z.object({ url: z.string() })),
    tourInfo: z.object({
      meetingPlace: z.string().min(1, { message: 'Meeting place is required' }),
      endingPlace: z.string().min(1, { message: 'Ending place is required' }),
      duration: z.string().min(1, { message: 'Duration is required' }),
      groupSize: z.coerce.number(),
    }),
    schedule: z.object({
      startDate: z.string(),
      endDate: z.string(),
      weekSchedule: weekScheduleSchema,
    }),
    tickets: z
      .array(
        z.object({
          id: z.number().optional(),
          name: z.string().min(1, { message: 'Ticket name is required' }),
          price: z.number(),
        }),
      )
      .refine((data) => data.length > 0, {
        message: 'You must have at least one ticket type',
      }),
  }),
);

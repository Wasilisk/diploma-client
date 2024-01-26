import { TicketType } from 'shared/utils/types/ticket';

export const sortTicketsByPrice = (ticketTypes: TicketType[]): TicketType[] => {
  return ticketTypes.filter((ticket) => ticket.price !== 0).sort((a, b) => a.price - b.price);
};

import { TicketType } from 'shared/utils/types/ticket';

export const getMinPriceFromTicketTypes = (ticketTypes: TicketType[]): number | null => {
  if (ticketTypes.length === 0) {
    return null;
  }

  const sortedTickets = ticketTypes
    .filter((ticket) => ticket.price !== 0)
    .sort((a, b) => a.price - b.price);

  return sortedTickets[0].price;
};

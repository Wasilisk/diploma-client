import { create } from 'zustand';
import { BookingOrderInfo } from 'shared/utils/types/orders.types';
import { TicketType } from 'shared/utils/types/ticket';
import { addDays, startOfDay } from 'date-fns';

interface BookingState {
  orderInfo: BookingOrderInfo;
  tickets: Record<string, number> | null;
  ticketTypes: TicketType[];
  setTicketTypes: (payload: TicketType[]) => void;
  setOrderInfo: (payload: BookingOrderInfo) => void;
  addTicket: (ticketTypeId: number) => void;
  removeTicket: (ticketTypeId: number) => void;
  reset: () => void;
  getTotalTicketsCount: () => number;
  getTotalTicketsPrice: () => number;
  getTicketTypeById: (ticketTypeId: number | string) => TicketType | undefined;
}

export const useBooking = create<BookingState>((set, get) => ({
  ticketTypes: [],
  orderInfo: {
    tourId: null,
    date: startOfDay(addDays(new Date(), 1)),
    time: null,
  },
  tickets: null,
  setTicketTypes: (payload) => set(() => ({ ticketTypes: payload })),
  setOrderInfo: (payload) => set(() => ({ orderInfo: payload })),
  addTicket: (ticketTypeId) =>
    set((state) => {
      if (state.tickets?.[ticketTypeId]) {
        return {
          tickets: {
            ...state.tickets,
            [ticketTypeId]: state.tickets[ticketTypeId] + 1,
          },
        };
      }

      return {
        tickets: {
          ...state.tickets,
          [ticketTypeId]: 1,
        },
      };
    }),
  removeTicket: (ticketTypeId) =>
    set((state) => {
      const currentTicketType = state.tickets?.[ticketTypeId];

      if (!currentTicketType) return state;

      if (currentTicketType === 1) {
        const ticketsCopy = { ...state.tickets };
        delete ticketsCopy[ticketTypeId];
        return {
          tickets: ticketsCopy,
        };
      }

      return {
        tickets: {
          ...state.tickets,
          [ticketTypeId]: currentTicketType - 1,
        },
      };
    }),
  reset: () =>
    set(() => ({
      tickets: null,
      ticketTypes: [],
      orderInfo: {
        tourId: null,
        date: startOfDay(addDays(new Date(), 1)),
        time: null,
      },
    })),
  getTotalTicketsCount: () => {
    const tickets = get().tickets;
    if (tickets) return Object.values(tickets).reduce((acc, ticketsCount) => acc + ticketsCount, 0);
    return 0;
  },
  getTotalTicketsPrice: () => {
    const tickets = get().tickets;
    if (tickets)
      return Object.entries(tickets).reduce((total, [ticketTypeId, count]) => {
        const currentTicketType = get().getTicketTypeById(ticketTypeId);
        if (currentTicketType) return total + currentTicketType.price * count;
        return total;
      }, 0);
    return 0;
  },
  getTicketTypeById: (ticketTypeId: number | string) => {
    return get().ticketTypes.find((ticketType) => ticketType.id === Number(ticketTypeId));
  },
}));

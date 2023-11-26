import { create } from 'zustand';

interface TicketInfo {
  id: number;
  name: string;
  date: Date;
  price: number;
}

interface BookingState {
  tickets: Record<string, TicketInfo & { count: number }>;
  addTicket: (payload: TicketInfo) => void;
  removeTicket: (ticketTypeId: number) => void;
  reset: () => void;
  calculateTotalPrice: () => number;
}

export const useBooking = create<BookingState>((set, get) => ({
  tickets: {},
  addTicket: (payload) =>
    set((state) => {
      if (state.tickets[payload.id]) {
        return {
          tickets: {
            ...state.tickets,
            [payload.id]: {
              ...state.tickets[payload.id],
              count: state.tickets[payload.id].count + 1,
            },
          },
        };
      }

      return {
        tickets: {
          ...state.tickets,
          [payload.id]: { ...payload, count: 1 },
        },
      };
    }),
  removeTicket: (ticketId) =>
    set((state) => {
      if (state.tickets[ticketId] && state.tickets[ticketId].count === 1) {
        const ticketsCopy = { ...state.tickets };
        delete ticketsCopy[ticketId];
        return {
          tickets: ticketsCopy,
        };
      }

      return {
        tickets: {
          ...state.tickets,
          [ticketId]: {
            ...state.tickets[ticketId],
            count: state.tickets[ticketId].count - 1,
          },
        },
      };
    }),
  reset: () => set(() => ({ tickets: {}, total: 0 })),
  calculateTotalPrice: () =>
    Object.values(get().tickets).reduce((acc, ticket) => acc + ticket.price * ticket.count, 0),
}));

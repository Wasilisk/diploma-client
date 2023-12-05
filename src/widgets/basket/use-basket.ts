import { TicketInfo } from 'shared/utils/types/ticket';
import { create, StateCreator } from 'zustand';
import { persist, PersistOptions } from 'zustand/middleware';
interface BasketState {
  tickets: Record<string, TicketInfo & { count: number }>;
  addToBasket: (tickets: Record<string, TicketInfo & { count: number }>) => void;
  addTicket: (ticketId: number) => void;
  removeTicket: (ticketId: number) => void;
  calculateTotalPrice: () => number;
  getTotalTicketsCount: () => number;
  resetBasket: () => void;
}

type BasketPersist = (
  config: StateCreator<BasketState>,
  options: PersistOptions<BasketState>,
) => StateCreator<BasketState>;

export const useBasket = create<BasketState>(
  (persist as BasketPersist)(
    (set, get) => ({
      tickets: {},
      addToBasket: (newTickets) =>
        set((state) => ({ tickets: { ...state.tickets, ...newTickets } })),
      addTicket: (ticketId) =>
        set((state) => ({
          tickets: {
            ...state.tickets,
            [ticketId]: {
              ...state.tickets[ticketId],
              count: state.tickets[ticketId].count + 1,
            },
          },
        })),
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
      calculateTotalPrice: () =>
        Object.values(get().tickets).reduce((acc, ticket) => acc + ticket.price * ticket.count, 0),
      getTotalTicketsCount: () =>
        Object.values(get().tickets).reduce((acc, ticket) => acc + ticket.count, 0),
      resetBasket: () => set(() => ({ tickets: {} })),
    }),
    { name: 'basket' },
  ),
);

export type TicketType = {
  id: number;
  tourId: number;
  name: string;
  price: number;
};

export interface TicketInfo {
  tour: {
    id: number;
    name: string;
    image: string;
  };
  id: number;
  name: string;
  date: Date;
  price: number;
}

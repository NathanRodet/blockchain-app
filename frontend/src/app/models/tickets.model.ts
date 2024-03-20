export enum TicketType {
  Train,
  Bus,
  Subway
}

export interface Ticket {
  ticketType: TicketType;
  defaultPrice: number;
  imageUrl: string;
  description: string;
  discountedPrice?: number;
}
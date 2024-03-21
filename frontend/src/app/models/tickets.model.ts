export interface Ticket {
  ticketType: string;
  defaultPrice: number | string;
  imageUrl: string;
  description: string;
  discountedPrice?: number;
}
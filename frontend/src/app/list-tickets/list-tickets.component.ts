import { Component, NgZone, OnInit } from '@angular/core';
import { ListTicketsService } from './list-tickets.service';
import { NotificationService } from '../services/notification.service';
import { Router } from '@angular/router';
import { ListPrivilegeCardService } from '../services/list-privilege-card.service';
import { PrivilegeCard } from '../models/privilege-card.model';
import { Ticket } from '../models/tickets.model';


@Component({
  selector: 'app-list-tickets',
  templateUrl: './list-tickets.component.html',
  styleUrl: './list-tickets.component.css'
})

export class ListTicketsComponent implements OnInit {
  biggestDiscountCard: PrivilegeCard | undefined;
  ownedTickets: Ticket[] = [];
  availableTickets: Ticket[] = [];

  constructor(
    private listTicketService: ListTicketsService,
    private listCardsService: ListPrivilegeCardService,
    private notificationService: NotificationService,
    private ngZone: NgZone,
    private router: Router
  ) { }

  ngOnInit(): void {
    // this.listTicketService.getOwnedTickets();
    this.listTicketService.getAvailableTickets();
    this.listCardsService.getBiggestDiscountCard();

    // this.listTicketService.ownedTickets$.subscribe(ownedTickets => {
    //   this.ownedTickets = ownedTickets;
    // })

    this.listCardsService.biggestDiscountCard$.subscribe(biggestDiscountCard => {
      this.biggestDiscountCard = biggestDiscountCard;
    })

    this.listTicketService.availableTickets$.subscribe(availableTickets => {
      this.availableTickets = availableTickets;
    })

  }

  public async purchaseTicket(ticketType: string): Promise<void> {
    try {
      await this.listTicketService.buyTicket(ticketType);
      this.notificationService.showSuccessNotification('You have successfully purchased the card.', 'Purchase Successful');
      this.ngZone.run(async () => {
        await this.listTicketService.getAvailableTickets();
      });
    } catch (error) {
      this.notificationService.showErrorNotification('There was a problem purchasing the card. Please try again.', 'Purchase Failed');
      console.error(error);
    }
  }

}

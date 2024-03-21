import { Component, NgZone } from '@angular/core';
import { Ticket } from '../models/tickets.model';
import { Router } from '@angular/router';
import { NotificationService } from '../services/notification.service';
import { InventoryService } from './inventory.service';
import { ListTicketsService } from '../list-tickets/list-tickets.service';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrl: './inventory.component.css'
})
export class InventoryComponent {
  ownedTickets: Ticket[] = [];

  constructor(
    private listTicketsService: ListTicketsService,
    private notificationService: NotificationService,
    private ngZone: NgZone,
    private router: Router
  ) { }

  ngOnInit(): void {

    this.listTicketsService.ownedTickets$.subscribe((tickets: Ticket[]) => {
      this.ownedTickets = tickets;
      console.log(this.ownedTickets);
    })
  }
}

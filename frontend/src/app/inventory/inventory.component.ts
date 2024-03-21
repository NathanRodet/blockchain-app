import { Component, NgZone } from '@angular/core';
import { Ticket } from '../models/tickets.model';
import { Router } from '@angular/router';
import { NotificationService } from '../services/notification.service';
import { InventoryService } from './inventory.service';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrl: './inventory.component.css'
})
export class InventoryComponent {
  ownedTickets: Ticket[] = [];

  constructor(
    private inventoryService: InventoryService,
    private notificationService: NotificationService,
    private ngZone: NgZone,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.inventoryService.getOwnedTickets();

    this.inventoryService.ownedTickets$.subscribe((tickets: Ticket[]) => {
      this.ownedTickets = tickets;
    })
  }
}

import { Component, OnInit } from '@angular/core';
import { ListPrivilegeCardService } from '../services/list-privilege-card.service';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { NotificationService } from '../services/notification.service';
import { ethers } from 'ethers'
import { AdminPrivilegeCardService } from '../services/admin-privilege-card.service';

@Component({
  selector: 'app-privilege-card-list',
  templateUrl: './list-privilege-card.component.html',
  styleUrls: ['./list-privilege-card.component.css']
})
export class PrivilegeCardListComponent implements OnInit {
  cards: any[] = [];
  isAdmin: boolean = false;

  constructor(
    private authService: AuthService,
    private listCardsService: ListPrivilegeCardService,
    private adminCardsService: AdminPrivilegeCardService,
    private notificationService: NotificationService,
    private router: Router
  ) { }

  async ngOnInit(): Promise<void> {
    if (!(await this.authService.isLoggedIn())) {
      this.router.navigate(['/login']);
    } else {
      this.isAdmin = await this.adminCardsService.isAdmin();
      if (this.isAdmin) {
        this.router.navigate(['admin/privilege-cards/purchase'])
      }
      this.loadCards();
    }
  }

  async loadCards(): Promise<void> {
    this.cards = this.listCardsService.getAvailableCards();
  }

  async purchaseCard(cardId: number, price: number): Promise<void> {
    try {
      await this.listCardsService.buyCard(cardId, ethers.parseEther(price.toString()).toString());
      this.notificationService.showSuccessNotification('You have successfully purchased the card.', 'Purchase Successful');
    } catch (error) {
      this.notificationService.showErrorNotification('There was a problem purchasing the card. Please try again.', 'Purchase Failed');
      console.error(error);
    }
  }
}

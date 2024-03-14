import { Component, OnInit } from '@angular/core';
import { ListPrivilegeCardService } from '../services/list-privilege-card.service';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { NotificationService } from '../services/notification.service';
import { ethers } from 'ethers'

@Component({
  selector: 'app-privilege-card-list',
  templateUrl: './list-privilege-card.component.html',
  styleUrls: ['./list-privilege-card.component.css']
})
export class PrivilegeCardListComponent implements OnInit {
  cards: any[] = [];

  constructor(
    private authService: AuthService,
    private listCardsService: ListPrivilegeCardService,
    private notificationService: NotificationService,
    private router: Router
  ) { }

  async ngOnInit(): Promise<void> {
    if (!(await this.authService.isLoggedIn())) {
      this.router.navigate(['/login']);
    } else {
      this.loadCards();
      const newAdminAddress = '0xF2aa47A25bEEFfD6e54bB9eB8567E4924A839608';
      this.listCardsService.addAdmin(newAdminAddress)
      .then(() => {
        return this.listCardsService.getAllAdmins();
      })
      .then((adminAddress) => {
        console.log(adminAddress);
      })
      .catch((error) => {
        console.error('Error in the process:', error);
      });
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

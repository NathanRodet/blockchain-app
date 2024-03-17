import { Component, NgZone, OnInit } from '@angular/core';
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
  isAddingCard: boolean = false;

  constructor(
    private authService: AuthService,
    private listCardsService: ListPrivilegeCardService,
    private adminCardsService: AdminPrivilegeCardService,
    private notificationService: NotificationService,
    private ngZone: NgZone,
    private router: Router
  ) { }

  public async ngOnInit(): Promise<void> {
    if (!(await this.authService.isLoggedIn())) {
      this.router.navigate(['/login']);
    } else {
      this.isAdmin = await this.adminCardsService.isAdmin();
      if (this.isAdmin) {
        this.router.navigate(['admin/privilege-cards/add'])
      }

      this.loadCards();
      this.listCardsService.cards$.subscribe(cards => {
        this.cards = cards;
      });
      this.listCardsService.updateAvailableCards();
    }
  }

  public async loadCards(): Promise<void> {
    this.cards = await this.listCardsService.getAvailableCards();
  }

  public async purchaseCard(cardId: number, price: number): Promise<void> {
    try {
      const formattedEther = (price * (10 ^ 18)).toFixed(18);
      await this.listCardsService.buyCard(cardId, ethers.parseEther((formattedEther).toString()).toString());
      this.notificationService.showSuccessNotification('You have successfully purchased the card.', 'Purchase Successful');
      console.log(await this.listCardsService.getOwnedPrivilegeCards())

      this.ngZone.run(async () => {
        await this.listCardsService.updateAvailableCards();
      });
    } catch (error) {
      this.notificationService.showErrorNotification('There was a problem purchasing the card. Please try again.', 'Purchase Failed');
      console.error(error);
    }
  }

  public onDeleteCard(cardId: number): void {
    this.adminCardsService.deleteCard(cardId)
      .then(() => {
        this.notificationService.showSuccessNotification('Card deleted successfully.', 'Deletion Successful');
        this.ngZone.run(async () => {
          await this.listCardsService.updateAvailableCards();
        });
      })
      .catch(error => {
        this.notificationService.showErrorNotification('Failed to delete card. Please try again.', 'Deletion Failed');
        console.error('Failed to delete card:', error);
      });
  }

  public isImageLoaded() {
    this.notificationService.showWarningNotification('One of the card image URL provided wasn\'t loaded as expected.', 'Warning');
  }
}

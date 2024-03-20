import { Component, OnInit } from '@angular/core';
import { ListPrivilegeCardService } from '../services/list-privilege-card.service';
import { NotificationService } from '../services/notification.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-transfer-privilege-card',
  templateUrl: './transfer-privilege-card.component.html',
  styleUrl: './transfer-privilege-card.component.css'
})

export class TransferPrivilegeCardComponent implements OnInit {
  cardId: number | undefined;
  ownerAddress: string | null | undefined;
  toAddress: string | undefined;

  constructor(
    private listPrivilegeCardService: ListPrivilegeCardService,
    private authService: AuthService,
    private notificationService: NotificationService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  async ngOnInit(): Promise<void> {
    if (!(await this.authService.isLoggedIn())) {
      this.router.navigate(['/login']);
    } else {
      this.activatedRoute.queryParams.subscribe(params => {
        this.cardId = params['id'];
        this.getOwnerAddress();
      });
    }
  }

  public getOwnerAddress() {
    this.ownerAddress = this.listPrivilegeCardService.getAccountAddress();
  }

  public async transferCard() {
    try {
      const exchangeTransaction = await this.listPrivilegeCardService.transferCard(this.cardId as number, this.toAddress as string);
      if (exchangeTransaction) {
        this.notificationService.showSuccessNotification(`The card ${this.cardId} has been transfered successfully to the ${this.toAddress} user.`, 'Success');
      }
    } catch (error: any) {
      this.notificationService.showErrorNotification(`An error occurred while transfering the ${this.cardId}.`, 'Error');
      console.error(error);
    }
  }

  public updateToAddress(event: Event): void {
    const target = event.target as HTMLInputElement;
    if (target && target.textContent) {
      this.toAddress = target.textContent.trim();
    }
  }
}

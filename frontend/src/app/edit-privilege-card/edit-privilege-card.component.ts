import { Component, EventEmitter, NgZone, Output } from '@angular/core';
import { PrivilegeCard } from '../models/privilege-card.model';
import { PrivilegeCardValidatorService } from '../services/validate-privilege-card.service';
import { NotificationService } from '../services/notification.service';
import { AdminPrivilegeCardService } from '../services/admin-privilege-card.service';
import { ListPrivilegeCardService } from '../services/list-privilege-card.service';

@Component({
  selector: 'app-edit-privilege-card',
  templateUrl: './edit-privilege-card.component.html',
  styleUrl: './edit-privilege-card.component.css'
})

export class EditPrivilegeCardComponent {
  card: PrivilegeCard = {
    imageUrl: '',
    name: '',
    description: '',
    price: 0,
    quantity: 0,
    discountRate: 0
  };

  constructor(
    private privilageCardValidator: PrivilegeCardValidatorService,
    private adminPrivilegeCardService: AdminPrivilegeCardService,
    private listCardsService: ListPrivilegeCardService,
    private ngZone: NgZone,
    private notificationService: NotificationService
  ) { }

  @Output()
  cardSave = new EventEmitter<any>();

  private checkCardFieldsValidation(): boolean {
    const isImageUrlValid = this.privilageCardValidator.validateImageUrl(this.card.imageUrl);
    const isPriceValid = this.privilageCardValidator.validateNumber(this.card.price.toString());
    const isQuantityValid = this.privilageCardValidator.validateNumber(this.card.quantity.toString(), true);
    const isDiscountRateValid = this.privilageCardValidator.validateDiscountRate(this.card.discountRate.toString());

    return isImageUrlValid && isPriceValid && isQuantityValid && isDiscountRateValid;
  }


  public async onSave(): Promise<void> {
    try {
      if (this.checkCardFieldsValidation()) {
        this.cardSave.emit(this.card);
        await this.adminPrivilegeCardService.createCard(this.card);
        this.notificationService.showSuccessNotification('New privilege card added successfully.', 'Success');
        this.ngZone.run(async () => {
          await this.listCardsService.updateAvailableCards();
        });
      } else {
        this.notificationService.showErrorNotification('Please check your input, some of them are empty or invalid.', 'Error');
      }
    } catch (error: any) {
      this.notificationService.showErrorNotification('Please check your input, some of them are empty or invalid.', 'Error');
    }
  }

  public checkContentAndUpdateClass(event: Event): void {
    const target = event.target as HTMLElement;
    const isContentEmpty = !target.textContent?.trim();
    if (isContentEmpty) {
      target.classList.remove('not-empty');
    } else {
      target.classList.add('not-empty');
    }
  }

  public updateCardField(event: InputEvent): void {
    const target = event.target as HTMLElement;
    const field = target.getAttribute('data-field');
    const value = target.textContent?.trim() || '';

    if (field) {
      (this.card as any)[field] = value;
    }

    this.checkContentAndUpdateClass(event);
  }
}

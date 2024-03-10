import { Injectable } from '@angular/core';
import { ActiveToast, ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  constructor(private toastrService: ToastrService) { }

  public showSuccessNotification(message: string, title: string): ActiveToast<unknown> {
    return this.toastrService.success(message, title);
  }

  public showWarningNotification(message: string, title: string): ActiveToast<unknown> {
    return this.toastrService.warning(message, title);
  }

  public showErrorNotification(message: string, title: string): ActiveToast<unknown> {
    return this.toastrService.error(message, title);
  }
}

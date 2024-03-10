import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(
    private authService: AuthService,
    private notificationService: NotificationService
  ) { }

  async login(addressETH: string): Promise<void> {
    try {
      const success = await this.authService.login(addressETH);
      if (!success && addressETH.trim() !== '') {
        this.notificationService.showErrorNotification('Invalid Ethereum address', 'Error');
      }
      else {
        this.notificationService.showSuccessNotification('Succesfully authentificated with the address ETH provided', 'Success');
      }
    } catch (error) {
      this.notificationService.showErrorNotification(`An error occurred during login: ${error}`, 'Error');
    }
  }
}
